import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div
        id="privacy-modal-container"
        className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Privacy Policy & Terms</h3>
            <p className="text-xs text-slate-400">Shrinath IT Solutions • Last updated 2024</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4">
          <h4 className="font-bold text-white text-base">1. Commitment to Data Privacy</h4>
          <p>
            At Shrinath IT Solutions, we prioritize confidentiality and security. All client source code, design assets, user records, and proprietary business metrics are strictly protected under non-disclosure agreements (NDA).
          </p>

          <h4 className="font-bold text-white text-base">2. Scope of Services</h4>
          <p>
            We provide software development, web engineering, mobile app creation, branding, and digital marketing consulting. Deliverables, intellectual property rights, and maintenance commitments are governed by individual project agreements.
          </p>

          <h4 className="font-bold text-white text-base">3. Intellectual Property</h4>
          <p>
            Upon full settlement of project milestones, complete ownership of custom developed codebases and design assets transfers unconditionally to the client.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
