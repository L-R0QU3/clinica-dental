import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';

export default function Process() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  
  const bg = isDark ? '#0d1117' : '#f8fafc';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';
  const cardBg = isDark ? '#161b22' : '#fff';
  const borderColor = isDark ? '#30363d' : '#e8f0fe';
  const numberColor = isDark ? 'rgba(255,255,255,0.05)' : '#e8f7f7';

  const steps = [
    { n: "01", title: "Evaluación Inicial", desc: "Diagnóstico clínico integral de tu situación bucal y facial. Fotografías, radiografías y análisis morfológico completo." },
    { n: "02", title: "Plan Personalizado", desc: "Diseño de un plan de tratamiento exclusivo para ti, con opciones, tiempos estimados y presupuesto detallado." },
    { n: "03", title: "Tratamiento", desc: "Ejecución precisa del tratamiento con tecnología de vanguardia y los más altos estándares de bioseguridad clínica." },
  ];

  return (
    <section ref={ref} style={{ background: bg, padding: "88px 24px", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 12 }}>Cómo Trabajamos</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.5rem)", color: textColor }}>
            Completamos Cada Paso con Cuidado
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {steps.map((s, i) => (
            <div key={i} className="card-lift"
              style={{
                background: cardBg,
                borderRadius: 16,
                padding: "36px 30px",
                border: `1.5px solid ${borderColor}`,
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(20px)",
                transition: `all .5s ease ${i * .12}s, background 0.3s, border 0.3s`,
                boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.3)' : 'none'
              }}>
              <div className="serif" style={{ fontSize: "4rem", color: numberColor, lineHeight: 1, marginBottom: -8, userSelect: "none" }}>{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: textColor, marginBottom: 10, marginTop: 16 }}>{s.title}</h3>
              <p style={{ fontSize: 13.5, color: subTextColor, lineHeight: 1.7 }}>{s.desc}</p>
              <a href="#contacto" style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#2ABDC0", textDecoration: "none" }}>
                Conocer más <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}