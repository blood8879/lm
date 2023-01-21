import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { wrapper } from '../store'

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Header />
//       <Component {...pageProps} />
//       <div id="root-modal" />
//     </>
//   )
// }

const app = ({ Component, pageProps}: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};


export default wrapper.withRedux(app);