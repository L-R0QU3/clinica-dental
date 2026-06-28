import { useTheme } from '../../context/ThemeContext';
import { SERVICES } from '../../data/services';

export default function Footer() {
  const { isDark } = useTheme();
  
  const bg = isDark ? '#0d1117' : '#1a1a2e';
  const textColor = isDark ? '#e6edf3' : 'rgba(255,255,255,0.6)';
  const titleColor = isDark ? '#e6edf3' : '#fff';
  const borderColor = isDark ? '#30363d' : 'rgba(255,255,255,0.08)';
  const linkColor = isDark ? '#8b949e' : 'rgba(255,255,255,0.5)';
  const socialBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.06)';
  const socialBorder = isDark ? '#30363d' : 'rgba(255,255,255,0.1)';
  const brandColor = isDark ? '#e6edf3' : '#fff';

  return (
    <footer style={{ background: bg, color: textColor, padding: "64px 24px 28px", transition: "background 0.3s, color 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 40, paddingBottom: 40, borderBottom: `1px solid ${borderColor}`, marginBottom: 28 }} className="grid-4col">
          {/* Brand */}
          <div>
            <div className="serif" style={{ fontSize: 20, color: brandColor, marginBottom: 6 }}>Dra. Paulina Atenas Rocco</div>
            <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#2ABDC0", marginBottom: 16 }}>Ortodoncia · Armonización Facial</div>
            <p style={{ fontSize: 13, lineHeight: 1.75, maxWidth: 280 }}>Especialista en equilibrio morfológico, funcional y estética facial personalizada. Tu sonrisa, nuestra misión.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {["Instagram", "Facebook", "WhatsApp"].map(s => (
                <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: "50%", background: socialBg, border: `1px solid ${socialBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: linkColor, fontSize: 11, textDecoration: "none", fontWeight: 500 }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          {/* Quick links */}
          <div>
            <p style={{ color: titleColor, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 18 }}>Navegación</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Inicio", "#inicio"], ["Sobre Mí", "#sobre-mi"], ["Servicios", "#servicios"], ["Testimonios", "#testimonios"], ["Contacto", "#contacto"]].map(([l, h]) => (
                <li key={l}><a href={h} style={{ color: linkColor, fontSize: 13, textDecoration: "none", transition: ".2s" }}>{l}</a></li>
              ))}
            </ul>
          </div>
          {/* Services */}
          <div>
            <p style={{ color: titleColor, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 18 }}>Servicios</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {SERVICES.slice(0, 6).map(s => (
                <li key={s.title}><a href="#servicios" style={{ color: linkColor, fontSize: 12, textDecoration: "none" }}>{s.title}</a></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <p style={{ color: titleColor, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 18 }}>Contacto</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📍", val: "Av. Principal 1234, Santiago, Chile" },
                { icon: "📞", val: "+569 1234 5678" },
                { icon: "✉️", val: "contacto@drapatenas.cl" },
                { icon: "🕐", val: "Lun–Vie 09:00–19:00 · Sáb 09:00–13:00" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14, marginTop: 1 }}>{c.icon}</span>
                  <span style={{ fontSize: 12, lineHeight: 1.6 }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: linkColor }}>© {new Date().getFullYear()} Dra. Paulina Atenas Rocco. Todos los derechos reservados.</p>
          <p style={{ fontSize: 12, color: linkColor }}>Diseño web profesional · Chile</p>
        </div>
      </div>
    </footer>
  );
}