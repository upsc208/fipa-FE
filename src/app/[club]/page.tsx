import { getNews, getSources, getRecentMatch, getUpcomingMatches, getLatestBriefing } from '@/client/sdk.gen';
import NewsCard from '@/components/NewsCard';
import NewsFeedContainer from '@/components/Home/NewsFeedContainer';
import SearchBar from '@/components/Filters/SearchBar';
import CategoryFilter from '@/components/Filters/CategoryFilter';
import Pagination from '@/components/Pagination';
import { Newspaper, Sparkles } from 'lucide-react';
import MatchResultCard from '@/components/Home/MatchResultCard';
import MobileFilterDrawer from '@/components/Filters/MobileFilterDrawer';
import { CLUBS } from '@/config/clubs';
import { notFound } from 'next/navigation';

export default async function Home({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ club: string }>;
  searchParams: Promise<{ page?: string; size?: string; query?: string; sources?: string; category?: string; isHyped?: string }>;
}) {
  const params = await paramsPromise;
  const clubId = params.club;
  const club = CLUBS[clubId];

  if (!club) {
    notFound();
  }

  const searchParams = await searchParamsPromise;
  const page = searchParams.page ? parseInt(searchParams.page) - 1 : 0;
  const size = searchParams.size ? parseInt(searchParams.size) : 10;
  const query = searchParams.query || '';
  const category = searchParams.category || '';
  const sourcesParam = searchParams.sources || '';
  const sources = sourcesParam ? sourcesParam.split(',') : [];
  const isHyped = searchParams.isHyped === 'true';

  let newsData;
  let sourcesData: any[] = [];
  let recentMatchData = null;
  let upcomingMatchesData: any[] = [];
  let briefingData = null;

  try {
    // Fetch news and sources in parallel
    const [newsResponse, sourcesResponse, recentMatchResponse, upcomingMatchesResponse, briefingResponse] = await Promise.all([
      getNews({
        path: { clubCode: club.clubCode },
        query: {
          page: page,
          size: size,
          search: query,
          ...(category && category !== 'all' ? { category } : {}),
          ...(sourcesParam && sourcesParam !== 'none' ? { sources } : {})
        }
      }),
      getSources({
        path: { clubCode: club.clubCode }
      }),
      getRecentMatch({
        path: { clubCode: club.clubCode }
      }),
      getUpcomingMatches({
        path: { clubCode: club.clubCode }
      }),
      getLatestBriefing({
        path: { clubCode: club.clubCode }
      })
    ]);

    newsData = newsResponse.data;
    sourcesData = sourcesResponse.data || [];
    recentMatchData = recentMatchResponse.data || null;
    upcomingMatchesData = upcomingMatchesResponse.data || [];
    briefingData = briefingResponse.data || null;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  let newsList = newsData?.content || [];
  let totalPages = newsData?.totalPages || 0;
  const currentPage = (newsData?.number || 0) + 1;

  return (
    <div className="flex flex-col gap-0 pt-10">
      <section className="container mx-auto px-6 lg:px-12 py-12 relative">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="w-full">
            <MatchResultCard 
              recentMatch={recentMatchData} 
              upcomingMatches={upcomingMatchesData} 
              briefing={briefingData}
              club={club} 
            />
          </div>
          <MobileFilterDrawer allSources={sourcesData} />
        </div>

        <div id="news-section" className="scroll-mt-36 md:scroll-mt-24">
          <SearchBar />
          <CategoryFilter />
        </div>

        <NewsFeedContainer sourcesData={sourcesData}>
          {newsList.length > 0 ? (
            <>
              <div className="flex flex-col min-h-[600px] -mt-10">
                {newsList.map((news) => (
                  <NewsCard key={news.id} news={news} showImage={true} fromPage={currentPage} club={club} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-48 bg-white dark:bg-[#111318] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/[0.04] relative">
              <div className="relative mb-8 z-10">
                <Newspaper size={80} className="text-gray-100" />
                <Sparkles size={24} className="absolute -top-2 -right-2 text-gray-200 animate-pulse" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-black tracking-tight text-center px-4 text-xl uppercase relative z-10">
                등록된 뉴스가 없습니다.
              </p>
            </div>
          )}
        </NewsFeedContainer>
      </section>
    </div>
  );
}
