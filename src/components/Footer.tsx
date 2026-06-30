import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070C1B] border-t border-white/5 py-16 text-sm text-white/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-10 mb-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="font-bold text-white text-lg tracking-widest font-serif">별채</span>
              <span className="text-xs font-light tracking-widest opacity-60 border border-white/30 px-2 py-0.5 rounded font-mono">
                星寨
              </span>
            </div>
            <p className="text-xs text-white/50 max-w-sm leading-relaxed font-light">
              태백 전역을 하나의 분산형 호텔처럼 연결하는 고원 체류형 관광 네트워크. 
              우리의 목적지는 단일 건물이 아닌 태백의 찬란한 대자연과 고독한 밤하늘 전체입니다.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-xs font-mono tracking-wider uppercase text-white/50">
            <div className="space-y-3 text-center md:text-left">
              <h5 className="text-white font-bold text-[10px]">RESERVATION</h5>
              <p className="font-light hover:text-white transition-colors cursor-pointer">Check-in Info</p>
              <p className="font-light hover:text-white transition-colors cursor-pointer">Cancellation Policy</p>
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h5 className="text-white font-bold text-[10px]">CONTACTS</h5>
              <p className="font-light">Tel: 1588-XXXX</p>
              <p className="font-light">Email: contact@byeolchae.local</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <p className="font-light">© 2026 별채 (星寨). All rights reserved.</p>
          </div>
          <p className="text-white/30 font-light text-center sm:text-right">
            강원특별자치도 태백시 일대 분산형 마을 스테이 재생 프로젝트
          </p>
        </div>
      </div>
    </footer>
  );
}
