import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ZONES_DATA, STAYS_DATA } from '../data';
import { ZoneId, StayItem } from '../types';

interface ZoneExplorerProps {
  onSelectStay: (zoneId: ZoneId, stayId: string) => void;
}

export default function ZoneExplorer({ onSelectStay }: ZoneExplorerProps) {
  const [currentZone, setCurrentZone] = useState<ZoneId>('start');
  const [hoveredStay, setHoveredStay] = useState<string | null>(null);

  const selectedZoneInfo = ZONES_DATA.find((z) => z.id === currentZone)!;
  const filteredStays = STAYS_DATA.filter((s) => s.zoneId === currentZone);

  // Helper to scroll to reserve form
  const handleStaySelectAndScroll = (zoneId: ZoneId, stayId: string) => {
    onSelectStay(zoneId, stayId);
    const element = document.getElementById('reserve');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="zones" className="py-24 bg-[#0A1128] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-teal-400 uppercase font-mono block">
            Local Cluster
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-tight text-white">
            탄광의 흐름으로 빚어진 3대 권역
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mt-4" />
          <p className="text-white/60 text-sm max-w-xl mx-auto font-light leading-relaxed pt-2">
            폐탄광의 기점을 중심으로 마을을 재분류하여 태백 고유의 고즈넉한 밤 풍경을 전합니다. 
            원하시는 테마의 권역을 선택하시면 세부 스테이를 확인하실 수 있습니다.
          </p>
        </div>

        {/* Zone Tabs (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ZONES_DATA.map((zone) => {
            const isActive = currentZone === zone.id;
            return (
              <div
                key={zone.id}
                onClick={() => setCurrentZone(zone.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setCurrentZone(zone.id);
                }}
                tabIndex={0}
                className={`relative overflow-hidden border p-8 rounded-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-1.5 group focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#1C2541] to-[#3A506B] border-teal-400/80 shadow-[0_15px_40px_rgba(91,192,190,0.15)] text-white'
                    : 'bg-[#111C44]/40 hover:bg-[#111C44]/80 border-white/10 text-white/90'
                }`}
                id={`zone-tab-${zone.id}`}
              >
                {/* Milkyway interactive background stars */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-400 via-transparent to-transparent group-hover:scale-125 transition-transform duration-700" />
                
                <span className="text-[10px] font-mono tracking-widest text-teal-300 block mb-2 font-semibold">
                  {zone.subName.split(' [')[0]}
                </span>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-between font-serif">
                  {zone.name}
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    isActive ? 'text-teal-300 translate-x-1' : 'opacity-45 group-hover:opacity-100 group-hover:translate-x-1'
                  }`} />
                </h3>
                
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {zone.desc.slice(0, 100)}...
                </p>
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full font-medium border border-white/5">
                    {zone.tag}
                  </span>
                  <span className="text-[10px] opacity-40 font-mono tracking-wide">
                    {zone.subName.includes('[') ? zone.subName.split('[')[1].replace(']', '') : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Container with Map & Listings */}
        <div className="bg-[#111C44]/35 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentZone}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Left Column: Zone Map & Story */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-teal-400 text-[#0B132B] text-[10px] font-bold rounded-md font-mono tracking-wider uppercase shadow-md shadow-teal-400/10">
                    {selectedZoneInfo.tag}
                  </span>
                  <span className="text-xs font-mono text-white/50 tracking-wider">MAP CLUSTER</span>
                </div>

                <h4 className="text-2xl md:text-3xl font-bold text-white font-serif tracking-tight">
                  {selectedZoneInfo.title}
                </h4>
                
                <p className="text-white/70 font-light leading-relaxed text-sm">
                  {selectedZoneInfo.desc}
                </p>

                {/* Celestial Interactive Star Map */}
                <div className="relative border border-white/15 p-1 rounded-2xl bg-[#0B132B]/80 overflow-hidden group shadow-inner">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  
                  {/* Astro Concentric Rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-white/5 rounded-full pointer-events-none border-dashed" />
                  
                  {/* Map Graphic Area */}
                  <div className="relative w-full h-52 flex flex-col items-center justify-center p-6 text-center">
                    <MapPin className="w-8 h-8 text-teal-400 mb-2 animate-bounce" />
                    
                    {/* Glowing hot points on map */}
                    {filteredStays.map((stay, idx) => {
                      const isActive = hoveredStay === stay.id;
                      // Pseudo placement for celestial coordinates
                      const offsets = [
                        { x: '35%', y: '30%' },
                        { x: '65%', y: '60%' },
                      ];
                      const pos = offsets[idx % offsets.length];

                      return (
                        <div
                          key={stay.id}
                          style={{ left: pos.x, top: pos.y }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node"
                        >
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive ? 'bg-teal-400 scale-125 shadow-[0_0_15px_#2dd4bf]' : 'bg-blue-400/60'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                          
                          <span className={`absolute top-5 bg-[#111C44] text-[9px] text-white px-2 py-0.5 rounded border border-white/10 whitespace-nowrap transition-all duration-300 ${
                            isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-60 scale-95 -translate-y-1'
                          }`}>
                            {stay.name}
                          </span>
                        </div>
                      );
                    })}

                    <span className="text-xs text-white/50 font-mono tracking-widest uppercase z-10 block mt-4">
                      {selectedZoneInfo.name} COORDINATES
                    </span>
                    <span className="text-[10px] text-teal-300/80 font-light mt-1 max-w-xs z-10">
                      {selectedZoneInfo.mapDesc}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Stays List */}
              <div className="lg:col-span-7 space-y-6">
                <h5 className="text-xs font-bold font-mono text-white/50 tracking-widest uppercase block border-b border-white/10 pb-2">
                  소속 분산형 숙소 리스트 ({filteredStays.length})
                </h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredStays.map((stay) => {
                    const isHovered = hoveredStay === stay.id;
                    return (
                      <div
                        key={stay.id}
                        onMouseEnter={() => setHoveredStay(stay.id)}
                        onMouseLeave={() => setHoveredStay(null)}
                        className={`bg-[#0B132B]/70 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col h-full group ${
                          isHovered
                            ? 'border-teal-400/50 shadow-[0_10px_25px_rgba(45,212,191,0.08)] -translate-y-1'
                            : 'border-white/5 hover:border-white/15'
                        }`}
                        id={`stay-card-${stay.id}`}
                      >
                        {/* Stay Image with Aspect Ratio */}
                        <div className="relative h-44 overflow-hidden bg-slate-800">
                          <img
                            src={stay.image}
                            alt={stay.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent" />
                          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider text-teal-300 border border-white/10">
                            ₩{stay.price.toLocaleString()} / 박
                          </div>
                        </div>

                        {/* Stay Text */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1 text-[10px] text-white/50 font-light mb-1.5">
                              <MapPin className="w-3 h-3 text-teal-400" />
                              <span className="truncate">{stay.location.split('(')[1]?.replace(')', '') || '태백 일대'}</span>
                            </div>
                            
                            <h6 className="font-bold text-base text-white font-serif group-hover:text-teal-300 transition-colors">
                              {stay.name}
                            </h6>
                            
                            <p className="text-[11px] text-white/70 font-light mt-2.5 leading-relaxed line-clamp-3">
                              {stay.desc}
                            </p>

                            {/* Features Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {stay.features.map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] bg-white/5 text-white/60 px-2 py-0.5 rounded border border-white/5 font-light"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Quick Book Button */}
                          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-white/40 font-mono">
                              {stay.capacity}
                            </span>
                            
                            <button
                              onClick={() => handleStaySelectAndScroll(stay.zoneId, stay.id)}
                              className="text-[11px] text-teal-400 font-semibold tracking-wide flex items-center gap-1 hover:text-white hover:underline transition-all"
                              id={`btn-select-stay-${stay.id}`}
                            >
                              예약하기
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
