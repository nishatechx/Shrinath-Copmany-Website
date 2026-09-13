import React from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, ChevronDown, FolderGit2 } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';
import { PROJECTS } from '../../data/content';
import { ProjectItem } from '../../types';

interface ProjectsJourneySectionProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const ProjectsJourneySection: React.FC<ProjectsJourneySectionProps> = ({ onSelectProject }) => {
  const { activeProjectIndex, setActiveProjectIndex, scrollToSection } = useScrollJourney();
  const currentProjects = PROJECTS.slice(0, 6);
  const activeProj = currentProjects[activeProjectIndex] || currentProjects[0];

  const handlePrev = () => {
    setActiveProjectIndex((activeProjectIndex - 1 + currentProjects.length) % currentProjects.length);
  };

  const handleNext = () => {
    setActiveProjectIndex((activeProjectIndex + 1) % currentProjects.length);
  };

  return (
    <section
      id="section-projects"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PHASE 09 // 3D PORTFOLIO GALLERY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            CRAFTED FOR <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              REAL IMPACT.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Explore our featured client deployments across education, enterprise, retail, and media.
          </p>
        </div>

        {/* Active Project Card HUD Overlay */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl shadow-2xl relative">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-blue-600/20 text-sky-400 border border-blue-500/30 text-xs font-mono font-bold uppercase">
                {activeProj.categoryName || activeProj.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeProj.client}
              </span>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-slate-400">
                0{activeProjectIndex + 1} / 0{currentProjects.length}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5">
            {activeProj.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {activeProj.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {activeProj.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
            {activeProj.liveUrl && (
              <a
                href={activeProj.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Visit Live Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {onSelectProject && (
              <button
                onClick={() => onSelectProject(activeProj)}
                className="text-sm font-semibold text-slate-300 hover:text-white cursor-pointer ml-auto"
              >
                View Case Study
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(10)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </button>
    </section>
  );
};
