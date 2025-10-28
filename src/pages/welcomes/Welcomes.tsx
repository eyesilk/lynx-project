import { useNavigate } from 'react-router';
import Background from '../../shared/assets/background.png';

export function Welcomes() {
  const nav = useNavigate();

  return (
    <view
      className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-8 md:p-12 lg:p-16 bg-cover bg-center"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <text className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 text-center">
        Trailers
      </text>
      <text className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#c0bfbc] text-center mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-lg">
        Сервис для просмотра трейлеров на любой вкус и цвет.
      </text>
      <view>
        <text
          bindtap={() => nav('/home')}
          className="font-bold px-8 sm:px-10 md:px-12 lg:px-16 py-3 sm:py-4 md:py-5 lg:py-6 shadow-2xl hover:opacity-90 transition-opacity cursor-pointer text-base sm:text-lg md:text-xl lg:text-2xl rounded-md text-white bg-[#112639]"
        >
          Начать просмотр
        </text>
      </view>
    </view>
  );
}
