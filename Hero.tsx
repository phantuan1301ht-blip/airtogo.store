import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-slate-900 border-b border-slate-800 overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" className="text-slate-700"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-slate-900/90 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold text-sky-100 uppercase tracking-widest">Next Gen AI Copywriting</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Professional SEO Content <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-300">
            Global Standard
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Transform raw product data into high-converting, culturally adapted sales copy. 
          Engineered for modern e-commerce dominance.
        </p>

        {/* Optional Stats/Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Market Trend Analysis
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            Multi-language Native
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            SEO Optimized
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;