import { useCallback, useEffect, useState } from '@lynx-js/react';

import './index.css';
// import './App.css';
// import arrow from './assets/arrow.png';
// import lynxLogo from './assets/lynx-logo.png';
// import reactLynxLogo from './assets/react-logo.png';

export function App() {
  // const [alterLogo, setAlterLogo] = useState(false);
  //
  // useEffect(() => {
  //   console.info('Hello, ReactLynx');
  // }, []);
  //
  // const onTap = useCallback(() => {
  //   'background only';
  //   setAlterLogo((prevAlterLogo) => !prevAlterLogo);
  // }, []);

  return (
    <page>
      <view className="flex flex-col gap-8 justify-center items-center min-h-screen text-center">
        <text className="text-6xl font-bold leading-normal underline">
          TrailerPark
        </text>
        <text className="text-lg font-normal text-gray-500 leading-normal ">
          Сервис для просмотра трейлеров онлайн.
        </text>
        <view className="flex justify-center items-center gap-[30px] p-5 rounded-full bg-[#191d24]">
          <image
            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80"
            className="rounded-full w-16 h-16"
          />
          <image
            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80"
            className="rounded-full w-16 h-16 rotate-45"
          />
          <image
            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80"
            className="rounded-full w-16 h-16"
          />
        </view>
        <view className="grid grid-cols-3 gap-4">
          <text>01</text>
          <text>02</text>
          <text>03</text>
          <text>04</text>
          <text>05</text>
          <text>06</text>
        </view>
      </view>
    </page>
  );
}
