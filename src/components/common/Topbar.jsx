export default function Topbar() {
  return (
    <div style={{ background: "#1a1a2e", padding: "10px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="14" height="14" fill="none" stroke="#2ABDC0" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 17v2a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Urgencias: +569 1234 5678
          </span>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="14" height="14" fill="none" stroke="#2ABDC0" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            contacto@drapatenas.cl
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "rgba(255,255,255,.5)", fontSize: 12 }}>Lun–Vie 09:00–19:00 · Sáb 09:00–13:00</span>
          <a href="#contacto" className="btn-teal" style={{ padding: "8px 20px", fontSize: 12, borderRadius: 6, textDecoration: "none" }}>
            Agendar Evaluación
          </a>
        </div>
      </div>
    </div>
  );
}