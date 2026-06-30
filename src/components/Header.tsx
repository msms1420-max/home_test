import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Ticket } from 'lucide-react';
import { Reservation } from '../types';

interface HeaderProps {
  reservations: Reservation[];
  onOpenBookings: () => void;
}

export default function Header({ reservations, onOpenBookings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeReservationsCount = reservations.filter(r => r.status === 'confirmed').length;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B132B]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-lg'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
            <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-widest text-white font-serif">별채</span>
            <span className="text-[9px] font-mono tracking-widest uppercase opacity-50">BYEOLCHAE • 星寨</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-xs tracking-widest uppercase text-white/75 font-mono">
          <a
            href="#story"
            onClick={(e) => handleLinkClick(e, '#story')}
            className="hover:text-white transition-colors duration-200 relative py-1 group"
          >
            Story
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#zones"
            onClick={(e) => handleLinkClick(e, '#zones')}
            className="hover:text-white transition-colors duration-200 relative py-1 group"
          >
            Stay Cluster
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#programs"
            onClick={(e) => handleLinkClick(e, '#programs')}
            className="hover:text-white transition-colors duration-200 relative py-1 group"
          >
            Programs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {/* Reservation Hub */}
          <button
            onClick={onOpenBookings}
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all flex items-center justify-center text-white"
            title="My Tickets"
            id="btn-my-tickets"
          >
            <Ticket className="w-4 h-4" />
            {activeReservationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[9px] font-bold text-white">
                {activeReservationsCount}
              </span>
            )}
          </button>

          <a
            href="#reserve"
            onClick={(e) => handleLinkClick(e, '#reserve')}
            className="bg-white text-[#0B132B] font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full hover:bg-teal-400 hover:text-[#0B132B] transition-all duration-300 shadow-md hover:shadow-teal-400/20"
            id="btn-reserve-header"
          >
            Reserve
          </a>

          {/* Mobile Menu Btn */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="btn-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0B132B]/98 backdrop-blur-lg border-b border-white/10 py-8 px-6 space-y-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 animate-fadeIn">
          <a
            href="#story"
            onClick={(e) => handleLinkClick(e, '#story')}
            className="text-base text-white/80 hover:text-white font-serif tracking-widest"
          >
            별채 브랜드 스토리
          </a>
          <a
            href="#zones"
            onClick={(e) => handleLinkClick(e, '#zones')}
            className="text-base text-white/80 hover:text-white font-serif tracking-widest"
          >
            권역별 별채 소개
          </a>
          <a
            href="#programs"
            onClick={(e) => handleLinkClick(e, '#programs')}
            className="text-base text-white/80 hover:text-white font-serif tracking-widest"
          >
            체험 프로그램
          </a>
          <div className="w-full h-[1px] bg-white/10 my-2" />
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenBookings();
            }}
            className="w-full max-w-xs flex items-center justify-center gap-2 border border-white/20 text-white font-medium py-3 rounded-full hover:bg-white/5 transition-all text-sm"
          >
            <Ticket className="w-4 h-4 text-teal-400" />
            내 예약 내역 확인 ({activeReservationsCount})
          </button>
        </div>
      )}
    </header>
  );
}
