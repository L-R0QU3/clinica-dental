import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { HERO_SLIDES } from '../../data/heroSlides';

export default function Hero() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  
  const s = HERO_SLIDES[active];
  
  // El Hero siempre tiene fondo oscuro (gradientes), pero ajustamos textos
  const textColor = '#fff';
  const subTextColor = 'rgba(255,255,255,0.7)';
  
  return (
    <section id="inicio" style={{ 
      position: "relative", 
      minHeight: "88vh", 
      display: "flex", 
      alignItems: "center", 
      overflow: "hidden", 
      background: s.bg, 
      transition: "background 1s ease" 
    }}>
      {/* Elementos decorativos */}
      <div style={{ position: "absolute", right: "-80px", top: "-80px", width: 500, height: 500, borderRadius: "50%", background: "rgba(42,189,192,.07)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "8%", bottom: "-60px", width: 300, height: 300, borderRadius: "50%", background: "rgba(42,189,192,.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      
      {/* Imagen de la doctora */}
      <div style={{ 
        position: "absolute", 
        right: 0, 
        bottom: 0, 
        width: "42%", 
        height: "100%", 
        display: "flex", 
        alignItems: "flex-end", 
        justifyContent: "center", 
        overflow: "hidden", 
        pointerEvents: "none" 
      }}>
        <div style={{ 
          width: "90%", 
          height: "88%", 
          background: "rgba(42,189,192,.06)", 
          borderRadius: "180px 180px 0 0", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          overflow: "hidden" 
        }}>
          <img 
            src="/images/perfil-profesional.png" 
            alt="Dra. Paulina Atenas Rocco" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              borderRadius: "180px 180px 0 0",
              transform: "scaleX(-1)" // Volteado horizontal
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 620 }} key={active} className="fade-up">
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 8, 
            background: "rgba(42,189,192,.15)", 
            border: "1px solid rgba(42,189,192,.3)", 
            borderRadius: 99, 
            padding: "6px 16px", 
            marginBottom: 24 
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ABDC0", display: "block" }} />
            <span style={{ color: "#2ABDC0", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>{s.tag}</span>
          </div>
          <h1 className="serif" style={{ 
            fontSize: "clamp(2.2rem,4.5vw,3.6rem)", 
            color: textColor, 
            lineHeight: 1.15, 
            marginBottom: 20 
          }}>
            {s.title}
          </h1>
          <p style={{ 
            color: subTextColor, 
            fontSize: "1.05rem", 
            lineHeight: 1.75, 
            marginBottom: 36, 
            maxWidth: 520 
          }}>
            {s.sub}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={s.href1} className="btn-teal" style={{ padding: "14px 30px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
              {s.cta1}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href={s.href2} className="btn-outline" style={{ padding: "14px 30px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
              {s.cta2}
            </a>
          </div>
        </div>
      </div>
      
      {/* Slider dots y flechas */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} className={`hero-dot${i === active ? " active" : ""}`} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
      <button 
        onClick={() => setActive(a => (a - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        style={{ 
          position: "absolute", 
          left: 20, 
          top: "50%", 
          transform: "translateY(-50%)", 
          background: "rgba(255,255,255,.1)", 
          border: "1.5px solid rgba(255,255,255,.2)", 
          borderRadius: "50%", 
          width: 44, 
          height: 44, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer", 
          color: "#fff", 
          zIndex: 10 
        }}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={() => setActive(a => (a + 1) % HERO_SLIDES.length)}
        style={{ 
          position: "absolute", 
          right: 20, 
          top: "50%", 
          transform: "translateY(-50%)", 
          background: "rgba(255,255,255,.1)", 
          border: "1.5px solid rgba(255,255,255,.2)", 
          borderRadius: "50%", 
          width: 44, 
          height: 44, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer", 
          color: "#fff", 
          zIndex: 10 
        }}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  );
}