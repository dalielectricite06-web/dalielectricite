import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronRight, Clock, ShieldCheck, Zap, Instagram, ExternalLink } from 'lucide-react';
import { DaliLogo } from './DaliLogo';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenQuoteModal: (preselectedService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Nos Services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'apropos', label: 'À Propos' },
    { id: 'zones', label: 'Zones d’intervention' },
    { id: 'contact', label: 'Contact & Devis' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Top Utility Bar (Black / Dark Slate matching inspiration reference) */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Address & City */}
          <div className="flex items-center flex-wrap gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{COMPANY_INFO.address.full}</span>
            </span>

            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <span className="text-slate-600">|</span>
              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Urgences &amp; Dépannage 7j/7</span>
            </span>
          </div>

          {/* Email, Instagram & Trust marker */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </a>

            {/* Instagram link */}
            <a
              href={COMPANY_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors font-semibold"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.instagram.handle}</span>
            </a>

            <div className="hidden lg:flex items-center gap-1 text-[11px] text-amber-400 font-medium bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              <ShieldCheck className="w-3 h-3" />
              <span>Garantie Décennale &amp; NF C 15-100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo Zone */}
          <button
            onClick={() => handleLinkClick('accueil')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <DaliLogo variant="light" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-amber-600 ${
                    isActive ? 'text-amber-600 font-bold' : 'text-slate-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Direct Actions Zone (Phone button + Get a quote) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone button styled in rich burgundy/crimson like reference mockup */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-white font-bold text-sm bg-rose-900 hover:bg-rose-950 transition-all shadow-sm active:scale-95 group"
              title="Appel direct d'urgence"
            >
              <div className="w-6 h-6 rounded-full bg-rose-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-3.5 h-3.5 text-white animate-pulse" />
              </div>
              <span className="tracking-wide">{COMPANY_INFO.phone}</span>
            </a>

            {/* Electric yellow CTA button */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-extrabold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-sm active:scale-95 uppercase tracking-wider"
            >
              Devis Gratuit
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 rounded-lg bg-rose-900 text-white"
              aria-label="Appeler"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-slate-950 rounded-lg hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 text-white animate-in slide-in-from-top duration-200">
          <div className="space-y-1 pb-4 border-b border-slate-800">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 space-y-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg bg-rose-900 hover:bg-rose-950 text-white font-bold text-center text-sm"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Appeler le {COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-center uppercase tracking-wider text-sm shadow-md"
            >
              Demander un Devis Gratuit
            </button>

            {/* Mobile Instagram Button */}
            <a
              href={COMPANY_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white font-bold text-xs uppercase"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram : {COMPANY_INFO.instagram.handle}</span>
            </a>

            <div className="text-center pt-2 text-xs text-slate-400">
              <p>13 impasses des espartes, 06800 Cagnes sur mer</p>
              <p className="text-amber-400 font-medium mt-0.5">Intervention rapide dans tout le 06</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
