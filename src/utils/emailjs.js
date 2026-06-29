import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_2yo5x29';
const TEMPLATE_ID = 'template_hiv5ddq';
const PUBLIC_KEY = '1NsTm4lgVgfEZB76b';

export const sendContactEmail = async (data) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
};