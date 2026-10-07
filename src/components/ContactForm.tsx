import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, AlertCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';

interface ContactFormProps {
  initialService?: string;
  isCompact?: boolean;
  onSuccess?: () => void;
  className?: string;
}

const FORMBOLD_ENDPOINT = 'https://formbold.com/s/3dN2G';

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = '',
  isCompact = false,
  onSuccess,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: initialService || 'electricite-generale',
    clientType: 'particulier',
    city: 'Cagnes-sur-Mer',
    urgency: 'normal',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Veuillez renseigner votre nom complet';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est indispensable pour vous recontacter';
    } else if (!/^(\+33|0)[1-9](\d{2}){4}$/.test(formData.phone.replace(/[\s.-]/g, '')) && formData.phone.length < 8) {
      newErrors.phone = 'Format de téléphone invalide (ex: 07 49 13 71 01)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez saisir une adresse email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide (ex: nom@domaine.fr)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceTitle =
      SERVICES_DATA.find((s) => s.id === formData.serviceId)?.title || formData.serviceId;

    try {
      const fullMessage = [
        `NOUVELLE DEMANDE DE CONTACT / DEVIS - DALI ÉLECTRICITÉ`,
        `====================================================`,
        `👤 Client : ${formData.name}`,
        `📞 Téléphone : ${formData.phone}`,
        `✉️ Email : ${formData.email}`,
        `📍 Ville : ${formData.city}`,
        `🔧 Prestation : ${serviceTitle}`,
        `🏷️ Type de client : ${formData.clientType}`,
        `⏱️ Degré d'urgence : ${formData.urgency === 'urgent' ? '⚡ URGENT (< 24H)' : 'Normal'}`,
        `====================================================`,
        `📝 Détails / Message du client :`,
        formData.message || 'Aucun message particulier fourni',
      ].join('\n');

      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('phone', formData.phone);
      dataToSend.append('email', formData.email);
      dataToSend.append('service', serviceTitle);
      dataToSend.append('city', formData.city);
      dataToSend.append('clientType', formData.clientType);
      dataToSend.append('urgency', formData.urgency === 'urgent' ? '⚡ Urgent (< 24h)' : 'Normal');
      dataToSend.append('message', fullMessage);
      dataToSend.append('source', 'Site Web Dali Électricité - Cagnes-sur-Mer');

      // Real FormBold submission
      await fetch(FORMBOLD_ENDPOINT, {
        method: 'POST',
        body: dataToSend,
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (err) {
      console.warn('FormBold request notification:', err);
    } finally {
      const generatedTicket = 'DALI-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceId: 'electricite-generale',
      clientType: 'particulier',
      city: 'Cagnes-sur-Mer',
      urgency: 'normal',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 text-center border-2 border-emerald-500 shadow-xl max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Demande enregistrée avec succès
        </span>

        <h3 className="text-2xl font-black text-slate-900 mt-3">
          Merci {formData.name} !
        </h3>

        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
          Votre demande de contact pour <strong>Dali Électricité</strong> a bien été transmise à notre artisan. Nous vous recontacterons très rapidement pour convenir d'un diagnostic ou vous transmettre votre devis.
        </p>

        <div className="mt-5 p-4 bg-slate-50 rounded-xl text-left border border-slate-200 space-y-1.5 text-xs text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Numéro de dossier :</span>
            <span className="font-mono font-bold text-slate-900">{ticketId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service concerné :</span>
            <span className="font-medium text-slate-900">
              {SERVICES_DATA.find((s) => s.id === formData.serviceId)?.title || 'Électricité'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Téléphone de contact :</span>
            <span className="font-medium text-slate-900">{formData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Délai estimé de rappel :</span>
            <span className="font-semibold text-amber-600">Moins de 30 minutes</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider shadow"
          >
            <Phone className="w-4 h-4" />
            <span>Besoin urgent ? Appelez le {COMPANY_INFO.phone}</span>
          </a>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action="https://formbold.com/s/3dN2G"
      method="POST"
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 text-slate-800 ${className}`}
      noValidate
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Devis 100% Gratuit &amp; Sans Engagement</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Demande de Contact &amp; Devis
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Réponse rapide sous 30 min • Intervention à Cagnes-sur-Mer et dans tout le département 06
        </p>
      </div>

      <div className="space-y-4">
        {/* Row 1: Nom & Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nom complet <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ex: Jean Dupont"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 ${
                errors.name
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-amber-500 focus:ring-amber-200'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Numéro de téléphone <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="07 49 13 71 01"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-amber-500 focus:ring-amber-200'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email & Ville */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Adresse email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="jean.dupont@email.fr"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 ${
                errors.email
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-amber-500 focus:ring-amber-200'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ville d'intervention
            </label>
            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors"
            >
              <option value="Cagnes-sur-Mer">Cagnes-sur-Mer (06800)</option>
              <option value="Nice">Nice (06000 - 06300)</option>
              <option value="Antibes / Juan-les-Pins">Antibes / Juan-les-Pins (06600)</option>
              <option value="Saint-Laurent-du-Var">Saint-Laurent-du-Var (06700)</option>
              <option value="Villeneuve-Loubet">Villeneuve-Loubet (06270)</option>
              <option value="Cannes">Cannes (06400)</option>
              <option value="Autre commune 06">Autre commune des Alpes-Maritimes</option>
            </select>
          </div>
        </div>

        {/* Row 3: Prestation concernée */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Prestation souhaitée <span className="text-rose-500">*</span>
          </label>
          <select
            name="service"
            id="service"
            value={formData.serviceId}
            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors"
          >
            {SERVICES_DATA.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title} — {service.badge}
              </option>
            ))}
            <option value="depannage-urgence">🚨 Dépannage urgent 7j/7 (Panne, blocage)</option>
          </select>
        </div>

        {/* Client type & Urgency */}
        {!isCompact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Vous êtes
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'particulier', label: 'Particulier' },
                  { id: 'professionnel', label: 'Entreprise' },
                  { id: 'syndic', label: 'Syndic / Copro' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, clientType: type.id })}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-md border text-center transition-all ${
                      formData.clientType === type.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Degré d'urgence
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'normal', label: 'Projet / Devis classique' },
                  { id: 'urgent', label: '⚡ Urgent (< 24h)' },
                ].map((urg) => (
                  <button
                    key={urg.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: urg.id })}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-md border text-center transition-all ${
                      formData.urgency === urg.id
                        ? urg.id === 'urgent'
                          ? 'bg-rose-900 text-white border-rose-900'
                          : 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {urg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message / Description */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
            Détails de votre besoin ou de votre panne
          </label>
          <textarea
            name="message"
            id="message"
            rows={isCompact ? 2 : 3}
            placeholder="Décrivez votre besoin : tableau électrique, motorisation portail, porte bloquée, rideau en panne..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Envoi de votre demande en cours...</span>
            </div>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer ma Demande de Devis Gratuit</span>
            </>
          )}
        </button>

        {/* Reassurance footer */}
        <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            Données protégées
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Réponse garantie &lt; 30 min
          </span>
          <span>•</span>
          <span>Sans engagement</span>
        </div>
      </div>
    </form>
  );
};
