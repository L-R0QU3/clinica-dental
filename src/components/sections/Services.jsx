import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';
import { SERVICES } from '../../data/services';

function ServiceCard({ emoji, title, desc, tag, index, vis }) {
  const { isDark } = useTheme();
  const [hov, setHov] = useState(false);
  
  const bg = hov ? "#1a1a2e" : (isDark ? '#161b22' : '#fff');
  const textColor = hov ? "#fff" : (isDark ? '#e6edf3' : '#1a1a2e');
  const descColor = hov ? "rgba(255,255,255,.65)" : (isDark ? '#8b949e' : '#6b7280');
  const borderColor = isDark ? '#30363d' : '#e8f0fe';
  const shadow = hov ? "0 16px 48px rgba(42,189,192,.15)" : (isDark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,.04)');
  const iconBg = hov ? "rgba(42,189,192,.15)" : (isDark ? 'rgba(255,255,255,.05)' : '#e8f7f7');

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 16,
        padding: "32px 28px",
        cursor: "default",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: `background .3s ease, opacity .5s ease ${index * 0.07}s, transform .5s ease ${index * 0.07}s, box-shadow .3s ease, border .3s ease`,
        boxShadow: shadow,
      }}
    >
      <div style={{ 
        width: 64, 
        height: 64, 
        borderRadius: 14, 
        background: iconBg, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom: 20, 
        transition: ".3s", 
        fontSize: 28 
      }}>
        {emoji}
      </div>
      <span style={{ 
        fontSize: 11, 
        fontWeight: 600, 
        letterSpacing: ".12em", 
        textTransform: "uppercase", 
        color: hov ? "#2ABDC0" : (isDark ? '#8b949e' : '#6b7280'), 
        display: "block", 
        marginBottom: 10 
      }}>
        {tag}
      </span>
      <h3 style={{ 
        fontSize: 17, 
        fontWeight: 700, 
        color: textColor, 
        marginBottom: 10, 
        lineHeight: 1.3, 
        transition: ".3s" 
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: 13.5, 
        color: descColor, 
        lineHeight: 1.7, 
        marginBottom: 18, 
        transition: ".3s" 
      }}>
        {desc}
      </p>
      <a href="#contacto" style={{ 
        fontSize: 13, 
        fontWeight: 600, 
        color: "#2ABDC0", 
        textDecoration: "none", 
        display: "inline-flex", 
        alignItems: "center", 
        gap: 5 
      }}>
        Consultar cuidados <span>→</span>
      </a>
    </div>
  );
}

export default function Services() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  const bg = isDark ? '#0d1117' : '#fff';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';

  return (
    <section id="servicios" ref={ref} style={{ 
      padding: "88px 24px", 
      background: bg, 
      transition: "background 0.3s" 
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Encabezado de la sección */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 12 }}>Lo Que Hacemos</p>
          <h2 className="serif" style={{ 
            fontSize: "clamp(1.9rem,3vw,2.5rem)", 
            color: textColor, 
            marginBottom: 16 
          }}>
            Proporcionando Atención Clínica de Excelencia
          </h2>
          <p style={{ 
            color: subTextColor, 
            maxWidth: 540, 
            margin: "0 auto", 
            lineHeight: 1.7, 
            fontSize: 15 
          }}>
            Cada tratamiento es diseñado individualmente, integrando salud bucal y armonía facial para resultados que transforman.
          </p>
        </div>
        
        {/* Grid de servicios */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: 22 
        }}>
          {SERVICES.map((s, i) => <ServiceCard key={i} {...s} index={i} vis={vis} />)}
        </div>
        
        {/* Botón CTA inferior */}
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <a href="#contacto" className="btn-teal" style={{ 
            padding: "14px 36px", 
            borderRadius: 8, 
            fontSize: 14, 
            textDecoration: "none" 
          }}>
            Agendar Mi Primera Evaluación
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}