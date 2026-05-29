import Header from "@/components/Header";
import { CLUBS } from "@/config/clubs";
import { notFound } from "next/navigation";

export default async function ClubLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ club: string }>;
}) {
  const { club: clubId } = await params;
  const club = CLUBS[clubId];

  if (!club) {
    notFound();
  }

  const isRedTeam = club.id === 'manutd' || club.id === 'liverpool';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${
      club.id === 'chelsea' ? `pattern-${club.design.patternType}` : 'bg-gray-50'
    }`} style={{ 
      backgroundColor: club.id === 'chelsea' ? club.colors.primary : '#f9fafb'
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${club.colors.primary};
          --secondary: ${club.colors.secondary};
          --accent: ${club.colors.accent};
          --volt: ${club.colors.darkAccent};
          --background: ${club.id === 'chelsea' ? club.colors.primary : '#f9fafb'};
        }
        .dark {
          --background: #0a0b10;
        }
      `}} />

      <Header />
      
      <main className="flex-grow relative z-10">
        {children}
      </main>

      <footer 
        className="text-white py-12 relative z-10"
        style={{ 
          backgroundColor: club.id === 'chelsea' ? 'rgba(0,0,0,0.3)' : '#1a1a1a',
          backdropFilter: club.id === 'chelsea' ? 'blur(12px)' : 'none'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-white mb-1">{club.nameKo} 뉴스</p>
              <p className="text-xs text-white/60">&copy; {new Date().getFullYear()} {club.shortName} NEWS. All rights reserved.</p>
            </div>
            <p className="text-[11px] italic text-white/30">
              &quot;본 사이트는 {club.nameKo} 비공식 팬 페이지입니다.&quot;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );


}
