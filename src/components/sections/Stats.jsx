import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';

export default function Stats() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  
  // Fondo fijo teal, ajustamos textos
  const bg = isDark ? '#1a6a6d' : '#2ABDC0'; // un tono más oscuro en modo oscuro
  const textColor = '#fff';
  const subTextColor = 'rgba(255,255,255,0.65)';

  const stats = [
    { val: "34+", label: "Especialidades", sub: "Tratamientos disponibles" },
    { val: "95K", label: "Pacientes Felices", sub: "A lo largo de su carrera" },
    { val: "100%", label: "Personalizados", sub: "Cada plan de tratamiento" },
    { val: "10+", label: "Años de Experiencia", sub: "Trayectoria clínica probada" },
  ];

  return (
    <section ref={ref} style={{ background: bg, padding: "60px 24px", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }} className="grid-4col">
        {stats.map((s, i) => (
          <div key={i} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: `all .5s ease ${i * .1}s` }}>
            <div className="serif" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: textColor, lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: subTextColor }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}