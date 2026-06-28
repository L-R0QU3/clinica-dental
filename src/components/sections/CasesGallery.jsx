import { useState, useEffect } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useTheme } from '../../context/ThemeContext';

// Importar todos los archivos .md de la carpeta content/cases
const caseFiles = import.meta.glob('../../../content/cases/*.md', { 
  eager: true,
  as: 'raw'
});

// Función para parsear el frontmatter de un archivo .md
function parseMarkdownFile(content) {
  const lines = content.split('\n');
  let frontmatter = {};
  let body = '';
  let inFrontmatter = false;
  let frontmatterStarted = false;
  
  for (const line of lines) {
    if (line.trim() === '---') {
      if (!frontmatterStarted) {
        frontmatterStarted = true;
        inFrontmatter = true;
        continue;
      } else {
        inFrontmatter = false;
        continue;
      }
    }
    if (inFrontmatter) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        // Intentar parsear listas
        if (value.startsWith('[') && value.endsWith(']')) {
          frontmatter[key.trim()] = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
        } else {
          frontmatter[key.trim()] = value.replace(/['"]/g, '');
        }
      }
    } else if (frontmatterStarted) {
      body += line + '\n';
    }
  }
  
  return { frontmatter, body };
}

// Modal para ver detalles (igual que antes)
function CaseModal({ caseData, onClose }) {
  const { isDark } = useTheme();
  if (!caseData) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }} onClick={onClose}>
      <div style={{
        background: isDark ? '#161b22' : '#fff',
        borderRadius: 16,
        maxWidth: 800,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: 24,
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'sticky',
          top: 0,
          float: 'right',
          background: 'transparent',
          border: 'none',
          fontSize: 28,
          cursor: 'pointer',
          color: isDark ? '#e6edf3' : '#1a1a2e',
        }}>&times;</button>
        <h2 className="serif" style={{ color: isDark ? '#e6edf3' : '#1a1a2e', marginBottom: 12 }}>{caseData.title}</h2>
        <p style={{ color: isDark ? '#8b949e' : '#6b7280', fontSize: 14, marginBottom: 16 }}>{caseData.description}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#8b949e' : '#6b7280', marginBottom: 4 }}>Antes</p>
            <img src={caseData.before} alt="Antes" style={{ width: '100%', borderRadius: 8, border: '1px solid #e8f0fe' }} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#8b949e' : '#6b7280', marginBottom: 4 }}>Después</p>
            <img src={caseData.after} alt="Después" style={{ width: '100%', borderRadius: 8, border: '1px solid #e8f0fe' }} />
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ background: isDark ? '#0d1117' : '#f0fdfd', color: '#2ABDC0', padding: '4px 12px', borderRadius: 99, fontSize: 12 }}>{caseData.category}</span>
          <span style={{ color: isDark ? '#8b949e' : '#9ca3af', fontSize: 12 }}>{caseData.date}</span>
          {caseData.tags?.map(tag => (
            <span key={tag} style={{ background: isDark ? '#0d1117' : '#e8f7f7', color: '#2ABDC0', padding: '2px 10px', borderRadius: 99, fontSize: 11 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CasesGallery() {
  const { isDark } = useTheme();
  const [ref, vis] = useReveal();
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    // Leer todos los archivos .md de la carpeta content/cases
    const loadedCases = [];
    for (const [path, content] of Object.entries(caseFiles)) {
      try {
        const { frontmatter, body } = parseMarkdownFile(content);
        loadedCases.push({
          id: frontmatter.id || loadedCases.length + 1,
          title: frontmatter.title || 'Sin título',
          category: frontmatter.category || 'General',
          date: frontmatter.date || 'Fecha no especificada',
          description: frontmatter.description || '',
          before: frontmatter.before || '/images/placeholder-before.jpg',
          after: frontmatter.after || '/images/placeholder-after.jpg',
          tags: frontmatter.tags || [],
          body: body || '',
        });
      } catch (err) {
        console.error('Error al parsear archivo:', path, err);
      }
    }
    setCases(loadedCases);
  }, []);

  const bg = isDark ? '#0d1117' : '#fff';
  const textColor = isDark ? '#e6edf3' : '#1a1a2e';
  const subTextColor = isDark ? '#8b949e' : '#6b7280';
  const cardBg = isDark ? '#161b22' : '#fff';
  const borderColor = isDark ? '#30363d' : '#e8f0fe';

  if (cases.length === 0) {
    return (
      <section ref={ref} id="casos" style={{ padding: "88px 24px", background: bg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p className="label" style={{ marginBottom: 12 }}>Casos Clínicos</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.5rem)", color: textColor }}>
            Próximamente
          </h2>
          <p style={{ color: subTextColor, maxWidth: 540, margin: "12px auto 0", lineHeight: 1.7 }}>
            La Dra. Paulina está preparando nuevos casos clínicos para mostrar sus resultados.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="casos" style={{ padding: "88px 24px", background: bg, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>Casos Clínicos</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.5rem)", color: textColor }}>
            Antes y Después
          </h2>
          <p style={{ color: subTextColor, maxWidth: 540, margin: "12px auto 0", lineHeight: 1.7 }}>
            Resultados reales de nuestros tratamientos. Cada caso es único y personalizado.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {cases.map((c, i) => (
            <div
              key={c.id || i}
              className="card-lift"
              onClick={() => setSelectedCase(c)}
              style={{
                background: cardBg,
                border: `1.5px solid ${borderColor}`,
                borderRadius: 16,
                padding: 16,
                cursor: "pointer",
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateY(20px)",
                transition: `all .5s ease ${i * 0.08}s`,
                boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,.04)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <img src={c.before} alt="Antes" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 8, border: '1px solid #e8f0fe' }} />
                <img src={c.after} alt="Después" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 8, border: '1px solid #e8f0fe' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: textColor, marginBottom: 4 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: subTextColor, marginBottom: 8 }}>{c.category} · {c.date}</p>
              <p style={{ fontSize: 13, color: subTextColor, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {c.description}
              </p>
              <span style={{ color: '#2ABDC0', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
                Ver detalles <span>→</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedCase && (
        <CaseModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </section>
  );
}