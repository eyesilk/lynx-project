import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Background from '../../shared/assets/background.png';
import { Trailer } from '../../entities/trailer';

type Trailer = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  views: number;
  published: string;
  genres: string[];
};

type KinoCheckResponse = {
  [key: string]: any;
  _metadata?: {
    limit: number;
    page: number;
    total_pages: number;
    total_count: number;
  };
};

export function Home() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const fetchTrailers = async (
    page: number,
    limit: number,
  ): Promise<KinoCheckResponse> => {
    const { data } = await axios.get<KinoCheckResponse>(
      `https://api.kinocheck.com/trailers/latest?page=${page}&limit=${limit}`,
    );
    return data;
  };

  const { data, isLoading, isError } = useQuery<KinoCheckResponse>({
    queryKey: ['trailers', page],
    queryFn: () => fetchTrailers(page, limit),
  });

  const trailers: Trailer[] = data
    ? (Object.values(data)
      .filter((item: any) => item && item.id && item.title)
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        url: item.url,
        views: item.views,
        published: item.published,
        genres: item.genres || [],
      })) as Trailer[])
    : [];

  return (
    <view
      className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center p-4 relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <text className="text-white text-2xl font-bold pt-16 pb-4">Трейлеры</text>

      {isLoading && <text className="text-gray-300">Загрузка...</text>}
      {isError && (
        <text className="text-red-400">Ошибка при загрузке данных</text>
      )}

      {!isLoading && !isError && (
        <>
          <scroll-view
            scroll-orientation="vertical"
            style={{
              width: '100%',
              height: '80vh',
              paddingLeft: '5px',
              marginLeft: '5px',
            }}
            scroll-bar-enable={true}
            bounces={true}
            upper-threshold={20}
            lower-threshold={20}
            bindscroll={(e) => console.log('scroll', e.detail)}
            bindscrolltoupper={() => console.log('достигнут верх')}
            bindscrolltolower={() => console.log('достигнут низ')}
          >
            <view className="flex flex-col w-full max-w-[600px] space-y-4">
              {trailers.map((trailer) => (
                <Trailer
                  id={trailer.id}
                  title={trailer.title}
                  thumbnail={trailer.thumbnail}
                  url={trailer.url}
                  views={trailer.views}
                  published={trailer.published}
                  genres={trailer.genres}
                />
              ))}
            </view>
          </scroll-view>

          <view className="flex flex-row justify-between items-center w-full max-w-[600px] pt-4 pb-8">
            <text
              className="text-blue-400"
              bindtap={() => setPage((p) => Math.max(1, p - 1))}
            >
              ◀ Назад
            </text>
            <text className="text-white">{`Страница ${page}`}</text>
            <text
              className="text-blue-400"
              bindtap={() => setPage((p) => p + 1)}
            >
              Вперед ▶
            </text>
          </view>
        </>
      )}
    </view>
  );
}
