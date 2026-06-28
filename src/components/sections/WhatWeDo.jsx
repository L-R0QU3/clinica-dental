import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';

export default function WhatWeDo() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  
  const bg = isDark ? '#161b22' : '#fff';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';
  const cardBg = isDark ? '#0d1117' : '#fff';
  const cardBorder = isDark ? '#30363d' : 'none';
  const shadow = isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.10)';
  
  return (
    <section ref={ref} style={{ background: bg, padding: "0 24px", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", transform: "translateY(-52px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {[
            { icon: "🦷", title: "Ortodoncia Especializada", desc: "Corrección de la posición dental y maxilar para una mordida funcional y una sonrisa equilibrada." },
            { icon: "✨", title: "Armonización Facial", desc: "Procedimientos estéticos no invasivos que resaltan la belleza natural y la simetría de tu rostro." },
            { icon: "💉", title: "Rellenos y Bótox", desc: "Ácido hialurónico y toxina botulínica para resultados naturales, duraderos y personalizados." },
          ].map((c, i) => (
            <div key={i} className="card-lift"
              style={{
                background: cardBg,
                borderRadius: 14,
                boxShadow: shadow,
                border: cardBorder ? `1px solid ${cardBorder}` : 'none',
                padding: "28px 28px",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(20px)",
                transition: `opacity .5s ease ${i * 0.12}s, transform .5s ease ${i * 0.12}s, background 0.3s, border 0.3s`
              }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{c.icon}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: textColor, marginBottom: 6 }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: subTextColor, lineHeight: 1.65 }}>{c.desc}</p>
                <a href="#servicios" style={{ color: "#2ABDC0", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                  Leer más <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}