import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Activity, Coffee, Compass, Camera, Sparkle, Calendar } from 'lucide-react';
import { PROGRAMS_DATA, ZONES_DATA } from '../data';
import { ZoneId } from '../types';

export default function ProgramsSection() {
  const [filter, setFilter] = useState<ZoneId | 'all'>('all');

  const filteredPrograms = filter === 'all' 
    ? PROGRAMS_DATA 
    : PROGRAMS_DATA.filter(p => p.zoneId === filter);

  // Helper to resolve icon based on program ID
  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'prog-trail':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'prog-yoga':
        return <Sparkles className="w-5 h-5 text-teal-400" />;
      case 'prog-tea':
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'prog-craft':
        return <Compass className="w-5 h-5 text-purple-400" />;
      case 'prog-gorp':
        return <Camera className="w-5 h-5 text-sky-400" />;
      case 'prog-aurora':
        return <Sparkle className="w-5 h-5 text-indigo-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-400" />;
    }
  };

  // Helper to resolve zone name
  const getZoneName = (zoneId: ZoneId) => {
    return ZONES_DATA.find(z => z.id === zoneId)?.name || '기타 별채';
  };

  return (
    <section id="programs" className="py-24 bg-white text-[#0B132B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-[#0B132B]/50 uppercase font-mono block">
            Local Program
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-tight text-[#0B132B]">
            마을에 머물며 태백의 밤을 경험해보세요
          </h2>
          <div className="w-12 h-1 bg-[#0B132B] mx-auto rounded-full mt-4" />
          <p className="text-[#0B132B]/60 text-sm max-w-xl mx-auto font-light leading-relaxed pt-2">
            별채에 머무시는 동안 태백의 밤을 가득 채우는 로컬 크리에이터들과의 만남이 이루어집니다. 
            원하시는 테마의 체험을 확인해보세요.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border ${
              filter === 'all'
                ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-md shadow-[#0B132B]/10'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-[#0B132B]'
            }`}
            id="filter-btn-all"
          >
            전체 프로그램
          </button>
          {ZONES_DATA.map((z) => (
            <button
              key={z.id}
              onClick={() => setFilter(z.id)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border ${
                filter === z.id
                  ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-md shadow-[#0B132B]/10'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-[#0B132B]'
              }`}
              id={`filter-btn-${z.id}`}
            >
              {z.name} ({z.tag.split(' / ')[0]})
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                layout
                key={program.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 p-8 rounded-3xl transition-all duration-300 group shadow-sm hover:shadow-md"
                id={`program-card-${program.id}`}
              >
                <div className="space-y-5">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-[#0B132B]/50 font-bold uppercase">
                      {getZoneName(program.zoneId)}
                    </span>
                    <div className="p-2.5 bg-[#0B132B]/5 rounded-xl border border-[#0B132B]/5 group-hover:bg-[#0B132B] group-hover:text-white transition-all duration-500">
                      {getProgramIcon(program.id)}
                    </div>
                  </div>

                  {/* Main Header */}
                  <div className="border-l-4 border-[#0B132B] pl-4">
                    <span className="text-xs text-[#0B132B]/60 block font-light">
                      Host. {program.host}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#0B132B] mt-1 group-hover:text-teal-600 transition-colors">
                      {program.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#0B132B]/75 leading-relaxed font-light">
                    {program.desc}
                  </p>
                </div>

                {/* Footer Time & Schedule */}
                <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-[#0B132B]/60" />
                  <span className="text-[10px] font-mono tracking-wide font-medium">
                    {program.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
