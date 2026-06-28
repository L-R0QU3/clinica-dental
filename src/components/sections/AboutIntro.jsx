import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';

export default function AboutIntro() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  
  const bg = isDark ? '#0d1117' : '#f8fafc';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#4b5563';
  const cardBg = isDark ? '#161b22' : '#fff';
  const photoBg = isDark ? '#161b22' : '#e8f7f7';
  const shadow = isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,.12)';

  return (
    <section ref={ref} id="sobre-mi" style={{ padding: "80px 24px", background: bg, transition: "background 0.3s" }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 64, 
        alignItems: "center" 
      }} className="grid-2col">
        
        {/* Columna izquierda: foto */}
        <div style={{ 
          position: "relative", 
          opacity: vis ? 1 : 0, 
          transform: vis ? "none" : "translateX(-30px)", 
          transition: "all .7s ease" 
        }}>
          <div style={{ 
            background: photoBg, 
            borderRadius: 20, 
            aspectRatio: "4/5", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            position: "relative", 
            overflow: "hidden" 
          }}>
            <img 
              src="/images/Profesional1.png" 
              alt="Dra. Paulina Atenas Rocco" 
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ 
              position: "absolute", 
              bottom: -30, 
              right: -30, 
              width: 160, 
              height: 160, 
              borderRadius: "50%", 
              background: "rgba(42,189,192,.12)" 
            }} />
          </div>
          <div style={{ 
            position: "absolute", 
            bottom: 28, 
            left: -28, 
            background: cardBg, 
            borderRadius: 14, 
            boxShadow: shadow, 
            padding: "16px 22px", 
            display: "flex", 
            flexDirection: "column", 
            gap: 2 
          }}>
            <span className="serif" style={{ fontSize: 32, color: "#2ABDC0", lineHeight: 1 }}>+10</span>
            <span style={{ fontSize: 12, color: subTextColor, fontWeight: 500 }}>Años de experiencia</span>
          </div>
        </div>
        
        {/* Columna derecha: texto */}
        <div style={{ 
          opacity: vis ? 1 : 0, 
          transform: vis ? "none" : "translateX(30px)", 
          transition: "all .7s ease .15s" 
        }}>
          <p className="label" style={{ marginBottom: 12 }}>¿Quién Soy?</p>
          <h2 className="serif" style={{ 
            fontSize: "clamp(1.9rem,3vw,2.6rem)", 
            color: textColor, 
            lineHeight: 1.2, 
            marginBottom: 20 
          }}>
            Dra. Paulina Atenas Rocco
          </h2>
          <div style={{ width: 56, height: 3, background: "#2ABDC0", borderRadius: 2, marginBottom: 22 }} />
          <p style={{ color: subTextColor, lineHeight: 1.8, marginBottom: 16 }}>
            Especialidad odontológica centrada en estudiar, prevenir y corregir alteraciones del desarrollo, la forma de las arcadas dentarias y la posición de los maxilares para restablecer el equilibrio morfológico, funcional y la estética facial de forma personalizada.
          </p>
          <p style={{ color: subTextColor, lineHeight: 1.8, marginBottom: 28 }}>
            Con más de 10 años de trayectoria, combina el rigor clínico con una visión holística del rostro, integrando la salud bucal y la armonía facial en cada tratamiento.
          </p>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 14, 
            marginBottom: 32 
          }} className="grid-2col">
            {[
              "Diagnóstico clínico integral",
              "Planes 100% personalizados",
              "Ortodoncia especializada",
              "Armonización facial no invasiva",
              "Tecnología de vanguardia",
              "Atención cálida y cercana"
            ].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e8f7f7"/><path d="M8 12l3 3 5-5" stroke="#2ABDC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 13, color: textColor, fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
          <a href="#contacto" className="btn-teal" style={{ padding: "14px 30px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
            Agendar Evaluación
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}