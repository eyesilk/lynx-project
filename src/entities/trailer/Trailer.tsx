interface TrailerProps {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  views: number;
  published: string;
  genres: string[];
}

export function Trailer({
  id,
  title,
  thumbnail,
  url,
  views,
  published,
  genres,
}: TrailerProps) {
  return (
    <view
      key={id}
      className="bg-[#020913] rounded-2xl overflow-hidden shadow-md mb-5"
      bindtap={() => console.log('Открыть трейлер:', url)}
    >
      <view
        className="w-full h-40 bg-center bg-cover"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <view className="p-3">
        <text className="text-white text-lg font-semibold">{title}</text>
        <text className="text-gray-400 text-sm block">
          👁 {views.toLocaleString()} •{' '}
          {new Date(published).toLocaleDateString('ru-RU')}
        </text>

        <view className="flex flex-row flex-wrap gap-2 mt-2">
          {genres.map((genre) => (
            <view key={genre} className="bg-[#ffc700]  px-2 py-1 rounded-md">
              <text className="text-black text-xs font-semibold">{genre}</text>
            </view>
          ))}
        </view>
      </view>
    </view>
  );
}
