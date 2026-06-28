import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';

export default function NavyBanner() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  
  // El banner siempre tiene fondo oscuro, pero ajustamos textos
  const bg = isDark ? '#0d1117' : '#1a1a2e';
  const textColor = '#fff'; // siempre blanco
  const subTextColor = 'rgba(255,255,255,0.6)';
  const cardBg = 'rgba(255,255,255,0.05)';
  const cardBorder = 'rgba(255,255,255,0.07)';

  return (
    <section ref={ref} style={{ background: bg, padding: "80px 24px", position: "relative", overflow: "hidden", transition: "background 0.3s" }}>
      <div style={{ position: "absolute", right: -60, top: -60, width: 400, height: 400, borderRadius: "50%", background: "rgba(42,189,192,.05)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-2col">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)", transition: "all .6s ease" }}>
          <p className="label" style={{ marginBottom: 12 }}>Lo Que Podemos Hacer</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem,2.8vw,2.4rem)", color: textColor, lineHeight: 1.25, marginBottom: 18 }}>
            Recupera Tu Confianza con Tratamientos que Duran
          </h2>
          <p style={{ color: subTextColor, lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>
            Combinamos la más avanzada tecnología clínica con un enfoque humano y personalizado. Cada paciente es único y cada plan de tratamiento lo refleja.
          </p>
          <a href="#servicios" className="btn-teal" style={{ padding: "13px 28px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
            Ver Todos los Tratamientos
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(20px)", transition: "all .6s ease .15s" }} className="grid-2col">
          {[
            { emoji: "🦷", title: "Ortodoncia", desc: "Corrección oclusal especializada" },
            { emoji: "💉", title: "Bótox", desc: "Relajación natural de expresión" },
            { emoji: "👃", title: "Rinomodelación", desc: "Perfil nasal sin cirugía" },
            { emoji: "💆", title: "Whitening Capilar", desc: "Revitalización profunda del cuero" },
          ].map((f, i) => (
            <div key={i} style={{ background: cardBg, borderRadius: 12, padding: "20px 18px", border: `1px solid ${cardBorder}` }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{f.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: textColor, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: subTextColor }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}