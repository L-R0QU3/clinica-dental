// api/agendar.js
import { google } from 'googleapis';
import emailjs from '@emailjs/nodejs'; // 👈 IMPORTANTE: usar la versión Node.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, fecha, hora, especialidad, mensaje } = req.body;

    if (!nombre || !email || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // ─── 1. OBTENER Y LIMPIAR CLAVE PRIVADA ──────────────────────────────
    let privateKey = '';

    if (process.env.GOOGLE_PRIVATE_KEY_BASE64) {
      privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, 'base64').toString('utf-8');
      console.log('✅ Clave decodificada desde BASE64');
    } else if (process.env.GOOGLE_PRIVATE_KEY) {
      privateKey = process.env.GOOGLE_PRIVATE_KEY;
      privateKey = privateKey.replace(/^"|"$/g, '');
      privateKey = privateKey.replace(/\\n/g, '\n');
      privateKey = privateKey.trim();
      console.log('✅ Clave limpiada desde GOOGLE_PRIVATE_KEY');
    } else {
      console.error('❌ No se encontró GOOGLE_PRIVATE_KEY ni GOOGLE_PRIVATE_KEY_BASE64');
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }

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

    // ─── 3. CREAR EVENTO ──────────────────────────────────────────────────
    const startDateTime = `${fecha}T${hora}:00-04:00`;
    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
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
      sendUpdates: 'none',
    });

    console.log('✅ Evento creado en Google Calendar:', response.data.id);

    // ─── 4. ENVIAR CORREO DE CONFIRMACIÓN CON EMAILJS (Node.js) ──────────
    const fechaFormateada = startDate.toLocaleString('es-CL', {
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
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY, // 👈 AÑADIR ESTA LÍNEA
      }
    );

    console.log('✅ Correo de confirmación enviado a:', email);

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