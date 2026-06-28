export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'DM Sans', sans-serif;
        font-weight: 400;
        color: #1a1a2e;
        background: #fff;
        -webkit-font-smoothing: antialiased;
        transition: background 0.3s, color 0.3s;
      }
      .serif { font-family: 'DM Serif Display', serif; }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .fade-up { animation: fadeUp 0.6s ease forwards; }
      .fade-in { animation: fadeIn 0.4s ease forwards; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }
      .hero-dot { width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,0.45); cursor:pointer; transition:.3s; border:none; }
      .hero-dot.active { background:#2ABDC0; width:28px; border-radius:99px; }
      .faq-body { overflow:hidden; transition: max-height .35s ease, opacity .35s ease; }
      .card-lift { transition: transform .3s ease, box-shadow .3s ease; }
      .card-lift:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(42,189,192,.12); }
      .nav-link { position:relative; }
      .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:#2ABDC0; transition:.3s; }
      .nav-link:hover::after { width:100%; }
      .label { font-size:13px; font-weight:600; color:#2ABDC0; letter-spacing:.12em; text-transform:uppercase; }
      .btn-teal { background:#2ABDC0; color:#fff; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-weight:600; letter-spacing:.04em; transition:.25s; }
      .btn-teal:hover { background:#1fa9ac; }
      .btn-outline { background:transparent; border:2px solid #2ABDC0; color:#2ABDC0; cursor:pointer; display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-weight:600; letter-spacing:.04em; transition:.25s; }
      .btn-outline:hover { background:#2ABDC0; color:#fff; }
      input, textarea, select {
        font-family: 'DM Sans', sans-serif;
        width: 100%;
        border: 1.5px solid #e2e8f0;
        border-radius: 8px;
        padding: 13px 16px;
        font-size: 14px;
        color: #1a1a2e;
        outline: none;
        transition: border-color .2s;
        background: #fff;
      }
      input:focus, textarea:focus, select:focus { border-color: #2ABDC0; }
      input::placeholder, textarea::placeholder { color: #9ca3af; }

      /* Responsive grids */
      @media (max-width: 768px) {
        .grid-2col { grid-template-columns: 1fr !important; }
        .grid-2col-1-4 { grid-template-columns: 1fr !important; }
        .grid-3col { grid-template-columns: 1fr !important; }
        .grid-4col { grid-template-columns: 1fr 1fr !important; }
        .gap-mobile { gap: 20px !important; }
        .padding-mobile { padding: 40px 20px !important; }
        .text-center-mobile { text-align: center !important; }
      }
      @media (max-width: 480px) {
        .hero-title { font-size: 1.8rem !important; }
        .section-title { font-size: 1.5rem !important; }
        .grid-4col { grid-template-columns: 1fr !important; }
      }

      /* Responsive para el navbar */
      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
      }
      @media (min-width: 769px) {
        .show-mobile { display: none !important; }
      }

      /* Dark mode overrides */
      [data-theme="dark"] body {
        background: #0d1117;
        color: #e6edf3;
      }
      [data-theme="dark"] .bg-white { background: #161b22; }
      [data-theme="dark"] .border-gray { border-color: #30363d; }
      [data-theme="dark"] .card-lift { background: #161b22; border-color: #30363d; }
      [data-theme="dark"] input,
      [data-theme="dark"] textarea,
      [data-theme="dark"] select {
        background: #0d1117;
        color: #e6edf3;
        border-color: #30363d;
      }
      [data-theme="dark"] .btn-outline {
        border-color: #2ABDC0;
        color: #2ABDC0;
      }
      [data-theme="dark"] .btn-outline:hover {
        background: #2ABDC0;
        color: #fff;
      }
      [data-theme="dark"] .faq-item {
        background: #161b22;
        border-color: #30363d;
      }
    `}</style>
  );
}