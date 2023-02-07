import '../styles/globals.css'
import App, { AppContext, AppProps } from 'next/app'
import Header from '../components/Header'
import { useSelector, wrapper } from '../store'
import axios from 'axios';
import { cookieStringToObject } from '../lib/utils';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import { teamActions } from '../store/team/teams';
import { getTeamListAPI } from '../lib/api/team';

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

app.getInitialProps = wrapper.getInitialAppProps(store => async context => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { isLogged } = store.getState().user;

  try {
    if(!isLogged && cookieObject.token) {
      axios.defaults.headers.common['cookie'] = cookieObject.token;

      const { data } = await meAPI();
      
      // console.log(data);
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch(e) {
    // 최초 서버 기동 시 invalidURL 에러가 올라오는 issue로 일단 주석 처리.
    // TypeError [ERR_INVALID_URL]: Invalid URL
    // at new NodeError (node:internal/errors:387:5)
    // at URL.onParseError (node:internal/url:564:9)
    // at new URL (node:internal/url:640:5)
    // at dispatchHttpRequest (file:///C:/side/lm/client/node_modules/axios/lib/adapters/http.js:181:20)
    // at new Promise (<anonymous>)
    // at http (file:///C:/side/lm/client/node_modules/axios/lib/adapters/http.js:117:10)
    // at Axios.dispatchRequest (file:///C:/side/lm/client/node_modules/axios/lib/core/dispatchRequest.js:51:10)
    // at Axios.request (file:///C:/side/lm/client/node_modules/axios/lib/core/Axios.js:142:33)
    // at Axios.<computed> [as get] (file:///C:/side/lm/client/node_modules/axios/lib/core/Axios.js:168:17)
    // at Function.wrap [as get] (file:///C:/side/lm/client/node_modules/axios/lib/helpers/bind.js:5:15)
    // at meAPI (webpack-internal:///./lib/api/auth.ts:16:65)
    // at eval (webpack-internal:///./pages/_app.tsx:64:93) {
    // input: '/api/auth/me',
    // code: 'ERR_INVALID_URL'
    // }
    // console.log(e);
  }

  return { ...appInitialProps };
})

export default wrapper.withRedux(app);