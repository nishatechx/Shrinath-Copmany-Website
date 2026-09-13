import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceData } from './ServicesSection';
import { PREMIUM_EASE } from '../hooks/useMotionConfig';

interface ServiceModalProps {
  service: ServiceData | null;
  onClose: () => void;
  onSelectForQuote: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectForQuote,
}) => {
  const Icon = service?.icon;

  return (
    <AnimatePresence>
      {service && (
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
            id="service-modal-container"
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

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[#EAB308] text-xs font-bold uppercase tracking-wider block">
                    OUR SERVICES
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {service.longDescription || service.description}
              </p>

              {/* Key Deliverables & Features */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Included Deliverables & Features
                </h4>
                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-slate-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Quote CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-200 block">Customized Solution</span>
                  Tailored to your specific business requirements
                </div>

                <motion.button
                  onClick={() => {
                    onClose();
                    onSelectForQuote(service.title);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-orange-500/40 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 pointer-events-none" />
                  <span className="relative z-10">Get Free Quote</span>
                  <ArrowRight className="relative z-10 w-4 h-4 ml-2" />
                </motion.button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
