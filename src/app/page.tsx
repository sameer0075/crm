'use client';
import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';
import Auth from './auth/page';
import { store } from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/index';
export default function Home() {
  const pathname = usePathname();
  let token = null;
  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }
  return (
    <div>
      <ToastContainer />
      {pathname != '/' && token && <Header />}
      <Provider store={store}>
        <Auth />
      </Provider>
    </div>
  );
}
