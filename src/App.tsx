/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ZonesPage } from './pages/ZonesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('accueil');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [modalServiceId, setModalServiceId] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceId?: string) => {
    setModalServiceId(serviceId);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setModalServiceId(undefined);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to popstate or url hashes if desired
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['accueil', 'services', 'realisations', 'apropos', 'zones', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950 pb-16 lg:pb-0">
      {/* Top Header with Utility Strip and Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'accueil' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'realisations' && (
          <ProjectsPage
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'apropos' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {currentPage === 'zones' && (
          <ZonesPage
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Professional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Quote / Contact Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preselectedService={modalServiceId}
      />

      {/* Mobile Sticky Quick Call & Quote Bar (Respects 15% height rule) */}
      <MobileQuickBar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />
    </div>
  );
}
