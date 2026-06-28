import { google } from 'googleapis';
import emailjs from '@emailjs/browser';

// Función para limpiar la clave privada
function cleanPrivateKey(key) {
  if (!key) return '';
  // Reemplazar \n literales por saltos de línea reales
  let cleaned = key.replace(/\\n/g, '\n');
  // Eliminar comillas al inicio y final si existen
  cleaned = cleaned.replace(/^"|"$/g, '');
  // Eliminar espacios en blanco al inicio y final
  cleaned = cleaned.trim();
  return cleaned;
}

export default async function handler(req, res) {
  // Solo aceptar solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, fecha, hora, especialidad, mensaje } = req.body;

    // Validar campos obligatorios
    if (!nombre || !email || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Log para depuración (se ve en Vercel Functions)
    console.log('📝 Datos recibidos:', { nombre, email, fecha, hora });
    console.log('📅 GOOGLE_CALENDAR_ID:', process.env.GOOGLE_CALENDAR_ID);

    // ─── 1. AUTENTICAR CON GOOGLE CALENDAR ──────────────────────────────
    const privateKey = cleanPrivateKey(process.env.GOOGLE_PRIVATE_KEY);
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    console.log('🔑 GOOGLE_CLIENT_EMAIL:', clientEmail);
    console.log('🔑 GOOGLE_CALENDAR_ID:', calendarId);
    console.log('🔑 GOOGLE_PRIVATE_KEY (primeros 50 chars):', privateKey.substring(0, 50) + '...');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // ─── 2. CREAR EL EVENTO EN GOOGLE CALENDAR ──────────────────────────
    const startDateTime = `${fecha}T${hora}:00-04:00`; // Zona horaria Chile
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

    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
      sendUpdates: 'all',
    });

    console.log('✅ Evento creado en Google Calendar:', response.data.id);

    // ─── 3. ENVIAR CORREO DE CONFIRMACIÓN CON EMAILJS ──────────────────
    const fechaFormateada = new Date(startDateTime).toLocaleString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

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

    console.log('📧 Correo de confirmación enviado a:', email);

    // ─── 4. RESPONDER AL FRONTEND ───────────────────────────────────────
    res.status(200).json({
      success: true,
      eventId: response.data.id,
      message: '¡Cita agendada exitosamente!',
    });
  } catch (error) {
    console.error('Error en el backend:', error);
    res.status(500).json({ error: 'Error al agendar la cita. Intenta más tarde.' });
  }
}