import emailjs from '@emailjs/browser';

// Reemplaza con tus credenciales reales de EmailJS
const SERVICE_ID = 'service_2yo5x29';      // ← tu Service ID
const TEMPLATE_ID = 'template_hiv5ddq';    // ← tu Template ID
const PUBLIC_KEY = 'k0cDi3RpHrqf3-MzM';         // ← tu Public Key

export const sendContactEmail = async (data) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
};