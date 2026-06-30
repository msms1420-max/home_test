import { X, Trash2, Calendar, MapPin, Sparkles, User, ShieldAlert } from 'lucide-react';
import { Reservation, StayItem } from '../types';
import { STAYS_DATA, ZONES_DATA } from '../data';

interface MyBookingsProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
}

export default function MyBookings({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
}: MyBookingsProps) {
  if (!isOpen) return null;

  const getStayDetail = (stayId: string): StayItem | undefined => {
    return STAYS_DATA.find((s) => s.id === stayId);
  };

  const getZoneName = (zoneId: string) => {
    return ZONES_DATA.find((z) => z.id === zoneId)?.name || '태백';
  };

  return (
    <div className="fixed inset-0 bg-[#0B132B]/80 backdrop-blur-md z-50 flex justify-end animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#0A1128] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between overflow-hidden text-white z-10 animate-slideLeft">
        
        {/* Subtle stellar dust glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between relative bg-[#0B132B]/80 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-teal-300 font-bold block">
              MY TRAVEL LEDGER
            </span>
            <h3 className="text-xl font-bold font-serif text-white mt-1">
              나의 은하수 여정록
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/75 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
            id="btn-close-bookings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 relative">
          {reservations.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-white/40" />
              </div>
              <h4 className="font-bold text-base text-white/90">아직 예약된 은하수가 없습니다.</h4>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs font-light">
                태백의 수려한 경관과 함께하는 로컬 분산형 별채를 둘러보고, 첫 번째 별빛 여정을 예약해 보세요.
              </p>
              <button
                onClick={() => {
                  onClose();
                  const element = document.getElementById('zones');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-2 text-xs text-teal-400 font-medium hover:underline flex items-center gap-1.5"
                id="btn-go-explorer"
              >
                숙소 찾아보기 ➔
              </button>
            </div>
          ) : (
            /* Active Tickets List */
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-white/40 uppercase block tracking-wider">
                ACTIVE VOUCHERS & PASSES ({reservations.length})
              </span>

              {reservations.map((res) => {
                const stay = getStayDetail(res.stayId);
                if (!stay) return null;

                const isCancelled = res.status === 'cancelled';

                return (
                  <div
                    key={res.id}
                    className={`border rounded-2xl overflow-hidden bg-[#111C44]/55 relative group transition-all duration-300 ${
                      isCancelled
                        ? 'border-white/5 opacity-50'
                        : 'border-white/10 hover:border-teal-400/30'
                    }`}
                  >
                    {/* Ticket top stub */}
                    <div className="p-5 border-b border-dashed border-white/10 relative">
                      {/* Ticket notches */}
                      <div className="absolute -left-3 bottom-0 w-6 h-6 bg-[#0A1128] rounded-full border border-white/10" />
                      <div className="absolute -right-3 bottom-0 w-6 h-6 bg-[#0A1128] rounded-full border border-white/10" />

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-teal-400">
                          {res.id}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border font-bold ${
                            isCancelled
                              ? 'bg-red-400/10 text-red-400 border-red-400/20'
                              : 'bg-teal-400/10 text-teal-300 border-teal-400/20'
                          }`}
                        >
                          {isCancelled ? 'Cancelled' : 'Confirmed'}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold font-serif text-white mt-3">
                        {stay.name}
                      </h4>
                      <p className="text-[10px] font-mono text-white/50 tracking-wider">
                        {getZoneName(res.zoneId)} • {stay.capacity}
                      </p>
                    </div>

                    {/* Ticket body stub */}
                    <div className="p-5 space-y-4 bg-[#0B132B]/50">
                      <div className="grid grid-cols-2 gap-4 text-xs font-light">
                        <div>
                          <span className="text-[9px] font-mono text-white/40 uppercase block">GUEST NAME</span>
                          <span className="font-medium text-white/90">{res.guestName}님</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-white/40 uppercase block">CHECK-IN DATE</span>
                          <span className="font-semibold text-teal-300 font-mono">{res.checkInDate}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-white/60">
                        <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-[10px] font-light leading-relaxed truncate">
                          {stay.location}
                        </span>
                      </div>

                      {/* Perks */}
                      {!isCancelled && (
                        <div className="pt-3 border-t border-white/5 space-y-1 bg-white/5 p-3 rounded-lg">
                          <span className="text-[9px] font-mono text-teal-300 uppercase block font-semibold">
                            🎁 특별 혜택 및 체크인 준비물
                          </span>
                          <p className="text-[10px] text-white/80 font-light leading-relaxed">
                            석탄 초콜릿을 가미한 웰컴 <strong>'까만 밤' 티 세트</strong>와 오프라인 <strong>별채 패스포트</strong> 실물 소책자가 입실 당일 기프트박스로 방 내부에 비치됩니다.
                          </p>
                        </div>
                      )}

                      {/* Cancel action */}
                      {!isCancelled && (
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              if (window.confirm('정말 이 여정을 취소하시겠습니까? 취소된 일정은 복구되지 않습니다.')) {
                                onCancelReservation(res.id);
                              }
                            }}
                            className="text-red-400 hover:text-red-300 text-[10px] font-mono tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-400/20 hover:bg-red-400/5 transition-all"
                            id={`btn-cancel-res-${res.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            여정 취소하기 (Cancel)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0B132B]/90 relative">
          <p className="text-[10px] text-white/40 leading-relaxed text-center font-light">
            * 은하수 예약은 현지 사정 및 날씨 경보에 의해 취소되거나 관측 포인트 조율이 발생할 수 있습니다. 24시간 상담원: 1588-XXXX.
          </p>
        </div>
      </div>
    </div>
  );
}
