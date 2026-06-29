// api/agendar.js
import { google } from 'googleapis';
import emailjs from '@emailjs/nodejs';

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

    // ─── 1. LIMPIAR CLAVE PRIVADA ──────────────────────────────────────────
    let privateKey = '';

    if (process.env.GOOGLE_PRIVATE_KEY_BASE64) {
      privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, 'base64').toString('utf-8');
      console.log('✅ Clave decodificada desde BASE64');
    } else if (process.env.GOOGLE_PRIVATE_KEY) {
      privateKey = process.env.GOOGLE_PRIVATE_KEY;
      // Limpiar comillas dobles si existen
      privateKey = privateKey.replace(/^"|"$/g, '');
      // Reemplazar \n literales con saltos de línea reales
      privateKey = privateKey.replace(/\\n/g, '\n');
      privateKey = privateKey.trim();
      console.log('✅ Clave limpiada desde GOOGLE_PRIVATE_KEY');
    } else {
      console.error('❌ No se encontró GOOGLE_PRIVATE_KEY ni GOOGLE_PRIVATE_KEY_BASE64');
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }

    // Logs para depuración (sin exponer la clave completa)
    console.log('🔑 Clave privada (primeros 50 chars):', privateKey.substring(0, 50) + '...');
    console.log('📧 GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL);
    console.log('📅 GOOGLE_CALENDAR_ID:', process.env.GOOGLE_CALENDAR_ID);

    // ─── 2. AUTENTICAR CON GOOGLE CALENDAR ──────────────────────────────
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // ─── 3. CREAR EVENTO EN GOOGLE CALENDAR ──────────────────────────────
    const startDateTime = `${fecha}T${hora}:00-04:00`; // Zona horaria Chile
    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora después
    const endDateTime = endDate.toISOString();

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
      // Sin attendees para evitar error de delegación
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      resource: event,
      sendUpdates: 'none', // No enviamos invitaciones por correo
    });

    console.log('✅ Evento creado en Google Calendar:', response.data.id);

    // ─── 4. ENVIAR CORREO DE CONFIRMACIÓN CON EMAILJS ──────────────────
    const fechaFormateada = startDate.toLocaleString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Logs de depuración para EmailJS
    console.log('📧 Enviando correo con:');
    console.log('SERVICE_ID:', process.env.EMAILJS_SERVICE_ID);
    console.log('TEMPLATE_ID:', process.env.EMAILJS_TEMPLATE_AGENDAR);
    console.log('PUBLIC_KEY (primeros 10 chars):', process.env.EMAILJS_PUBLIC_KEY?.substring(0, 10));
    console.log('PRIVATE_KEY (primeros 10 chars):', process.env.EMAILJS_PRIVATE_KEY?.substring(0, 10));
    console.log('📧 Datos del correo:', {
      to_name: nombre,
      to_email: email,
      fecha: fechaFormateada,
      especialidad: especialidad || 'Consulta general',
      mensaje: mensaje || '',
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
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log('✅ Correo de confirmación enviado a:', email);

    // ─── 5. RESPONDER AL FRONTEND ───────────────────────────────────────
    res.status(200).json({
      success: true,
      eventId: response.data.id,
      message: '¡Cita agendada exitosamente!',
    });
  } catch (error) {
    console.error('❌ Error en el backend:', error);
    res.status(500).json({ error: 'Error al agendar la cita. Intenta más tarde.' });
  }
}