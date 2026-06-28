import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Newsletter() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  
  const bg = isDark ? '#1a6a6d' : '#2ABDC0'; // un tono más oscuro en modo oscuro
  const textColor = '#fff';
  const inputBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)';
  const inputBorder = 'rgba(255,255,255,0.4)';
  const btnBg = isDark ? '#0d1117' : '#1a1a2e';
  const btnText = '#fff';

  return (
    <section style={{ background: bg, padding: "48px 24px", transition: "background 0.3s" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <h3 className="serif" style={{ fontSize: "1.8rem", color: textColor, marginBottom: 10 }}>
          Recibe Consejos de Salud Bucal y Estética
        </h3>
        <p style={{ color: "rgba(255,255,255,.8)", marginBottom: 24, fontSize: 14 }}>Suscríbete y recibe tips, promociones y novedades directamente en tu correo.</p>
        {done ? (
          <p style={{ color: textColor, fontWeight: 700, fontSize: 15 }}>✓ ¡Gracias por suscribirte!</p>
        ) : (
          <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto", flexWrap: "wrap" }}>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Tu correo electrónico"
              style={{ 
                flex: 1, 
                background: inputBg, 
                border: `1.5px solid ${inputBorder}`, 
                color: textColor, 
                borderRadius: 8, 
                padding: "13px 16px", 
                fontSize: 14, 
                outline: "none", 
                minWidth: 200 
              }} 
            />
            <button 
              onClick={() => { if (email) setDone(true); }}
              style={{ 
                background: btnBg, 
                color: btnText, 
                border: "none", 
                borderRadius: 8, 
                padding: "13px 24px", 
                fontWeight: 700, 
                fontSize: 13, 
                cursor: "pointer", 
                letterSpacing: ".04em" 
              }}
            >
              Suscribir
            </button>
          </div>
        )}
      </div>
    </section>
  );
}