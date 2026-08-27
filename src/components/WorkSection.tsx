import React, { useState } from 'react';
import { PROJECTS } from '../data/content';
import { ProjectCategory, ProjectItem } from '../types';
import { ArrowRight, ExternalLink, Eye, Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { TiltCard3D } from './TiltCard3D';

interface WorkSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onViewAllProjects: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Websites', value: 'websites' },
    { label: 'Mobile Apps', value: 'mobile-apps' },
    { label: 'Branding', value: 'branding' },
    { label: 'Marketing', value: 'marketing' },
  ];

  const filteredProjects = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="py-14 sm:py-16 lg:py-20 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Matrix Reveal */}
        <WebGLSectionReveal preset="matrix-3d" className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
              PROVEN DEPLOYMENTS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Some Of Our Recent Work
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
        </WebGLSectionReveal>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isActive = activeTab === cat.value;
            return (
              <button
                key={cat.value}
                id={`work-filter-${cat.value}`}
                onClick={() => setActiveTab(cat.value)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with WebGL 3D Tilt Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 perspective-1000"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <TiltCard3D
                  id={`project-card-${project.id}`}
                  maxTilt={6}
                  scale={1.02}
                  onClick={() => onSelectProject(project)}
                  className="h-full"
                >
                  <div className="h-full group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col cursor-pointer">
                    {/* Project Image Container */}
                    <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* High-tech overlay with telemetry badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                        <span className="self-end font-mono text-[10px] text-sky-300 bg-slate-900/80 px-2 py-0.5 rounded border border-sky-500/40">
                          LIVE // APP
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full self-start shadow-md">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Project Details</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Meta & Title */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-medium mt-1">
                          {project.categoryName}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-blue-600 font-semibold">
                        <span>Explore Case</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button with 3D Depth Entrance */}
        <WebGLSectionReveal preset="depth-lift" className="text-center">
          <motion.button
            id="view-all-projects-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </WebGLSectionReveal>

      </div>
    </section>
  );
};

