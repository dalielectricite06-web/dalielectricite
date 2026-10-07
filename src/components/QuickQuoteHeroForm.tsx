import React, { useState } from 'react';
import { User, Phone, Mail, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES_DATA, COMPANY_INFO } from '../data/companyData';

interface QuickQuoteHeroFormProps {
  onSuccessNotice?: (clientName: string) => void;
}

const FORMBOLD_ENDPOINT = 'https://formbold.com/s/3dN2G';

export const QuickQuoteHeroForm: React.FC<QuickQuoteHeroFormProps> = ({ onSuccessNotice }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('electricite-generale');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Veuillez entrer votre nom');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Veuillez entrer votre numéro de téléphone');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const serviceObj = SERVICES_DATA.find((s) => s.id === service);
      const serviceTitle = serviceObj ? serviceObj.title : service;

      const fullMessage = [
        `⚡ NOUVELLE DEMANDE DE DEVIS EXPRESS (HERO) - DALI ÉLECTRICITÉ`,
        `----------------------------------------------------`,
        `Nom / Client : ${name}`,
        `Téléphone : ${phone}`,
        `Email : ${email || 'Non renseigné'}`,
        `Prestation choisie : ${serviceTitle}`,
        `----------------------------------------------------`,
        `Origine : Formulaire rapide en haut de la page d'accueil`,
      ].join('\n');

      const dataToSend = new FormData();
      dataToSend.append('name', name);
      dataToSend.append('phone', phone);
      dataToSend.append('email', email.trim() ? email : 'dali.electricite06@gmail.com');
      dataToSend.append('service', serviceTitle);
      dataToSend.append('message', fullMessage);
      dataToSend.append('source', 'Formulaire Rapide Hero - Dali Électricité');

      await fetch(FORMBOLD_ENDPOINT, {
        method: 'POST',
        body: dataToSend,
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (err) {
      console.warn('FormBold Hero submit:', err);
    } finally {
      setIsSubmitting(false);
      setIsDone(true);
      if (onSuccessNotice) onSuccessNotice(name);
    }
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-7 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-500">
              ⚡ ESTIMATION RAPIDE &amp; SANS ENGAGEMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              OBTENEZ VOTRE DEVIS GRATUIT !
            </h3>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Artisan disponible aujourd'hui à Cagnes-sur-Mer</span>
          </div>
        </div>

        {isDone ? (
          <div className="py-6 px-4 text-center bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-lg mb-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>Demande transmise avec succès !</span>
            </div>
            <p className="text-sm text-emerald-700 max-w-lg mx-auto">
              Merci <strong>{name}</strong>, notre électricien a reçu votre demande pour <strong>Dali Électricité</strong>. Vous serez contacté par téléphone au <strong>{phone}</strong> dans moins de 30 minutes.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-900 text-white rounded-lg font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Urgence immédiate ? Appeler le {COMPANY_INFO.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsDone(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 underline"
              >
                Nouvelle demande
              </button>
            </div>
          </div>
        ) : (
          <form
            action={FORMBOLD_ENDPOINT}
            method="POST"
            onSubmit={handleQuickSubmit}
            className="space-y-3"
          >
            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 font-medium">
                {errorMsg}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Field 1: Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="quick-name"
                  required
                  placeholder="Nom &amp; Prénom *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>

              {/* Field 2: Phone */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  id="quick-phone"
                  required
                  placeholder="Téléphone * (07 49 13 71 01)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>

              {/* Field 3: Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="quick-email"
                  placeholder="Adresse Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>

              {/* Field 4: Service Need */}
              <div className="relative">
                <select
                  name="service"
                  id="quick-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                >
                  <option value="electricite-generale">Électricité générale (pannes, rénov)</option>
                  <option value="portes-automatiques">Portes automatiques (magasins, piétons)</option>
                  <option value="portails-automatismes">Portails &amp; automatismes (moteur)</option>
                  <option value="rideaux-metalliques">Rideaux métalliques (fermetures)</option>
                  <option value="depannage-urgence">⚡ Dépannage urgent 7j/7</option>
                  <option value="maintenance-sav">Maintenance &amp; SAV régulier</option>
                </select>
                <Wrench className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>🔒 Confidentialité garantie</span>
                <span>•</span>
                <span>Sans engagement</span>
                <span>•</span>
                <span>Conseils d'expert offerts</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Transmission...</span>
                ) : (
                  <>
                    <span>ENVOYER MA DEMANDE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
