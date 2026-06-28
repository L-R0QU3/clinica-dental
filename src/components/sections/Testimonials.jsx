import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';
import { TESTIMONIALS } from '../../data/testimonials';

export default function Testimonials() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  const [ref, vis] = useReveal();
  const stars = n => "★".repeat(n) + "☆".repeat(5 - n);
  
  const bg = isDark ? '#0d1117' : '#fff';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const cardBg = isDark ? '#161b22' : '#f8fafc';
  const borderColor = isDark ? '#30363d' : '#e8f0fe';
  const activeBg = isDark ? '#1a1a2e' : '#1a1a2e';
  const descColor = isDark ? '#8b949e' : '#4b5563';

  return (
    <section id="testimonios" ref={ref} style={{ padding: "88px 24px", background: bg, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>Testimonios</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.5rem)", color: textColor }}>
            Lo Que Dicen Nuestras Pacientes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-lift"
              onClick={() => setActive(i)}
              style={{
                background: active === i ? activeBg : cardBg,
                border: `1.5px solid ${active === i ? "#2ABDC0" : borderColor}`,
                borderRadius: 16,
                padding: "28px 24px",
                cursor: "pointer",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(20px)",
                transition: `background .3s, border-color .3s, opacity .5s ease ${i * .08}s, transform .5s ease ${i * .08}s`
              }}>
              <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 12 }}>{stars(t.rating)}</div>
              <p style={{ fontSize: 13.5, color: active === i ? "rgba(255,255,255,.75)" : descColor, lineHeight: 1.7, marginBottom: 18 }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2ABDC0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: active === i ? "#fff" : textColor }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: active === i ? "rgba(255,255,255,.5)" : "#9ca3af" }}>{t.treatment} · {t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}