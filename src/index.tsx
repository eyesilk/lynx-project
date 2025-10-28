import { root } from '@lynx-js/react';
import App from './app/App';

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
