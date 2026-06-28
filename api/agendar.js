import { google } from 'googleapis';
import emailjs from '@emailjs/browser';

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, fecha, hora, especialidad, mensaje } = req.body;

    // Validación básica
    if (!nombre || !email || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    console.log('📝 Procesando solicitud para:', nombre);
    console.log('📅 Fecha:', fecha, 'Hora:', hora);

    // ─── PROCESAR CLAVE PRIVADA ──────────────────────────────────────────
    // 🔑 Manejar diferentes formatos de la clave privada
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    // Si la clave viene con comillas dobles, quitarlas
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    
    // Reemplazar \n literales por saltos de línea reales
    // Primero intentamos con la forma más común
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // Si la clave tiene caracteres de escape adicionales, intentar con una limpieza más agresiva
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      // Si no contiene el marcador, es porque no se procesaron bien los saltos de línea
      // Intentamos con otra estrategia: split por espacios y unir con saltos de línea
      privateKey = process.env.GOOGLE_PRIVATE_KEY
        .replace(/"/g, '')
        .replace(/\\n/g, '\n')
        .replace(/\\/g, '');
    }

    console.log('🔑 Clave privada procesada (primeros 50 caracteres):', privateKey.substring(0, 50) + '...');
    console.log('📧 GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL);

    // ─── AUTENTICAR CON GOOGLE CALENDAR ──────────────────────────────────
    const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // ─── CREAR EVENTO EN GOOGLE CALENDAR ─────────────────────────────────
    const startDateTime = `${fecha}T${hora}:00-04:00`;
    const endDateTime = new Date(new Date(startDateTime).getTime() + 60 * 60 * 1000).toISOString();

    const event = {
      summary: `Consulta con ${nombre}`,
      description: `
        Paciente: ${nombre}
        Email: ${email}
        Teléfono: ${telefono || 'No especificado'}
        Especialidad: ${especialidad || 'No especificada'}
        Mensaje: ${mensaje || 'Sin mensaje adicional'}
      `,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Santiago',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Santiago',
      },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    console.log('📤 Creando evento en Google Calendar...');
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      resource: event,
      sendUpdates: 'all',
    });

    console.log('✅ Evento creado con ID:', response.data.id);

    // ─── ENVIAR CORREO DE CONFIRMACIÓN ──────────────────────────────────
    const fechaFormateada = new Date(startDateTime).toLocaleString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    console.log('📧 Enviando correo a:', email);
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_AGENDAR,
      {
        to_name: nombre,
        to_email: email,
        fecha: fechaFormateada,
        especialidad: especialidad || 'Consulta general',
        mensaje: mensaje || '',
      },
      process.env.EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Correo enviado exitosamente');

    res.status(200).json({
      success: true,
      eventId: response.data.id,
      message: '¡Cita agendada exitosamente!',
    });
  } catch (error) {
    console.error('❌ Error en el backend:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: 'Error al agendar la cita. Intenta más tarde.' });
  }
}