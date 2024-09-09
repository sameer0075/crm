'use client';
import { Provider } from 'react-redux';
import Auth from '../app/auth';
import { store } from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function Home() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <Auth />
      </Provider>
    </div>
  );
}
