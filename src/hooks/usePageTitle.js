import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `Dra. Paulina Atenas · ${title}` : 'Dra. Paulina Atenas Rocco · Ortodoncia y Armonización Facial';
    return () => { document.title = prevTitle; };
  }, [title]);
}