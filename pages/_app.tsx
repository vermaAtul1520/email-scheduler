import type { AppProps } from "next/app";
import PopupProvider from '../context/popupcontext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <Component {...pageProps} />
    </PopupProvider>
  );
}
