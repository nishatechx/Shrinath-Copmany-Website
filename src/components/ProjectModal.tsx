import React from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussSimilar: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onDiscussSimilar,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div
        id="project-modal-container"
        className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Preview Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/90 text-white uppercase tracking-wider">
                {project.categoryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              Project Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack & Tags */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Technologies & Solutions Applied
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Client Organization</span>
              <span className="font-semibold text-white">{project.client}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Status</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live & Deployed
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
            <button
              onClick={() => onDiscussSimilar(project.title)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Build A Similar Solution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
