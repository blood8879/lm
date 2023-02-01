import '../styles/globals.css'
import App, { AppContext, AppProps } from 'next/app'
import Header from '../components/Header'
import { useSelector, wrapper } from '../store'
import axios from 'axios';
import { cookieStringToObject } from '../lib/utils';

const app = ({ Component, pageProps}: AppProps) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  axios.defaults.withCredentials = true;

  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async(context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  console.log("store==", context.ctx);
  const { store } = context.ctx;
  // const { isLogged } = store.getState().user;


  return { ...appInitialProps };
}

export default wrapper.withRedux(app);