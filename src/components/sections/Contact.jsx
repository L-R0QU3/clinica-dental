import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';
import { SERVICES } from '../../data/services';
import { sendContactEmail } from '../../utils/emailjs';

// Función para formatear los dígitos con espacios (ej: "5695 6956")
const formatPhoneDigits = (digits) => {
  if (!digits) return '';
  // Limitar a 8 dígitos (después del 9)
  const limited = digits.slice(0, 8);
  // Agregar espacio después de 4 dígitos
  if (limited.length <= 4) return limited;
  return limited.slice(0, 4) + ' ' + limited.slice(4);
};

// Función para mostrar el teléfono completo con prefijo fijo
const getDisplayPhone = (digits) => {
  const formatted = formatPhoneDigits(digits);
  return `+56 9 ${formatted}`.trim();
};

export default function Contact() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  const [form, setForm] = useState({
    nombre: '',
    telefono: '', // solo dígitos (máximo 8)
    correo: '',
    especialidad: '',
    mensaje: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // Manejar cambios en el campo teléfono
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    
    // Si el valor está vacío o solo es el prefijo, limpiar dígitos
    if (rawValue === '' || rawValue === '+56 9' || rawValue === '+56 9 ') {
      setForm({ ...form, telefono: '' });
      return;
    }

    // Extraer solo dígitos del valor (eliminar todo lo que no sea número)
    let digits = rawValue.replace(/\D/g, '');
    
    // Si el número comienza con 56 (código de país), quitarlo
    if (digits.startsWith('56')) {
      digits = digits.substring(2);
    }
    
    // Si el número comienza con 9, conservarlo (es el dígito después del +56)
    // Ya tenemos el 9 fijo en el prefijo, así que solo guardamos los dígitos después del 9
    // Pero como el usuario puede escribir 9, lo mantenemos en el estado
    // Si el usuario escribió "9" y luego más dígitos, tomamos todo
    // La lógica: el estado almacena los dígitos que el usuario escribe después del prefijo
    // Pero el prefijo ya incluye el 9, así que eliminamos el 9 si está al inicio
    if (digits.startsWith('9') && digits.length > 1) {
      digits = digits.substring(1);
    } else if (digits === '9') {
      digits = '';
    }
    
    // Limitar a 8 dígitos (máximo después del 9)
    digits = digits.slice(0, 8);
    
    setForm({ ...form, telefono: digits });
  };

  // Manejar el resto de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo) {
      setStatus({ ...status, error: 'Nombre y correo son obligatorios.' });
      return;
    }
    setStatus({ loading: true, success: false, error: '' });
    try {
      // Enviar el teléfono con formato completo
      const phone = getDisplayPhone(form.telefono);
      await sendContactEmail({
        from_name: form.nombre,
        from_email: form.correo,
        phone: phone,
        specialty: form.especialidad,
        message: form.mensaje,
      });
      setStatus({ loading: false, success: true, error: '' });
      setForm({ nombre: '', telefono: '', correo: '', especialidad: '', mensaje: '' });
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: 'Error al enviar. Intenta más tarde.' });
    }
  };

  return (
    <section id="contacto" ref={ref} style={{ padding: "88px 24px", background: isDark ? '#0d1117' : '#fff' }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 12 }}>¿Tienes Preguntas? Contáctanos</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.5rem)", color: isDark ? '#e6edf3' : '#1a1a2e' }}>
            Agenda Tu Evaluación Hoy
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="grid-2col">
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)", transition: "all .6s ease" }}>
            <div style={{ background: isDark ? '#161b22' : '#e8f7f7', borderRadius: 16, height: 240, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, border: `1.5px solid ${isDark ? '#30363d' : '#d1fafa'}` }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📍</div>
                <p style={{ color: "#2ABDC0", fontWeight: 600, fontSize: 14 }}>Dirección de la Clínica</p>
                <p style={{ color: isDark ? '#8b949e' : '#6b7280', fontSize: 13, marginTop: 4 }}>Av. Principal 1234, Santiago, Chile</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-2col">
              {[
                { icon: "📞", title: "Teléfono", val: "+569 1234 5678" },
                { icon: "✉️", title: "Email", val: "contacto@drapatenas.cl" },
                { icon: "🕐", title: "Horario", val: "Lun–Vie 09:00–19:00\nSáb 09:00–13:00" },
                { icon: "📸", title: "Instagram", val: "@drapatenas.cl" },
              ].map((i, idx) => (
                <div key={idx} style={{ background: isDark ? '#161b22' : '#f8fafc', borderRadius: 12, padding: "16px 16px", border: `1px solid ${isDark ? '#30363d' : '#e8f0fe'}` }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{i.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>{i.title}</div>
                  <div style={{ fontSize: 13, color: isDark ? '#e6edf3' : '#374151', fontWeight: 500, whiteSpace: "pre-line", lineHeight: 1.5 }}>{i.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(20px)", transition: "all .6s ease .15s" }}>
            {status.success ? (
              <div style={{ background: isDark ? '#161b22' : '#f0fdfd', border: `1.5px solid #2ABDC0`, borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 className="serif" style={{ fontSize: "1.6rem", color: isDark ? '#e6edf3' : '#1a1a2e', marginBottom: 10 }}>¡Consulta Enviada!</h3>
                <p style={{ color: isDark ? '#8b949e' : '#6b7280', lineHeight: 1.7 }}>Nos pondremos en contacto contigo en menos de 24 horas para coordinar tu primera evaluación clínica.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-2col">
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre Completo"
                    required
                    style={{ background: isDark ? '#0d1117' : '#fff', color: isDark ? '#e6edf3' : '#1a1a2e', borderColor: isDark ? '#30363d' : '#e2e8f0' }}
                  />
                  <input
                    name="telefono"
                    value={getDisplayPhone(form.telefono)}
                    onChange={handlePhoneChange}
                    placeholder="+56 9 1234 5678"
                    style={{ 
                      background: isDark ? '#0d1117' : '#fff', 
                      color: isDark ? '#e6edf3' : '#1a1a2e', 
                      borderColor: isDark ? '#30363d' : '#e2e8f0',
                      fontFamily: 'monospace', // para mejor visualización de números
                    }}
                  />
                </div>
                <input
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  required
                  style={{ background: isDark ? '#0d1117' : '#fff', color: isDark ? '#e6edf3' : '#1a1a2e', borderColor: isDark ? '#30363d' : '#e2e8f0' }}
                />
                <select
                  name="especialidad"
                  value={form.especialidad}
                  onChange={handleChange}
                  style={{ background: isDark ? '#0d1117' : '#fff', color: isDark ? '#e6edf3' : '#1a1a2e', borderColor: isDark ? '#30363d' : '#e2e8f0' }}
                >
                  <option value="">Especialidad de Interés</option>
                  {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos tu caso o consulta..."
                  rows={4}
                  style={{ resize: "none", background: isDark ? '#0d1117' : '#fff', color: isDark ? '#e6edf3' : '#1a1a2e', borderColor: isDark ? '#30363d' : '#e2e8f0' }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <input type="checkbox" id="consent" required style={{ width: 16, height: 16 }} />
                  <label htmlFor="consent" style={{ fontSize: 12, color: isDark ? '#8b949e' : '#6b7280' }}>Acepto el tratamiento de mis datos personales con fines de contacto.</label>
                </div>
                {status.error && <p style={{ color: '#ef4444', fontSize: 13 }}>{status.error}</p>}
                <button type="submit" className="btn-teal" disabled={status.loading} style={{ padding: "15px", borderRadius: 8, fontSize: 14, width: "100%", justifyContent: "center", opacity: status.loading ? 0.6 : 1 }}>
                  {status.loading ? 'Enviando...' : 'Enviar Consulta'}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
                <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Tus datos son confidenciales y nunca serán compartidos con terceros.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}