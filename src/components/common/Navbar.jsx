import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onOpenAgendar }) {  // 👈 Cambio de prop
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre Mí', href: '#sobre-mi' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Testimonios', href: '#testimonios' },
    // { label: 'Casos', href: '#casos' }, // Desactivado temporalmente
    { label: 'Contacto', href: '#contacto' },
  ];

  const navBg = isDark ? '#161b22' : '#fff';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const linkColor = isDark ? '#c9d1d9' : '#374151';
  const shadow = scrolled ? '0 2px 20px rgba(0,0,0,0.12)' : '0 1px 0 #f1f5f9';

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: navBg,
        boxShadow: shadow,
        transition: 'box-shadow 0.3s, background 0.3s',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        {/* Logo */}
        <a href="#inicio" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="serif" style={{ fontSize: 22, color: textColor, lineHeight: 1 }}>Dra. Paulina Atenas</span>
          <span style={{ fontSize: 10, color: '#2ABDC0', letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600 }}>Ortodoncia · Armonización Facial</span>
        </a>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none', alignItems: 'center' }} className="hide-mobile">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="nav-link" style={{ color: linkColor, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hide-mobile">
          <button
            onClick={toggle}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: textColor, padding: '4px 8px', borderRadius: 6, transition: 'background 0.2s' }}
            aria-label="Cambiar tema"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={onOpenAgendar}  // 👈 Ahora abre el nuevo modal
            className="btn-teal"
            style={{ padding: '11px 20px', borderRadius: 8, fontSize: 13, border: 'none', cursor: 'pointer' }}
          >
            Agendar Hora
          </button>
        </div>

        {/* Burger button (mobile) */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: textColor, fontSize: 24 }}
          className="show-mobile"
          aria-label="Menú"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: isDark ? '#0d1117' : '#fff', borderTop: `1px solid ${isDark ? '#30363d' : '#f1f5f9'}`, padding: '12px 24px 20px' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '10px 0', color: linkColor, fontSize: 14, fontWeight: 500, textDecoration: 'none', borderBottom: `1px solid ${isDark ? '#21262d' : '#f8fafc'}` }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              onClick={onOpenAgendar}  // 👈 Ahora abre el nuevo modal
              className="btn-teal"
              style={{ padding: '11px 20px', borderRadius: 8, fontSize: 13, border: 'none', cursor: 'pointer', flex: 1 }}
            >
              Agendar Hora
            </button>
            <button
              onClick={toggle}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: textColor, padding: '4px 8px' }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}