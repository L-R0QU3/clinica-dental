// src/components/layout/Layout.jsx
import { useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import Topbar from '../common/Topbar';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import AgendarModal from '../common/AgendarModal';  // 👈 Importar el nuevo modal
import Hero from '../sections/Hero';
import WhatWeDo from '../sections/WhatWeDo';
import AboutIntro from '../sections/AboutIntro';
import Services from '../sections/Services';
import NavyBanner from '../sections/NavyBanner';
import Stats from '../sections/Stats';
import Process from '../sections/Process';
import Testimonials from '../sections/Testimonials';
// import CasesGallery from '../sections/CasesGallery';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import Newsletter from '../sections/Newsletter';

export default function Layout() {
  const [agendarOpen, setAgendarOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Topbar />
      <Navbar onOpenAgendar={() => setAgendarOpen(true)} />  {/* 👈 Prop actualizada */}
      <main>
        <Hero />
        <WhatWeDo />
        <AboutIntro />
        <Services />
        <NavyBanner />
        <Stats />
        <Process />
        <Testimonials />
        {/* <CasesGallery /> */}
        <FAQ />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
      <AgendarModal isOpen={agendarOpen} onClose={() => setAgendarOpen(false)} />
    </>
  );
}