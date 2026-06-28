import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';
import { FAQS } from '../../data/faqs';

function FAQItem({ q, a }) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const bg = isDark ? '#161b22' : '#fff';
  const borderColor = isDark ? '#30363d' : '#e8f0fe';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';
  const openBg = isDark ? '#0d1117' : '#f0fdfd';

  return (
    <div style={{ border: `1px solid ${borderColor}`, borderRadius: 12, overflow: "hidden", marginBottom: 10, transition: "border 0.3s" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "18px 20px", 
          background: open ? openBg : bg, 
          border: "none", 
          cursor: "pointer", 
          textAlign: "left", 
          gap: 12, 
          transition: "background 0.3s" 
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: textColor, lineHeight: 1.4 }}>{q}</span>
        <span style={{ color: "#2ABDC0", flexShrink: 0, fontSize: 18, lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform .3s" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height .35s ease, opacity .3s ease" }}>
        <p style={{ padding: "0 20px 18px", fontSize: 13.5, color: subTextColor, lineHeight: 1.75 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  const bg = isDark ? '#0d1117' : '#f8fafc';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';

  return (
    <section ref={ref} style={{ background: bg, padding: "88px 24px", transition: "background 0.3s" }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        display: "grid", 
        gridTemplateColumns: "1fr 1.4fr", 
        gap: 64, 
        alignItems: "start" 
      }} className="grid-2col-1-4">
        {/* Columna izquierda: texto */}
        <div style={{ 
          opacity: vis ? 1 : 0, 
          transform: vis ? "none" : "translateX(-20px)", 
          transition: "all .6s ease" 
        }}>
          <p className="label" style={{ marginBottom: 12 }}>Preguntas Frecuentes</p>
          <h2 className="serif" style={{ 
            fontSize: "clamp(1.8rem,2.8vw,2.4rem)", 
            color: textColor, 
            marginBottom: 18, 
            lineHeight: 1.25 
          }}>
            ¿Tienes Preguntas? Aquí las Respondemos.
          </h2>
          <div style={{ width: 48, height: 3, background: "#2ABDC0", borderRadius: 2, marginBottom: 18 }} />
          <p style={{ color: subTextColor, lineHeight: 1.75, marginBottom: 28 }}>
            Sabemos que cada tratamiento genera dudas. Aquí encontrarás respuestas a las preguntas más frecuentes de nuestras pacientes.
          </p>
          <a href="#contacto" className="btn-teal" style={{ padding: "13px 26px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
            Hacer una Consulta
          </a>
        </div>
        
        {/* Columna derecha: accordion */}
        <div style={{ 
          opacity: vis ? 1 : 0, 
          transform: vis ? "none" : "translateX(20px)", 
          transition: "all .6s ease .15s" 
        }}>
          {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
}