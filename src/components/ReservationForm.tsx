import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, CheckCircle, Sparkles, MapPin, Tag } from 'lucide-react';
import { STAYS_DATA, ZONES_DATA } from '../data';
import { ZoneId, StayItem, Reservation } from '../types';

interface ReservationFormProps {
  selectedZoneId: ZoneId;
  selectedStayId: string;
  onAddReservation: (reservation: Reservation) => void;
}

export default function ReservationForm({
  selectedZoneId,
  selectedStayId,
  onAddReservation,
}: ReservationFormProps) {
  // Local state
  const [stayId, setStayId] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [showVoucher, setShowVoucher] = useState<boolean>(false);
  const [latestReservation, setLatestReservation] = useState<Reservation | null>(null);

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync with prop changes
  useEffect(() => {
    if (selectedStayId) {
      setStayId(selectedStayId);
    } else {
      // Default to first stay
      setStayId(STAYS_DATA[0].id);
    }
  }, [selectedStayId]);

  const activeStay = STAYS_DATA.find((s) => s.id === stayId) || STAYS_DATA[0];
  const activeZone = ZONES_DATA.find((z) => z.id === activeStay.zoneId)!;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!guestName.trim()) {
      newErrors.guestName = '예약자 성함을 입력해 주세요.';
    }
    if (!phone.trim()) {
      newErrors.phone = '연락처를 입력해 주세요.';
    } else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(phone) && !/^\d{9,11}$/.test(phone)) {
      newErrors.phone = '올바른 연락처 형식(예: 010-0000-0000)으로 입력해 주세요.';
    }
    if (!checkInDate) {
      newErrors.checkInDate = '희망 체크인 날짜를 선택해 주세요.';
    } else {
      const selectedDate = new Date(checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.checkInDate = '체크인 날짜는 오늘 이후로 지정할 수 있습니다.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Create a new reservation
    const newRes: Reservation = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      zoneId: activeStay.zoneId,
      stayId: activeStay.id,
      guestName: guestName.trim(),
      phone: phone.trim(),
      checkInDate,
      guestsCount,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onAddReservation(newRes);
    setLatestReservation(newRes);
    setShowVoucher(true);

    // Reset fields except stay selection
    setGuestName('');
    setPhone('');
    setCheckInDate('');
    setGuestsCount(2);
    setErrors({});
  };

  return (
    <section id="reserve" className="py-24 bg-white text-[#0B132B] relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-[#0B132B]/50 uppercase font-mono block">
            Reservation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-tight text-[#0B132B]">
            별빛 아래 머무는 밤
          </h2>
          <div className="w-12 h-1 bg-[#0B132B] mx-auto rounded-full mt-4" />
          <p className="text-slate-500 text-sm max-w-md mx-auto font-light leading-relaxed">
            당신의 고독과 쉼이 머무르는 순간, 태백의 고즈넉한 밤을 채우는 아름다운 은하수의 조각이 됩니다.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/60 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Stay selection */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 font-mono">
                  숙소 선택
                </label>
                <div className="relative">
                  <select
                    value={stayId}
                    onChange={(e) => setStayId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B132B] focus:border-[#0B132B] appearance-none cursor-pointer"
                    id="select-stay"
                  >
                    {STAYS_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        [{ZONES_DATA.find((z) => z.id === s.zoneId)?.name}] {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Grid 2x2 for Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guest Name */}
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 font-mono">
                    예약자 성함
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="성함을 입력해주세요"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B132B] ${
                        errors.guestName ? 'border-red-400 focus:ring-red-400' : 'border-slate-300'
                      }`}
                      id="input-guest-name"
                    />
                  </div>
                  {errors.guestName && (
                    <span className="text-[10px] text-red-500 mt-1 block">{errors.guestName}</span>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 font-mono">
                    연락처
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B132B] ${
                        errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-300'
                      }`}
                      id="input-phone"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Grid CheckIn Date & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Check In Date */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 font-mono">
                    희망 체크인 날짜
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B132B] ${
                        errors.checkInDate ? 'border-red-400 focus:ring-red-400' : 'border-slate-300'
                      }`}
                      id="input-check-in-date"
                    />
                  </div>
                  {errors.checkInDate && (
                    <span className="text-[10px] text-red-500 mt-1 block">{errors.checkInDate}</span>
                  )}
                </div>

                {/* Guests Count */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 font-mono">
                    인원 수 (인성 포함)
                  </label>
                  <div className="relative">
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B132B]"
                      id="select-guests"
                    >
                      <option value={1}>1명 (솔로 여행자)</option>
                      <option value={2}>2명 (기본 인원)</option>
                      <option value={3}>3명 (패밀리/프렌즈)</option>
                      <option value={4}>4명 (최대 정원)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reservation Button */}
              <button
                type="submit"
                className="w-full bg-[#0B132B] text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-teal-500 hover:text-[#0B132B] transition-all duration-300 shadow-md hover:shadow-teal-400/20 cursor-pointer mt-2"
                id="btn-submit-booking"
              >
                예약 요청 접수하기 ➔
              </button>
            </form>
          </div>

          {/* Stay Info preview & price summary */}
          <div className="lg:col-span-5 border border-slate-200/80 p-6 md:p-8 rounded-3xl bg-slate-50/40 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Preview header */}
              <div className="flex items-center gap-3">
                <img
                  src={activeStay.image}
                  alt={activeStay.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block font-semibold">
                    {activeZone.name}
                  </span>
                  <h4 className="font-bold text-base text-[#0B132B] font-serif">
                    {activeStay.name}
                  </h4>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                {activeStay.desc}
              </p>

              {/* Location Badge */}
              <div className="flex items-start gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#0B132B]/60 shrink-0 mt-0.5" />
                <span className="text-[10px] leading-relaxed font-light">{activeStay.location}</span>
              </div>

              {/* Small Divider */}
              <div className="h-[1px] bg-slate-200/80" />

              {/* Cost Calculations */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>객실 요금 (1박 기준)</span>
                  <span className="font-mono">₩{activeStay.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>청소 대행 및 서비스 료</span>
                  <span className="font-mono">₩25,000</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>지역 환원 상생 세금 (5%)</span>
                  <span className="font-mono">₩{Math.round(activeStay.price * 0.05).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="mt-8 pt-4 border-t border-dashed border-slate-300">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    TOTAL ESTIMATED COST
                  </span>
                  <span className="text-xl md:text-2xl font-black text-[#0B132B] font-serif mt-1 block">
                    ₩{(activeStay.price + 25000 + Math.round(activeStay.price * 0.05)).toLocaleString()}
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-[10px] font-medium flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>웰컴 티세트 포함</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voucher Confirmation Dialog Overlay (Active upon successful booking submission) */}
      {showVoucher && latestReservation && (
        <div className="fixed inset-0 bg-[#0B132B]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-gradient-to-b from-[#111C44] to-[#0B132B] border border-white/10 rounded-3xl w-full max-w-lg p-8 relative shadow-2xl text-white">
            
            {/* Elegant Background Starlight effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

            <div className="relative text-center space-y-6">
              {/* Success Badge */}
              <div className="mx-auto w-12 h-12 rounded-full bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-teal-400 animate-pulse" />
              </div>

              {/* Title */}
              <div>
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-teal-300 font-bold">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="text-2xl font-bold font-serif text-white mt-1.5">
                  별채 은하수 탑승권
                </h3>
              </div>

              {/* Ticket details card */}
              <div className="bg-[#0B132B]/90 border border-white/10 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[9px] font-mono text-white/50 uppercase block">RESERVATION ID</span>
                    <span className="text-sm font-bold font-mono text-teal-300">{latestReservation.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-white/50 uppercase block">ISSUE DATE</span>
                    <span className="text-sm font-light text-white/80">{new Date(latestReservation.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-white/50 uppercase block">STAY / LODGE</span>
                    <span className="text-sm font-semibold font-serif text-white">{activeStay.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/50 uppercase block">CLUSTER CLUSTER</span>
                    <span className="text-sm font-semibold font-serif text-white">{activeZone.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/50 uppercase block">GUEST NAME</span>
                    <span className="text-sm font-light text-white/90">{latestReservation.guestName}님</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/50 uppercase block">CHECK-IN</span>
                    <span className="text-sm font-semibold text-teal-300 font-mono">{latestReservation.checkInDate}</span>
                  </div>
                </div>

                {/* Perks list */}
                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  <span className="text-[9px] font-mono text-white/40 uppercase block">GUEST BENEFIT PACKS</span>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>시그니처 웰컴 '까만 밤' 블랙 티 세트 패키지</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>태백 은하수 7대 관측소 별채 패스포트 수령권</span>
                  </div>
                </div>
              </div>

              {/* Bottom Instructions */}
              <p className="text-[10px] text-white/50 leading-relaxed max-w-sm mx-auto font-light">
                * 본 탑승권은 모바일 및 당일 안내데스크에서 즉시 확인 가능합니다. 기재하신 연락처로 오시는 길 및 입실 매뉴얼이 알림톡으로 전송되었습니다.
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowVoucher(false)}
                className="w-full bg-white text-[#0B132B] font-bold py-3.5 rounded-xl hover:bg-teal-400 hover:text-[#0B132B] transition-all text-xs tracking-widest uppercase cursor-pointer shadow-lg"
                id="btn-close-voucher"
              >
                닫기 & 여정 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
