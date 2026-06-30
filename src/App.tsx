import { useState, useEffect } from 'react';
import Header from './components/Header';
import ZoneExplorer from './components/ZoneExplorer';
import ProgramsSection from './components/ProgramsSection';
import ReservationForm from './components/ReservationForm';
import MyBookings from './components/MyBookings';
import Footer from './components/Footer';
import { ZoneId, Reservation } from './types';
import { Moon, Star, Sparkles, Gift, Compass, Check, ChevronDown, Clock, ShieldAlert } from 'lucide-react';

export default function App() {
  // Stored reservation states
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<ZoneId>('start');
  const [selectedStayId, setSelectedStayId] = useState<string>('');
  const [isBookingsOpen, setIsBookingsOpen] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('byeolchae_bookings');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing reservations', e);
      }
    } else {
      // Seed an initial historical stay for visual feedback & demonstration
      const initialSeed: Reservation[] = [
        {
          id: 'RES-837492',
          zoneId: 'start',
          stayId: 'stay-sky',
          guestName: '홍길동',
          phone: '010-1234-5678',
          checkInDate: '2026-06-15',
          guestsCount: 2,
          status: 'confirmed',
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        },
      ];
      setReservations(initialSeed);
      localStorage.setItem('byeolchae_bookings', JSON.stringify(initialSeed));
    }
  }, []);

  // Update selected lodging & zone
  const handleSelectStay = (zoneId: ZoneId, stayId: string) => {
    setSelectedZoneId(zoneId);
    setSelectedStayId(stayId);
  };

  // Add reservation
  const handleAddReservation = (newRes: Reservation) => {
    const updated = [newRes, ...reservations];
    setReservations(updated);
    localStorage.setItem('byeolchae_bookings', JSON.stringify(updated));
  };

  // Cancel reservation
  const handleCancelReservation = (id: string) => {
    const updated = reservations.map((r) =>
      r.id === id ? { ...r, status: 'cancelled' as const } : r
    );
    setReservations(updated);
    localStorage.setItem('byeolchae_bookings', JSON.stringify(updated));
  };

  // Scroll handler for explore button
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0B132B] text-white font-sans antialiased selection:bg-teal-400 selection:text-[#0B132B] min-h-screen">
      {/* Header */}
      <Header
        reservations={reservations}
        onOpenBookings={() => setIsBookingsOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1128] to-[#111C44] px-6 py-20">
        
        {/* Stellar Background Art elements */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px]" />
          
          {/* Faux tiny stars */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-48 right-32 w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
          <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/5 w-0.5 h-0.5 bg-blue-200 rounded-full" />
        </div>
        
        {/* Main Hero Layout Grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-teal-300 font-mono tracking-widest uppercase">
              <Star className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              Taebaek Station Cluster
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight font-serif text-white">
              태백 전역이<br className="hidden sm:block" />
              하나의 밤이 되다
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              태백의 낮이 치열했던 석탄의 역사였다면, 태백의 밤은 무한한 은하수의 시간입니다.<br />
              별채는 태백의 짙은 밤하늘과 은하수를 체류의 언어로 번역하는 당신만의 고요한 별빛 관측소입니다.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection('zones')}
                className="w-full sm:w-auto border border-white/30 hover:border-teal-400 text-white hover:text-teal-300 px-8 py-4 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                id="btn-hero-explore"
              >
                Explore Stays
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('reserve')}
                className="w-full sm:w-auto bg-white hover:bg-teal-400 text-[#0B132B] font-bold px-8 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer"
                id="btn-hero-reserve"
              >
                Quick Reserve
              </button>
            </div>
          </div>

          {/* Stargazing Weather Widget (Right side card) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-[#111C44]/40 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden group shadow-2xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl" />
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-5 h-5 text-teal-300 animate-pulse" />
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-teal-300 block font-bold">TAEBAEK OBSY</span>
                      <h3 className="font-bold text-sm text-white font-serif">오늘의 은하수 지수</h3>
                    </div>
                  </div>
                  <span className="bg-teal-400 text-[#0B132B] font-black text-xs px-2.5 py-1 rounded-md font-mono">
                    94%
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">최적 관측 시간</span>
                    <span className="font-bold text-white font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      23:00 - 03:00 (KST)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">월령 상태 (Moon Phase)</span>
                    <span className="font-bold text-white">그믐달 (New Moon - 최적)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">평균 구름량 (Cloud Cover)</span>
                    <span className="font-mono text-teal-300 font-bold">4% (매우 맑음)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">고원 기온 (Temperature)</span>
                    <span className="font-mono text-white">16°C (선선한 산들바람)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-center text-[11px] text-white/50 leading-relaxed font-light">
                  "은하수가 흐르는 계절, 태백 산간지대의 높은 고도 덕분에 미세먼지와 빛공해가 전혀 없이 선명한 밤하늘을 마주하실 수 있습니다."
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Story Section (High Contrast Light Background) */}
      <section id="story" className="py-28 bg-white text-[#0B132B] relative overflow-hidden">
        {/* Subtle decorative vector lines */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#111C44] to-transparent opacity-5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="inline-block border-b-2 border-[#0B132B]/10 pb-2.5">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#0B132B]/50 font-mono">
              Brand Story
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold leading-tight font-serif tracking-tight text-[#0B132B]">
            본채를 떠나 나만의 몰입을 마주하는 공간,<br />
            밤이 되면 하늘의 별을 담는 집.
          </h2>
          
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-3xl mx-auto">
            전통적인 의미의 별채(別寨)가 본채 옆에 붙은 여유와 확장(+)의 공간이었다면, 태백의 별채는{' '}
            <strong className="font-bold text-[#0B132B] font-serif">'별을 품은 집(星寨)'</strong>으로 재정의됩니다. 
            도시의 자극적인 불빛과 일상(본채)에서 멀찍이 벗어난 고독한 여행자들에게, 대한민국에서 가장 높은 고원 도시 태백의 은하수 아래에서 온전하고 안온한 쉼을 선물합니다. 
            우리의 리셉션 데스크는 한 곳에 있지 않으며, 태백 전역에 분산되어 오직 당신만의 여정을 호위합니다.
          </p>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#0B132B]/5 flex items-center justify-center font-bold text-[#0B132B] font-mono text-xs">
                01
              </div>
              <h4 className="font-bold text-sm text-[#0B132B]">분산형 스테이</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                호텔 건물에 갇히는 대신 태백 전역의 고택과 숲속 캐빈이 각각의 별관이 됩니다.
              </p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#0B132B]/5 flex items-center justify-center font-bold text-[#0B132B] font-mono text-xs">
                02
              </div>
              <h4 className="font-bold text-sm text-[#0B132B]">우주적 몰입</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                해발 1,100m 고원지대의 극소수 천체 관측 기어들과 함께 밤하늘에 잠깁니다.
              </p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#0B132B]/5 flex items-center justify-center font-bold text-[#0B132B] font-mono text-xs">
                03
              </div>
              <h4 className="font-bold text-sm text-[#0B132B]">마을 공존 체험</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                티 마스터, 아웃도어 러너 등 로컬 전문가와 함께 태백의 역사와 자연을 나눕니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone Explorer (Lodging clusters) */}
      <ZoneExplorer onSelectStay={handleSelectStay} />

      {/* Local Programs Section */}
      <ProgramsSection />

      {/* Signature Gift Perks Section */}
      <section className="py-24 bg-gradient-to-b from-[#111C44] to-[#0B132B] border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="mx-auto w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-teal-400">
            <Gift className="w-5 h-5 animate-bounce" />
          </div>

          <h3 className="text-2xl md:text-4xl font-bold font-serif tracking-tight text-white leading-snug">
            체크인하는 순간 시작되는 우주적 휴식
          </h3>
          
          <p className="text-white/70 max-w-2xl mx-auto font-light text-sm leading-relaxed">
            별채 투숙객 모두에게 태백의 석탄 역사와 은하수를 모티브로 특별 제작한{' '}
            <span className="text-teal-300 font-semibold underline decoration-dashed decoration-1 underline-offset-4">웰컴 '까만 밤' 블랙 티 세트</span>와 
            태백의 은하수 7대 최적 스폿 투어 인증이 연동되는{' '}
            <span className="text-teal-300 font-semibold underline decoration-dashed decoration-1 underline-offset-4">별채 여정 패스포트</span>가 기본 제공됩니다. 
            태백을 여행할수록 채워지는 도장들과 한 조각의 티는 깊은 밤의 따스함을 선물할 것입니다.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-left max-w-xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                ☕
              </div>
              <div>
                <h5 className="text-sm font-semibold text-white">웰컴 '까만 밤' 티 세트</h5>
                <p className="text-xs text-white/50 mt-1 font-light">석탄 모티브의 시그니처 블렌딩 블랙티 & 검은 보석 초콜릿 다과.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                📖
              </div>
              <div>
                <h5 className="text-sm font-semibold text-white">별채 여정 패스포트</h5>
                <p className="text-xs text-white/50 mt-1 font-light">삼수동 바람의 언덕 등 은하수 7개 비밀 좌표와 감성 일러스트 가이드북.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <ReservationForm
        selectedZoneId={selectedZoneId}
        selectedStayId={selectedStayId}
        onAddReservation={handleAddReservation}
      />

      {/* Footer */}
      <Footer />

      {/* My Bookings Drawer Overlay */}
      <MyBookings
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
      />
    </div>
  );
}
