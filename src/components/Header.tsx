'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Newspaper, Info, Sparkles, Ticket, ShoppingBag, ChevronDown } from 'lucide-react';
import { CLUBS } from '@/config/clubs';

export default function Header() {
  const params = useParams();
  const pathname = usePathname();
  const clubId = params.club as string;
  const club = CLUBS[clubId];

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  if (!club) return null;

  const getStripePattern = () => {
    if (clubId === 'chelsea') {
      return `linear-gradient(135deg, #001a3d 0%, ${club.colors.primary} 50%, #001a3d 100%)`;
    }
    return club.colors.primary;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0d0e14] border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
      {/* Backdrop for closing switcher */}
      {isSwitcherOpen && (
        <div 
          className="fixed inset-0 z-[60]" 
          onClick={() => setIsSwitcherOpen(false)}
        />
      )}

      {/* Decorative Top Stripe */}
      <div 
        className="relative w-full h-10 overflow-hidden flex items-center justify-center"
        style={{ background: getStripePattern() }}
      >
        {clubId === 'liverpool' && (
          <div className="flex items-center gap-4 sm:gap-12 animate-in fade-in duration-1000">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/40 hidden sm:block">
              <path d="M12 2L9 4V7L12 9L15 7V4L12 2Z" />
            </svg>
            <span 
              className="text-white text-xl sm:text-2xl tracking-widest drop-shadow-lg select-none whitespace-nowrap"
              style={{ fontFamily: 'var(--font-great-vibes)' }}
            >
              When you walk through a storm, hold your head up high... and You&apos;ll Never Walk Alone.
            </span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/40 hidden sm:block scale-x-[-1]">
              <path d="M12 2L9 4V7L12 9L15 7V4L12 2Z" />
            </svg>
          </div>
        )}
        
        {clubId === 'chelsea' && (
          <div className="flex items-center gap-6 sm:gap-16 animate-in fade-in zoom-in duration-1000 relative w-full h-full justify-center">
            {/* Roaring Lion Left */}
            <div className="hidden md:block opacity-60">
              <svg viewBox="0 0 100 100" className="w-10 h-10 text-white fill-current">
                <path d="M90,35c-5-10-15-18-30-22c-5-2-12-3-18-1c-2-5-8-10-15-10C15,2,5,15,5,32c0,4,1,8,3,12C3,48,0,55,0,62c0,11,8,21,18,24 c0,11,8,20,18,20c12,0,18-9,18-20c11-3,18-13,18-24c0-4-1-8-3-12c6-4,11-12,11-20C82,31,81,27,79,23L90,35z M32,85 c-6,0-11-5-11-11c0-6,5-11,11-11s11,5,11,11C43,80,38,85,32,85z M55,60c-5,0-10-5-10-10c0-5,5-10,10-10s10,5,10,10 C65,55,60,60,55,60z" />
              </svg>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-white font-bebas text-2xl sm:text-4xl tracking-[0.4em] font-black drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] italic uppercase">
                KEEP THE BLUE FLAG FLYING HIGH
              </span>
            </div>

            {/* Roaring Lion Right (Flipped) */}
            <div className="hidden md:block opacity-60 scale-x-[-1]">
              <svg viewBox="0 0 100 100" className="w-10 h-10 text-white fill-current">
                <path d="M90,35c-5-10-15-18-30-22c-5-2-12-3-18-1c-2-5-8-10-15-10C15,2,5,15,5,32c0,4,1,8,3,12C3,48,0,55,0,62c0,11,8,21,18,24 c0,11,8,20,18,20c12,0,18-9,18-20c11-3,18-13,18-24c0-4-1-8-3-12c6-4,11-12,11-20C82,31,81,27,79,23L90,35z M32,85 c-6,0-11-5-11-11c0-6,5-11,11-11s11,5,11,11C43,80,38,85,32,85z M55,60c-5,0-10-5-10-10c0-5,5-10,10-10s10,5,10,10 C65,55,60,60,55,60z" />
              </svg>
            </div>
          </div>
        )}

        {clubId === 'manutd' && (
          <div className="flex items-center gap-6 sm:gap-12 animate-in fade-in slide-in-from-left-8 duration-1000">
             {/* Red Devil Left */}
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white/40 hidden sm:block drop-shadow-sm">
                <path d="M12,2C11.5,2 11,2.21 10.59,2.59L9,4.18V7.12L12,10.12L15,7.12V4.18L13.41,2.59C13,2.21 12.5,2 12,2M12,22C12.5,22 13,21.79 13.41,21.41L15,19.82V16.88L12,13.88L9,16.88V19.82L10.59,21.41C11,21.79 11.5,22 12,22M2,12C2,12.5 2.21,13 2.59,13.41L4.18,15H7.12L10.12,12L7.12,9H4.18L2.59,10.59C2.21,11 2,11.5 2,12M22,12C22,11.5 21.79,11 21.41,10.59L19.82,9H16.88L13.88,12L16.88,15H19.82L21.41,13.41C21.79,13 22,12.5 22,12Z" />
             </svg>
             <span className="text-white font-bebas text-2xl sm:text-4xl tracking-[0.4em] font-black drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] italic">
               GLORY GLORY MAN UNITED
             </span>
             {/* Red Devil Right */}
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white/40 hidden sm:block scale-x-[-1] drop-shadow-sm">
                <path d="M12,2C11.5,2 11,2.21 10.59,2.59L9,4.18V7.12L12,10.12L15,7.12V4.18L13.41,2.59C13,2.21 12.5,2 12,2M12,22C12.5,22 13,21.79 13.41,21.41L15,19.82V16.88L12,13.88L9,16.88V19.82L10.59,21.41C11,21.79 11.5,22 12,22M2,12C2,12.5 2.21,13 2.59,13.41L4.18,15H7.12L10.12,12L7.12,9H4.18L2.59,10.59C2.21,11 2,11.5 2,12M22,12C22,11.5 21.79,11 21.41,10.59L19.82,9H16.88L13.88,12L16.88,15H19.82L21.41,13.41C21.79,13 22,12.5 22,12Z" />
             </svg>
          </div>
        )}

      </div>
      
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:h-20 items-center justify-between px-2 sm:px-6 lg:px-12 py-4 md:py-0 mt-0 gap-y-4 md:gap-y-0">
        <div className="flex w-full items-center justify-between md:justify-start md:flex-1 gap-2 sm:gap-6 shrink-0">
          <Link href={`/${club.id}`} className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div 
              className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl shadow-lg group-hover:scale-105 transition-transform shrink-0"
              style={{ backgroundColor: club.colors.primary }}
            >
              <span className="text-[10px] sm:text-sm font-black text-white italic">{club.shortName.substring(0, 2)}</span>
              <div className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-black text-white shadow-sm">
                <Sparkles size={8} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none font-bebas">
                {club.shortName} <span style={{ color: club.colors.primary }}>NEWS</span>
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase leading-none mt-1 hidden sm:block">
                {club.nameKo} 최신 소식
              </span>
            </div>
          </Link>

          {/* Club Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-all relative z-[70]"
            >
              팀 변경
              <ChevronDown size={14} className={`transition-transform duration-300 ${isSwitcherOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSwitcherOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#111318] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl z-[70] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {Object.values(CLUBS).map((c) => (
                  <Link
                    key={c.id}
                    href={`/${c.id}${pathname.replace(`/${clubId}`, '')}`}
                    onClick={() => setIsSwitcherOpen(false)}
                    className={`flex items-center justify-between px-4 py-4 text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${c.id === clubId ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    {c.nameKo}
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.colors.primary }} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav className="flex items-center justify-center gap-x-4 sm:gap-x-8 md:flex-1 md:justify-center text-sm font-extrabold w-full md:w-auto mt-4 md:mt-0 whitespace-nowrap">
          <Link href={`/${club.id}`} className="group flex items-center gap-2 text-gray-800 dark:text-gray-300 transition-all hover:opacity-70">
            <Newspaper className="w-5 h-5" />
            <span className="tracking-tight">뉴스</span>
          </Link>
          <Link href={`/${club.id}/about`} className="group flex items-center gap-2 text-gray-800 dark:text-gray-300 transition-all hover:opacity-70">
            <Info className="w-5 h-5" />
            <span className="tracking-tight">소개</span>
          </Link>
          <div className="hidden lg:block h-6 w-[1px] bg-gray-200 dark:bg-white/10 mx-2"></div>
          <a
            href={club.links.officialTickets}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <Ticket className="w-5 h-5" />
            <span className="tracking-tighter font-extrabold">티켓</span>
          </a>
          <a
            href={club.links.officialStore}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="tracking-tighter font-extrabold">스토어</span>
          </a>
        </nav>

        <div className="hidden md:flex md:flex-1 justify-end">
          {/* Right side spacer or user profile etc. */}
        </div>
      </div>
    </header>
  );
}
