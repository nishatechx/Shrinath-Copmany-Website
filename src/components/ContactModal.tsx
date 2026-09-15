import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_LIST } from './ServicesSection';
import { PREMIUM_EASE } from '../hooks/useMotionConfig';
import { submitToFormspree } from '../utils/formspree';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  title?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  title = 'Get Free Consultation',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || SERVICES_LIST[0].title,
    businessName: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitToFormspree({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      businessName: formData.businessName,
      message: formData.message,
      source: 'Consultation Modal Form',
      _subject: `New Consultation Request: ${formData.service} from ${formData.name} (${formData.phone})`,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(res.error || 'Failed to submit form. Please check your connection or contact us on WhatsApp.');
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: SERVICES_LIST[0].title,
      businessName: '',
      message: '',
    });
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shrinath IT Solutions, I would like a consultation for ${formData.service}. My Name: ${formData.name}, Business: ${formData.businessName || 'N/A'}, Phone: ${formData.phone}`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            id="consultation-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: PREMIUM_EASE }}
            className="bg-[#12151c] border border-slate-800 text-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Request Received!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>! Our Washim IT expert will call you shortly at <strong className="text-white">{formData.phone}</strong>.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                Done
              </button>
              <a
                href={`https://wa.me/917972865688?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm transition-all inline-flex items-center gap-2"
              >
                <span>Connect on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-[#EAB308] text-xs font-bold uppercase tracking-widest block mb-1">
                SHRINATH IT SOLUTIONS • WASHIM
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Tell us about your business goals and get a free project roadmap & quote.
              </p>
            </div>

            {/* Quick WhatsApp Connect Banner */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Need Fast Help? Call Direct</h4>
                  <p className="text-xs text-amber-400 font-mono">+91 79728 65688</p>
                </div>
              </div>
              <a
                href="https://wa.me/917972865688?text=Hello%20Shrinath%20IT%20Solutions%2C%20I%20would%20like%20to%20get%20a%20free%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all"
              >
                WhatsApp Chat
              </a>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                  <p className="text-slate-400 text-[11px] mt-1">
                    You can also connect with us instantly on WhatsApp at{' '}
                    <a
                      href="https://wa.me/917972865688"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-amber-400 font-semibold"
                    >
                      +91 79728 65688
                    </a>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Deshmukh"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#EAB308]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Business / Shop Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Washim Electronics"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#EAB308]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#EAB308]"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Details / Message
                </label>
                <textarea
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you want to achieve or any specific features you need..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#EAB308] resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 group-hover:opacity-100 pointer-events-none" />
                <Send className="relative z-10 w-4 h-4" />
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
              </motion.button>
            </form>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
