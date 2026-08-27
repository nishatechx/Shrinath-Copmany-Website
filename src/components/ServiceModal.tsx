import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForQuote: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectForQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div
        id="service-modal-container"
        className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
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
          <div className="mb-6">
            <span className="text-sky-400 text-xs font-bold uppercase tracking-widest block mb-1">
              SERVICE SPECIFICATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {service.title}
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Capabilities */}
          {service.features && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Capabilities & Features
              </h4>
              <div className="space-y-2.5">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          {service.deliverables && (
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Standard Deliverables
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => onSelectForQuote(service.title)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
