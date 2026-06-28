import { useTheme } from '../../context/ThemeContext';

export default function CalendlyModal({ isOpen, onClose }) {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;

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
          background: isDark ? '#161b22' : '#fff',
          borderRadius: 16,
          maxWidth: 800,
          width: '100%',
          maxHeight: '90vh',
          position: 'relative',
          padding: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            fontSize: 28,
            cursor: 'pointer',
            color: isDark ? '#e6edf3' : '#1a1a2e',
            zIndex: 10,
            transition: 'color 0.3s',
          }}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <div style={{ width: '100%', height: '70vh' }}>
          <iframe
            src="https://calendly.com/tu-usuario/consulta-odontologica"  // ⚠️ CAMBIA ESTO POR TU ENLACE REAL
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ borderRadius: 8 }}
            title="Agendar Hora"
          />
        </div>
      </div>
    </div>
  );
}