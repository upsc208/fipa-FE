import { getNewsDetail } from '@/client/sdk.gen';
import { notFound } from 'next/navigation';
import { Calendar, User, ExternalLink, Clock, MessageSquare, Newspaper, Share2, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import TwitterEmbed from '@/components/TwitterEmbed';
import ShareButton from '@/components/ShareButton';
import Link from 'next/link';
import { CLUBS } from '@/config/clubs';

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ id: string; club: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const id = parseInt(params.id);
  const clubId = params.club;
  const club = CLUBS[clubId];

  try {
    const { data: news } = await getNewsDetail({ path: { id } });
    if (!news) return { title: '뉴스를 찾을 수 없습니다' };

    const contentPreview = news.contentKo ? news.contentKo.substring(0, 100) + '...' : '';
    const description = news.summaryKo || contentPreview || `${club?.nameKo || '구단'} 최신 뉴스`;

    return {
      title: news.titleKo || '뉴스 상세',
      description,
      openGraph: {
        title: news.titleKo,
        description,
        images: news.imageUrl ? [{ url: news.imageUrl }] : [],
      },
    };
  } catch (error) {
    return { title: '뉴스 상세' };
  }
}

export default async function NewsDetailPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ id: string; club: string }>;
  searchParams: Promise<{ fromPage?: string }>;
}) {
  const params = await paramsPromise;
  const id = parseInt(params.id);
  const clubId = params.club;
  const club = CLUBS[clubId];

  if (!club) notFound();

  const searchParams = await searchParamsPromise;
  const fromPage = searchParams.fromPage;

  let news;
  try {
    const response = await getNewsDetail({ path: { id } });
    news = response.data;
  } catch (error) {
    console.error('Failed to fetch news detail:', error);
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">뉴스를 찾을 수 없습니다.</h1>
        <Link href={`/${club.id}`} className="font-bold underline" style={{ color: club.colors.primary }}>홈으로 돌아가기</Link>
      </div>
    );
  }

  const backUrl = fromPage ? `/${club.id}?page=${fromPage}#news-${id}` : `/${club.id}`;

  return (
    <article className="min-h-screen bg-white dark:bg-[#0a0b10] transition-colors duration-300">
      {/* Floating Action Bar (Mobile-ish) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <Link
          href={backUrl}
          className="flex items-center gap-2 px-5 py-3 bg-white/90 dark:bg-[#111318]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-full shadow-xl hover:text-white transition-all duration-300 font-bold group"
          style={{ '--hover-bg': club.colors.primary } as any}
        >
          <ChevronLeft size={18} />
          <span>목록으로</span>
        </Link>
        <ShareButton title={news.titleKo || ''} />
      </div>

      {/* Hero Section */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[25/9] overflow-hidden bg-gray-900">
        {news.imageUrl ? (
          <img
            src={news.imageUrl}
            alt={news.titleKo || ''}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
            <Newspaper size={120} className="text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0b10] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-gray-100 dark:border-white/5 py-4 sm:py-6 gap-6">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest" style={{ color: club.colors.primary }}>
                    {news.sourceName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <User size={16} />
                  <span className="text-xs sm:text-sm font-bold">{news.authorName || club.shortName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar size={16} />
                  <span className="text-xs sm:text-sm font-bold">
                    {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('ko-KR') : '-'}
                  </span>
                </div>
              </div>

              <a
                href={news.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-white rounded-xl text-xs sm:text-sm font-bold transition-all border border-gray-100 dark:border-white/5"
              >
                원문 보기
                <ExternalLink size={14} />
              </a>
            </div>
            
            <h1 className="mt-8 text-3xl md:text-5xl lg:text-7xl font-black text-gray-950 dark:text-white leading-[1.1] tracking-tighter">
              {news.titleKo}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto">
          {/* AI Summary Card */}
          {news.summaryKo && (
            <div className="mb-12 bg-gray-50 dark:bg-[#111318] rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Newspaper size={80} style={{ color: club.colors.primary }} />
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: club.colors.primary }}>
                <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: club.colors.primary }}></div>
                AI Quick Summary
              </h2>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed font-kanit">
                {news.summaryKo}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-xl dark:prose-invert max-w-none mb-20 font-medium leading-[1.8] text-gray-800 dark:text-gray-200">
            {news.articleType === 'SNS_POST' ? (
              <div className="flex justify-center my-10">
                <TwitterEmbed originalUrl={news.originalUrl} />
              </div>
            ) : (
              <div 
                className="whitespace-pre-wrap break-words font-kanit"
                dangerouslySetInnerHTML={{ __html: news.contentKo || '내용 요약 중입니다...' }}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
