'use client';
import { Provider } from 'react-redux';
import Auth from './auth/page';
import { store } from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/index';
export default function Home() {
  const pathname = window.location.pathname;
  return (
    <div>
      <ToastContainer />
      {pathname != '/' && <Header />}
      <Provider store={store}>
        <Auth />
      </Provider>
    </div>
  );
}
