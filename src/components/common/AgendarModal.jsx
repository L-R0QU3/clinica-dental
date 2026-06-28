import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Generar horas disponibles (de 09:00 a 19:00, cada 30 minutos)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 19; hour++) {
    for (let minute of ['00', '30']) {
      if (hour === 19 && minute === '30') continue; // Hasta las 19:00
      const period = hour >= 12 ? 'p. m.' : 'a. m.';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const displayMinute = minute;
      const value = `${hour.toString().padStart(2, '0')}:${minute}`;
      const label = `${displayHour}:${displayMinute} ${period}`;
      slots.push({ value, label });
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function AgendarModal({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    especialidad: '',
    mensaje: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.fecha || !form.hora) {
      setStatus({ ...status, error: 'Completa todos los campos obligatorios.' });
      return;
    }
    setStatus({ loading: true, success: false, error: '' });

    try {
      // Log para debug
      console.log('Enviando datos al backend:', form);

      const response = await fetch('/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setForm({ nombre: '', email: '', telefono: '', fecha: '', hora: '', especialidad: '', mensaje: '' });
        setTimeout(onClose, 4000);
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Error al agendar' });
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setStatus({ loading: false, success: false, error: 'Error de conexión con el servidor. Asegúrate de que el backend esté corriendo.' });
    }
  };

  // Obtener fecha mínima (hoy + 1 día)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Estilos adaptados al tema
  const bg = isDark ? '#161b22' : '#fff';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';
  const inputBg = isDark ? '#0d1117' : '#fff';
  const inputBorder = isDark ? '#30363d' : '#e2e8f0';
  const selectBg = isDark ? '#0d1117' : '#fff';
  const selectColor = isDark ? '#e6edf3' : '#1a1a2e';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: bg,
          borderRadius: 16,
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          padding: 32,
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          transition: 'background 0.3s',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: 0,
            float: 'right',
            background: 'transparent',
            border: 'none',
            fontSize: 28,
            cursor: 'pointer',
            color: textColor,
            zIndex: 10,
          }}
        >
          &times;
        </button>

        <h2 className="serif" style={{ fontSize: '1.8rem', color: textColor, marginBottom: 8 }}>
          Agendar Hora
        </h2>
        <p style={{ color: subTextColor, marginBottom: 24 }}>
          Completa el formulario y te confirmaremos tu cita por correo.
        </p>

        {status.success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ color: textColor, marginBottom: 10 }}>¡Cita Agendada!</h3>
            <p style={{ color: subTextColor }}>Hemos enviado un correo de confirmación. Te esperamos.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Nombre */}
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre Completo *"
              required
              style={{ background: inputBg, color: textColor, borderColor: inputBorder }}
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo Electrónico *"
              required
              style={{ background: inputBg, color: textColor, borderColor: inputBorder }}
            />

            {/* Teléfono */}
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono (ej: +56 9 1234 5678)"
              style={{ background: inputBg, color: textColor, borderColor: inputBorder }}
            />

            {/* Fecha y Hora en grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
                min={minDate}
                required
                style={{ background: inputBg, color: textColor, borderColor: inputBorder }}
              />
              <select
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
                style={{
                  background: selectBg,
                  color: selectColor,
                  borderColor: inputBorder,
                  padding: '13px 16px',
                  borderRadius: 8,
                  border: '1.5px solid',
                  outline: 'none',
                  fontSize: 14,
                  width: '100%',
                  transition: 'border-color .2s',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                }}
              >
                <option value="">Selecciona hora *</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidad */}
            <select
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
              style={{
                background: selectBg,
                color: selectColor,
                borderColor: inputBorder,
                padding: '13px 16px',
                borderRadius: 8,
                border: '1.5px solid',
                outline: 'none',
                fontSize: 14,
                width: '100%',
                transition: 'border-color .2s',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              <option value="">Especialidad de interés</option>
              <option value="Ortodoncia Especializada">Ortodoncia Especializada</option>
              <option value="Aplicación de Bótox">Aplicación de Bótox</option>
              <option value="Rinomodelación">Rinomodelación</option>
              <option value="Ácido Hialurónico en Labios">Ácido Hialurónico en Labios</option>
              <option value="Redermalización de Ojeras">Redermalización de Ojeras</option>
              <option value="Masoterapia Capilar">Masoterapia Capilar</option>
            </select>

            {/* Mensaje */}
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Comentarios adicionales (opcional)"
              rows={3}
              style={{
                resize: 'none',
                background: inputBg,
                color: textColor,
                borderColor: inputBorder,
                padding: '13px 16px',
                borderRadius: 8,
                border: '1.5px solid',
                outline: 'none',
                fontSize: 14,
                width: '100%',
                transition: 'border-color .2s',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />

            {/* Checkbox de consentimiento */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <input type="checkbox" id="consent-agendar" required style={{ width: 16, height: 16 }} />
              <label htmlFor="consent-agendar" style={{ fontSize: 12, color: subTextColor }}>
                Acepto el tratamiento de mis datos personales.
              </label>
            </div>

            {/* Mensaje de error */}
            {status.error && (
              <p style={{ color: '#ef4444', fontSize: 13, background: '#fee2e2', padding: '8px 12px', borderRadius: 6 }}>
                ⚠️ {status.error}
              </p>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              className="btn-teal"
              disabled={status.loading}
              style={{
                padding: '14px',
                borderRadius: 8,
                fontSize: 14,
                width: '100%',
                justifyContent: 'center',
                opacity: status.loading ? 0.6 : 1,
                cursor: status.loading ? 'default' : 'pointer',
              }}
            >
              {status.loading ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  {' Agendando...'}
                </>
              ) : (
                'Agendar Cita'
              )}
            </button>

            {/* Nota final */}
            <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
              Recibirás un correo de confirmación con los detalles.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}