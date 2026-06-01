'use client';

import React, { useState } from 'react';
import { PawPrint, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import type { RecentMatch, UpcomingMatch } from '@/client/types.gen';
import { sortScorers } from './utils';
import { ScoreSection } from './ScoreSection';
import { ScorersSection } from './ScorersSection';
import { UpcomingSection } from './UpcomingSection';
import { StatsSection } from './StatsSection';
import { TacticalField } from './TacticalField';
import { MatchEvents } from './MatchEvents';
import { ClubConfig } from '@/config/clubs';

interface MatchResultCardProps {
  recentMatch?: RecentMatch | null;
  upcomingMatches?: UpcomingMatch[] | null;
  club: ClubConfig;
}

export default function MatchResultCard({ recentMatch, upcomingMatches, club }: MatchResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCardBackground = () => {
    if (club.id === 'manutd') {
      return {
        background: 'linear-gradient(135deg, #b91c1c 0%, #da291c 50%, #80120d 100%)'
      };
    }
    if (club.id === 'liverpool') {
      return {
        background: 'linear-gradient(135deg, #b21e29 0%, #c8102e 50%, #7a0c14 100%)'
      };
    }
    if (club.id === 'chelsea') {
      return {
        background: 'linear-gradient(135deg, #0551c9 0%, #03388c 100%)'
      };
    }
    if (club.id === 'arsenal') {
      return {
        background: 'linear-gradient(135deg, #EF0107 0%, #bd0004 100%)'
      };
    }
    if (club.id === 'tottenham') {
      return {
        background: 'linear-gradient(135deg, #1d2d5f 0%, #132257 50%, #0a1336 100%)'
      };
    }
    if (club.id === 'mancity') {
      return {
        background: 'linear-gradient(135deg, #89c3eb 0%, #6CABDD 50%, #4f96c9 100%)'
      };
    }
    return { 
      backgroundColor: club.colors.secondary === '#FFFFFF' ? club.colors.primary : club.colors.secondary,
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))'
    };
  };

  if (!recentMatch) {
    return (
      <div 
        className="text-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-none font-sans tracking-wide flex flex-col items-center justify-center min-h-[250px] border border-white/10 relative overflow-hidden"
        style={getCardBackground()}
      >
        {/* Jersey Mesh Overlay for Man Utd */}
        {club.id === 'manutd' && (
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />
        )}

        {/* Signature Diagonal White Sash for Man City */}
        {club.id === 'mancity' && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
            <div 
              className="absolute w-[200%] h-[300%]" 
              style={{
                transform: 'rotate(-25deg) translate(-10%, -20%)',
                background: 'linear-gradient(90deg, transparent 0%, #ffffff 12%, #ffffff 15%, transparent 16%, transparent 18%, #ffffff 19%, #ffffff 20%, transparent 21%, transparent 23%, #ffffff 24%, #ffffff 32%, transparent 33%)',
                backgroundSize: '100% 100%'
              }}
            />
          </div>
        )}

        {/* Collar trim detail at the top of the card */}
        {club.id === 'manutd' && (
          <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#0f1015] z-20 flex flex-col">
            <div className="h-[2px] w-full bg-white/80" style={{ marginTop: '2px' }} />
          </div>
        )}
        {club.id === 'liverpool' && (
          <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col">
            <div className="h-[2px] w-full bg-[#c8102e]" style={{ marginTop: '2px' }} />
          </div>
        )}
        {club.id === 'chelsea' && (
          <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col">
            <div className="h-[2px] w-full bg-[#EE242C]" style={{ marginTop: '2px' }} />
          </div>
        )}
        {club.id === 'arsenal' && (
          <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col justify-between py-[1px]">
            <div className="h-[1px] w-full bg-[#EF0107]" />
            <div className="h-[1px] w-full bg-[#EF0107]" />
            <div className="h-[1px] w-full bg-[#EF0107]" />
          </div>
        )}
        {club.id === 'tottenham' && (
          <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col justify-between py-[1px]">
            <div className="h-[1px] w-full bg-[#132257]" />
            <div className="h-[2px] w-full bg-[#B0B7C3]" />
            <div className="h-[1px] w-full bg-[#132257]" />
          </div>
        )}
        {club.id === 'mancity' && (
          <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20" />
        )}
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="scale-[2.5] mb-2 opacity-50 animate-bounce">
            {(club.id === 'manutd' || club.id === 'liverpool' || club.id === 'arsenal' || club.id === 'tottenham' || club.id === 'mancity') ? <Shield /> : <PawPrint />}
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tighter opacity-90 animate-pulse uppercase font-bebas">
            {club.shortName} MATCH DATA LOADING...
          </h3>
          <p className="text-xs md:text-sm font-medium opacity-60 uppercase tracking-widest">
            Data loading or currently unavailable
          </p>
        </div>
      </div>
    );
  }

  const sortedScorers = sortScorers(recentMatch.scorers);
  const homeScorers = sortedScorers.filter(s => s.isHome);
  const awayScorers = sortedScorers.filter(s => !s.isHome);

  return (
    <div 
      className="text-white rounded-xl shadow-lg w-full max-w-none font-sans tracking-wide flex flex-col overflow-hidden border border-white/10 transition-all duration-500 relative"
      style={getCardBackground()}
    >

      {/* Jersey Mesh Overlay for Man Utd */}
      {club.id === 'manutd' && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />
      )}

      {/* Signature Diagonal White Sash for Man City */}
      {club.id === 'mancity' && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
          <div 
            className="absolute w-[200%] h-[300%]" 
            style={{
              transform: 'rotate(-25deg) translate(-10%, -20%)',
              background: 'linear-gradient(90deg, transparent 0%, #ffffff 12%, #ffffff 15%, transparent 16%, transparent 18%, #ffffff 19%, #ffffff 20%, transparent 21%, transparent 23%, #ffffff 24%, #ffffff 32%, transparent 33%)',
              backgroundSize: '100% 100%'
            }}
          />
        </div>
      )}
      {/* Collar trim detail at the top of the card (Man Utd) */}
      {club.id === 'manutd' && (
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#0f1015] z-20 flex flex-col">
          <div className="h-[2px] w-full bg-white/80" style={{ marginTop: '2px' }} />
        </div>
      )}

      {/* Ribbed White Collar Trim for Liverpool */}
      {club.id === 'liverpool' && (
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col">
          <div className="h-[2px] w-full bg-[#c8102e]" style={{ marginTop: '2px' }} />
        </div>
      )}

      {/* Ribbed Collar Trim for Chelsea (White - Red - White) */}
      {club.id === 'chelsea' && (
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col">
          <div className="h-[2px] w-full bg-[#EE242C]" style={{ marginTop: '2px' }} />
        </div>
      )}

      {/* Three Stripes Collar Trim for Arsenal */}
      {club.id === 'arsenal' && (
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col justify-between py-[1px]">
          <div className="h-[1px] w-full bg-[#EF0107]" />
          <div className="h-[1px] w-full bg-[#EF0107]" />
          <div className="h-[1px] w-full bg-[#EF0107]" />
        </div>
      )}

      {/* Ribbed Collar Trim for Tottenham (White - Navy - Grey - Navy) */}
      {club.id === 'tottenham' && (
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20 flex flex-col justify-between py-[1px]">
          <div className="h-[1px] w-full bg-[#132257]" />
          <div className="h-[2px] w-full bg-[#B0B7C3]" />
          <div className="h-[1px] w-full bg-[#132257]" />
        </div>
      )}

      {/* Ribbed Collar Trim for Man City (Solid White) */}
      {club.id === 'mancity' && (
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFFFFF] z-20" />
      )}



      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 min-h-[250px] relative z-10">
        {/* Left side: Match Result (70%) */}
        <div className="w-full md:w-[70%] flex flex-col pr-0 md:pr-8 md:border-r border-white/20">
          <ScoreSection 
            homeTeam={recentMatch.homeTeam}
            awayTeam={recentMatch.awayTeam}
            homeScore={recentMatch.homeScore}
            awayScore={recentMatch.awayScore}
            matchDate={recentMatch.matchDate}
            tournament={recentMatch.tournament}
            isHome={recentMatch.isHome}
          />

          <ScorersSection 
            homeScorers={homeScorers}
            awayScorers={awayScorers}
          />

          <div className="order-4 md:order-3 border-t border-white/20 mb-8 mx-2"></div>
        </div>

        {/* Right side: Upcoming Matches (30%) */}
        <UpcomingSection upcomingMatches={upcomingMatches} />
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-3 bg-black/20 hover:bg-black/40 border-t border-white/10 flex items-center justify-center gap-2 transition-all duration-300 group relative z-10"
      >
        <span className="text-xs font-bold tracking-widest uppercase opacity-60 group-hover:opacity-100">
          {isExpanded ? '경기 상세 정보 닫기' : '경기 상세 정보 보기'}
        </span>
        {isExpanded ? (
          <ChevronUp size={16} className="opacity-60 group-hover:opacity-100" />
        ) : (
          <ChevronDown size={16} className="opacity-60 group-hover:opacity-100" />
        )}
      </button>

      {/* Accordion Content */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 md:p-8 bg-black/20 flex flex-col gap-12 border-t border-white/5">
          <StatsSection stats={recentMatch.stats} isExpanded={isExpanded} />

          {recentMatch.lineup && (
            <div className="flex flex-col gap-8 -mx-6 md:mx-0">
              <h4 className="text-sm md:text-base font-black tracking-widest uppercase text-white text-center px-6">선발 명단 및 전술</h4>
              <div className="w-full overflow-hidden">
                <TacticalField 
                  lineup={recentMatch.lineup}
                  homeTeam={recentMatch.homeTeam}
                  awayTeam={recentMatch.awayTeam}
                />
              </div>
            </div>
          )}

          <MatchEvents 
            substitutions={recentMatch.substitutions}
            cards={recentMatch.cards}
          />
        </div>
      </div>
    </div>
  );
}

