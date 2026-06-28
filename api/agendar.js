// api/agendar.js
import { google } from 'googleapis';
import emailjs from '@emailjs/browser';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, fecha, hora, especialidad, mensaje } = req.body;

    if (!nombre || !email || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // ─── LIMPIAR CLAVE PRIVADA ──────────────────────────────────────────
    // Eliminar comillas dobles si existen, y asegurar saltos de línea correctos
    let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
    // Reemplazar comillas dobles al inicio y final si existen
    privateKey = privateKey.replace(/^"|"$/g, '');
    // Reemplazar \n literales con saltos de línea reales
    privateKey = privateKey.replace(/\\n/g, '\n');
    // Eliminar espacios en blanco alrededor
    privateKey = privateKey.trim();

    console.log('🔑 Clave privada (primeros 50 chars):', privateKey.substring(0, 50) + '...');

    // ─── AUTENTICAR CON GOOGLE CALENDAR ──────────────────────────────
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // ─── CREAR EVENTO ──────────────────────────────────────────────────
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

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      resource: event,
      sendUpdates: 'all',
    });

    // ─── ENVIAR CORREO DE CONFIRMACIÓN ──────────────────────────────────
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