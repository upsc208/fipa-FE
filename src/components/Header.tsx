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
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!club) return null;

  const isChelsea = clubId === 'chelsea';
  const isLiverpool = clubId === 'liverpool';
  const isArsenal = clubId === 'arsenal';
  const isTottenham = clubId === 'tottenham';
  const isManCity = clubId === 'mancity';
  const isColoredHeader = isChelsea || isLiverpool || isArsenal || isTottenham || isManCity;

  // Dynamic Header Styles
  let headerBgClass = 'bg-white dark:bg-[#0d0e14] border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none';
  if (isChelsea) {
    headerBgClass = 'bg-[#034694] dark:bg-[#080e1a] border-b border-white/10 text-white shadow-md';
  } else if (isLiverpool) {
    headerBgClass = 'bg-[#c8102e] dark:bg-[#140809] border-b border-white/10 text-white shadow-md';
  } else if (isArsenal) {
    headerBgClass = 'bg-[#EF0107] dark:bg-[#0e0202] border-b border-white/10 text-white shadow-md';
  } else if (isTottenham) {
    headerBgClass = 'bg-[#132257] dark:bg-[#070b1a] border-b border-white/10 text-white shadow-md';
  } else if (isManCity) {
    headerBgClass = 'bg-[#6CABDD] dark:bg-[#081629] border-b border-white/10 text-white shadow-md';
  }

  const textPrimaryClass = isColoredHeader
    ? 'text-white'
    : 'text-gray-900 dark:text-white';

  const textSecondaryClass = isColoredHeader
    ? 'text-white/70'
    : 'text-gray-400';

  const navLinkClass = isColoredHeader
    ? 'group flex items-center gap-2 text-white/90 hover:text-white transition-all'
    : 'group flex items-center gap-2 text-gray-800 dark:text-gray-300 hover:opacity-70 transition-all';

  const navButtonClass = isColoredHeader
    ? 'group flex items-center gap-2 px-4 py-2 rounded-xl transition-all border border-white/20 hover:bg-white/10 text-white'
    : 'group flex items-center gap-2 px-4 py-2 rounded-xl transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-300';

  const switcherButtonClass = isColoredHeader
    ? 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-all relative z-[70]'
    : 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-all relative z-[70]';

  const logoNewsHighlightStyle = isColoredHeader
    ? { color: '#ffffff' }
    : { color: club.colors.primary };

  const getStripePattern = () => {
    if (clubId === 'chelsea') {
      return 'var(--chelsea-top-bar-bg)';
    }
    if (clubId === 'liverpool') {
      return `linear-gradient(135deg, #b21e29 0%, #c8102e 50%, #7a0c14 100%)`;
    }
    if (clubId === 'arsenal') {
      return 'var(--arsenal-top-bar-bg)';
    }
    if (clubId === 'tottenham') {
      return 'var(--tottenham-top-bar-bg)';
    }
    if (clubId === 'mancity') {
      return 'var(--mancity-top-bar-bg)';
    }
    return club.colors.primary;
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${headerBgClass}`}>
      {/* Backdrop for closing switcher */}
      {isSwitcherOpen && (
        <div 
          className="fixed inset-0 z-[60]" 
          onClick={() => setIsSwitcherOpen(false)}
        />
      )}

      {/* Man City Diagonal Sash Background */}
      {isManCity && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-15 z-0">
          <div 
            className="absolute w-[200%] h-[300%]" 
            style={{
              transform: 'rotate(-25deg) translate(-25%, -45%)',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 12%, rgba(255,255,255,0.7) 15%, transparent 16%, transparent 18%, rgba(255,255,255,0.7) 19%, rgba(255,255,255,0.7) 20%, transparent 21%, transparent 23%, rgba(255,255,255,0.7) 24%, rgba(255,255,255,0.7) 32%, transparent 33%)',
              backgroundSize: '100% 100%'
            }}
          />
        </div>
      )}

      {/* Decorative Top Stripe */}
      <div 
        className={`relative w-full overflow-hidden flex items-center justify-center transition-all duration-300 ease-in-out ${
          isAtTop ? 'h-10 opacity-100' : 'h-0 opacity-0 pointer-events-none'
        }`}
        style={{ background: getStripePattern() }}
      >
        {clubId === 'liverpool' && (
          <div className="w-full h-full flex items-center justify-center relative animate-in fade-in duration-1000">
             {/* Main YNWA Slogan in Cursive */}
             <span 
               className="text-white text-lg sm:text-xl lg:text-2xl select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] leading-none pt-1"
               style={{ fontFamily: 'var(--font-great-vibes)', wordSpacing: '0.25em' }}
             >
               You&apos;ll Never Walk Alone
             </span>
          </div>
        )}
        
        {clubId === 'chelsea' && (
          <div className="flex items-center gap-6 sm:gap-16 animate-in fade-in zoom-in duration-1000 relative w-full h-full justify-center">
            {/* Roaring Lion Left */}
            <div className="hidden md:block">
              <img src="/left_lion.png" alt="Left Lion" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-bebas text-2xl sm:text-4xl tracking-[0.4em] font-black italic uppercase" style={{ color: 'var(--chelsea-top-bar-text)' }}>
                KEEP THE BLUE FLAG FLYING HIGH
              </span>
            </div>

            {/* Roaring Lion Right */}
            <div className="hidden md:block">
              <img src="/right_lion.png" alt="Right Lion" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>

            {/* Chelsea Collar Trim (Red Stripe) */}
            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#EE242C] z-20" />
          </div>
        )}

        {clubId === 'manutd' && (
          <div className="w-full h-full flex items-center justify-center px-6 sm:px-12 relative animate-in fade-in slide-in-from-left-8 duration-1000">
             {/* Devil Pitchfork Icon Left */}
             <div className="absolute left-6 lg:left-12 hidden md:block opacity-40 text-white">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 drop-shadow-sm">
                  <path d="M12,2C11.5,2 11,2.21 10.59,2.59L9,4.18V7.12L12,10.12L15,7.12V4.18L13.41,2.59C13,2.21 12.5,2 12,2M12,22C12.5,22 13,21.79 13.41,21.41L15,19.82V16.88L12,13.88L9,16.88V19.82L10.59,21.41C11,21.79 11.5,22 12,22M2,12C2,12.5 2.21,13 2.59,13.41L4.18,15H7.12L10.12,12L7.12,9H4.18L2.59,10.59C2.21,11 2,11.5 2,12M22,12C22,11.5 21.79,11 21.41,10.59L19.82,9H16.88L13.88,12L16.88,15H19.82L21.41,13.41C21.79,13 22,12.5 22,12Z" />
               </svg>
             </div>
             
             {/* Main Slogan */}
             <span className="text-white font-bebas text-xl sm:text-2xl lg:text-3xl tracking-[0.4em] font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] italic uppercase">
               GLORY GLORY MAN UNITED
             </span>

             {/* Theatre of Dreams script right */}
             <div className="absolute right-6 lg:right-12 hidden md:flex items-center">
               <span 
                 className="text-white/95 text-xl lg:text-2xl tracking-wide select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                 style={{ fontFamily: 'var(--font-great-vibes)' }}
               >
                 Theatre of Dreams
               </span>
             </div>

             {/* Collar trim detail at the bottom of the stripe */}
             <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#0f1015]" />
             <div className="absolute bottom-[2px] left-0 right-0 h-[1px] bg-white/90" />
          </div>
        )}

        {clubId === 'arsenal' && (
          <div className="w-full h-full flex items-center justify-center px-6 sm:px-12 relative animate-in fade-in slide-in-from-left-8 duration-1000">
             {/* Adidas 3-Stripes Left */}
             <div className="absolute left-6 lg:left-12 top-0 bottom-0 flex gap-[9px] items-stretch">
               <div className="w-[9px] bg-[#EF0107]" style={{ transform: 'skewX(-45deg)', transformOrigin: 'top' }} />
               <div className="w-[9px] bg-[#EF0107]" style={{ transform: 'skewX(-45deg)', transformOrigin: 'top' }} />
               <div className="w-[9px] bg-[#EF0107]" style={{ transform: 'skewX(-45deg)', transformOrigin: 'top' }} />
             </div>
             
             {/* Main Slogan flanked by classic Cannons */}
             <div className="flex items-center gap-3 sm:gap-6 z-10">
               {/* Left Cannon */}
               <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 fill-current hover:rotate-12 transition-transform duration-300" style={{ color: '#DBA111' }}>
                 <path d="M15,46 h48 v8 h-48 z M63,42 h15 v16 h-15 z M78,47 h10 v6 h-10 z" />
                 <circle cx="50" cy="65" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
                 <circle cx="50" cy="65" r="5" fill="currentColor" />
                 <path d="M32,54 L44,66 M60,54 L52,66" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
               </svg>

               <span className="font-bebas text-2xl sm:text-3xl tracking-[0.4em] font-black italic uppercase" style={{ color: 'var(--arsenal-top-bar-text)' }}>
                 COYG
               </span>

               {/* Right Cannon (Flipped) */}
               <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 fill-current scale-x-[-1] hover:-rotate-12 transition-transform duration-300" style={{ color: '#DBA111' }}>
                 <path d="M15,46 h48 v8 h-48 z M63,42 h15 v16 h-15 z M78,47 h10 v6 h-10 z" />
                 <circle cx="50" cy="65" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
                 <circle cx="50" cy="65" r="5" fill="currentColor" />
                 <path d="M32,54 L44,66 M60,54 L52,66" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
               </svg>
             </div>

             {/* Adidas 3-Stripes Right */}
             <div className="absolute right-6 lg:right-12 top-0 bottom-0 flex gap-[9px] items-stretch">
               <div className="w-[9px] bg-[#EF0107]" style={{ transform: 'skewX(45deg)', transformOrigin: 'top' }} />
               <div className="w-[9px] bg-[#EF0107]" style={{ transform: 'skewX(45deg)', transformOrigin: 'top' }} />
               <div className="w-[9px] bg-[#EF0107]" style={{ transform: 'skewX(45deg)', transformOrigin: 'top' }} />
             </div>

             {/* Bottom solid gold piping stripe */}
             <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#DBA111] z-20" />
          </div>
        )}

        {clubId === 'tottenham' && (
          <div className="w-full h-full flex items-center justify-center px-6 sm:px-12 relative animate-in fade-in slide-in-from-left-8 duration-1000">
             {/* Left Sleeve Detail */}
             <div className="absolute left-0 top-0 bottom-0 flex gap-0 items-stretch overflow-hidden">
               <div className="w-16 md:w-32 bg-[#132257]" style={{ transform: 'skewX(-40deg)', transformOrigin: 'top left' }} />
               <div className="w-[4px] bg-[#B0B7C3]" style={{ transform: 'skewX(-40deg)', transformOrigin: 'top left' }} />
             </div>

             {/* Right Sleeve Detail */}
             <div className="absolute right-0 top-0 bottom-0 flex gap-0 items-stretch overflow-hidden">
               <div className="w-[4px] bg-[#B0B7C3]" style={{ transform: 'skewX(40deg)', transformOrigin: 'top right' }} />
               <div className="w-16 md:w-32 bg-[#132257]" style={{ transform: 'skewX(40deg)', transformOrigin: 'top right' }} />
             </div>

             {/* Slogan framed by Cockerel crest and Nike Swoosh */}
             <div className="flex items-center gap-3 sm:gap-6 z-10">
               {/* Nike Swoosh SVG (Navy) */}
               <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current hover:scale-110 transition-transform duration-300" style={{ color: '#132257' }}>
                 <path d="M21 6.5C18.6 6.5 14.5 8 10.8 10.5 7.1 13 4 16.5 2 19c-.3.4.2.8.6.5 1.8-1.5 4.5-3.5 7.8-5.1 3.5-1.7 7.2-2.4 9.6-2.4.6 0 .8-.5.3-2.5z" />
               </svg>

               {/* Red AIA Inspired Slogan */}
               <span className="font-bebas text-2xl sm:text-3xl tracking-[0.4em] font-black italic uppercase text-[#E4002B]">
                 COYS
               </span>

               {/* Cockerel Crest SVG (Navy) */}
               <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 fill-current hover:-rotate-12 transition-transform duration-300" style={{ color: '#132257' }}>
                 {/* Ball */}
                 <circle cx="50" cy="78" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
                 <path d="M39 78 h22 M50 63 v30 M39 67 l22 22 M39 89 l22-22" stroke="currentColor" strokeWidth="3" />
                 {/* Cockerel legs */}
                 <path d="M46 63 L46 54 M54 63 L54 54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                 {/* Cockerel Body & Tail */}
                 <path d="M44 48c0-8 6-12 12-10 2 0 4-2 3-5-2-6 8-8 12-2 1 2-2 4-4 4s-4 4-2 7c3 5-1 11-7 11-4 0-8-2-10-5-2 1-3 2-4 0z" />
                 {/* Head & Comb */}
                 <path d="M54 33c1-2 2-3 3-2s2 2 1 3-2 1-3 1-1-2-1-2z" />
               </svg>
             </div>

             {/* Grey collar-cuff line at the bottom */}
             <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B0B7C3]/50 z-20" />
          </div>
        )}

        {clubId === 'mancity' && (
          <div className="w-full h-full flex items-center justify-center px-6 sm:px-12 relative animate-in fade-in slide-in-from-left-8 duration-1000">
             {/* Left Sleeve White Cuff Accent */}
             <div className="absolute left-0 top-0 bottom-0 flex gap-0 items-stretch overflow-hidden">
               {/* Sky blue sleeve block */}
               <div className="w-16 md:w-32 bg-[#6CABDD]" style={{ transform: 'skewX(-30deg)', transformOrigin: 'top left' }} />
               {/* White cuff stripe */}
               <div className="w-[6px] bg-white border-r border-[#6CABDD]/10" style={{ transform: 'skewX(-30deg)', transformOrigin: 'top left' }} />
             </div>

             {/* Right Sleeve White Cuff Accent */}
             <div className="absolute right-0 top-0 bottom-0 flex gap-0 items-stretch overflow-hidden">
               {/* White cuff stripe */}
               <div className="w-[6px] bg-white border-l border-[#6CABDD]/10" style={{ transform: 'skewX(30deg)', transformOrigin: 'top right' }} />
               {/* Sky blue sleeve block */}
               <div className="w-16 md:w-32 bg-[#6CABDD]" style={{ transform: 'skewX(30deg)', transformOrigin: 'top right' }} />
             </div>

             {/* Slogan framed by Ship crest and Puma logo */}
             <div className="flex items-center gap-3 sm:gap-6 z-10">
               {/* Puma Leaping Cat SVG (Navy) */}
               <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current hover:scale-110 transition-transform duration-300" style={{ color: '#1C2C5B' }}>
                 <path d="M2 17.5c2.5-2 5.5-4 8.5-5 2.5-.8 5 .2 6.5 2 1.5 1.8 1 4-.5 5.5-1 1-2.5 1-3.5-.5-1-1.5-.5-3.5 1-4.5.8-.5 1.2-1.5.8-2.5s-1.5-1.5-2.5-1.2c-2 .5-4 2-5.5 3.8-1.2 1.5-2.8 3-4.8 2.4z M19 7c1 0 2 .5 2.5 1.5s0 2.5-1 3-2-.5-2.5-1.5.5-2.5 1-3z" />
               </svg>

               {/* Slogan text BLUE MOON */}
               <span className="font-bebas text-2xl sm:text-3xl tracking-[0.4em] font-black italic uppercase text-[#1C2C5B]">
                 BLUE MOON
               </span>

               {/* Ship Crest SVG (Navy) */}
               <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 fill-current hover:rotate-12 transition-transform duration-300" style={{ color: '#1C2C5B' }}>
                 <path d="M20 55 L35 70 L65 70 L80 55 Z" fill="currentColor" />
                 <path d="M30 50 L50 20 L50 50 Z M55 50 L75 25 L75 50 Z" fill="currentColor" />
                 <path d="M15 75 Q30 70 45 75 Q60 80 75 75 Q90 70 105 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
               </svg>
             </div>

             {/* Sky blue bottom stripe representing shirt body junction */}
             <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6CABDD] z-20" />
          </div>
        )}

      </div>
      
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:h-20 items-center justify-between px-2 sm:px-6 lg:px-12 py-4 md:py-0 mt-0 gap-y-4 md:gap-y-0 relative z-10">
        <div className="flex w-full items-center justify-between md:justify-start md:flex-1 gap-2 sm:gap-6 shrink-0">
          <Link href={`/${club.id}`} className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div 
              className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-white/10"
              style={{ backgroundColor: isColoredHeader ? '#ffffff' : club.colors.primary }}
            >
              <span className={`text-[10px] sm:text-sm font-black italic ${isColoredHeader ? (isChelsea ? 'text-[#034694]' : isLiverpool ? 'text-[#c8102e]' : isArsenal ? 'text-[#EF0107]' : isTottenham ? 'text-[#132257]' : 'text-[#6CABDD]') : 'text-white'}`}>{club.shortName.substring(0, 2)}</span>
              <div className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-black text-white shadow-sm">
                <Sparkles size={8} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-base sm:text-xl font-black tracking-tighter uppercase leading-none font-bebas ${textPrimaryClass}`}>
                {club.shortName} <span style={logoNewsHighlightStyle}>NEWS</span>
              </span>
              <span className={`text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-1 hidden sm:block ${textSecondaryClass}`}>
                {club.nameKo} 최신 소식
              </span>
            </div>
          </Link>
 
          {/* Club Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className={switcherButtonClass}
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
          <Link href={`/${club.id}`} className={navLinkClass}>
            <Newspaper className="w-5 h-5" />
            <span className="tracking-tight">뉴스</span>
          </Link>
          <Link href={`/${club.id}/about`} className={navLinkClass}>
            <Info className="w-5 h-5" />
            <span className="tracking-tight">소개</span>
          </Link>
          <div className={`hidden lg:block h-6 w-[1px] mx-2 ${isColoredHeader ? 'bg-white/20' : 'bg-gray-200 dark:bg-white/10'}`}></div>
          <a
            href={club.links.officialTickets}
            target="_blank"
            rel="noopener noreferrer"
            className={navButtonClass}
          >
            <Ticket className="w-5 h-5" />
            <span className="tracking-tighter font-extrabold">티켓</span>
          </a>
          <a
            href={club.links.officialStore}
            target="_blank"
            rel="noopener noreferrer"
            className={navButtonClass}
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
