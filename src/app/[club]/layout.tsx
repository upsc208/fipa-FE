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

  const isChelsea = club.id === 'chelsea';
  const isLiverpool = club.id === 'liverpool';

  const lightBg = isChelsea 
    ? '#f0f4fa' // Soft, elegant Chelsea blue home kit vibe
    : isLiverpool 
      ? '#faf0f1' // Soft, elegant Liverpool red home kit vibe
      : '#f9fafb';

  const darkBg = isChelsea
    ? '#080e1a' // Deep dark navy blue for Chelsea dark mode
    : isLiverpool 
      ? '#140809' // Deep dark wine red for Liverpool dark mode
      : '#0a0b10';

  const isManUtd = club.id === 'manutd';

  // Dynamic footer colors
  const footerBg = isManUtd ? '#ffffff' : isLiverpool ? '#C8102E' : isChelsea ? '#034694' : '#1a1a1a';
  const footerText = isManUtd ? '#111318' : '#ffffff';
  const footerMuted = isManUtd ? 'rgba(17, 19, 24, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const footerAccent = isManUtd ? 'rgba(17, 19, 24, 0.4)' : 'rgba(255, 255, 255, 0.4)';
  const footerBorder = isManUtd ? '1px solid rgba(17, 19, 24, 0.08)' : 'none';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 bg-background pattern-${club.design.patternType}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${club.colors.primary};
          --secondary: ${club.colors.secondary};
          --accent: ${club.colors.accent};
          --volt: ${club.colors.darkAccent};
          --background: ${lightBg};
        }
        .dark {
          --background: ${darkBg};
        }
      `}} />

      <Header />
      
      {club.id === 'manutd' && <div className="pattern-dots-glow" />}

      <main className="flex-grow relative z-10">
        {children}
      </main>

      <footer 
        className="py-12 relative z-10 transition-colors duration-500"
        style={{ 
          backgroundColor: footerBg,
          borderTop: footerBorder
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold mb-1 transition-colors duration-500" style={{ color: footerText }}>
                FIPA 뉴스
              </p>
              <p className="text-xs transition-colors duration-500" style={{ color: footerMuted }}>
                &copy; {new Date().getFullYear()} FIPA NEWS. All rights reserved.
              </p>
            </div>
            <p className="text-[11px] italic transition-colors duration-500" style={{ color: footerAccent }}>
              &quot;본 사이트는 해외 축구 비공식 팬 페이지입니다.&quot;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );


}
