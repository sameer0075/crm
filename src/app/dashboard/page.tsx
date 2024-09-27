'use client';
import React, { useEffect, useState, ReactNode, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  MessageCircle,
  Logs,
  Phone,
  Mail,
  Handshake,
  Presentation,
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import { jwtDecode } from 'jwt-decode';
import 'react-datepicker/dist/react-datepicker.css';

import { getDashboardInsights } from '@/redux/slices/report-slice';
import { getUsersList } from '@/redux/slices/auth-slice';
import Card from '../components/Card';
import { AppDispatch } from '@/redux/store';
import Button from '../components/Button';

interface CardInterface {
  title: string;
  type: string;
  value: number | string;
  icon: ReactNode;
}

const Dashboard = () => {
  const [data, setData] = useState<CardInterface[]>([]);
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  const [decoded, setDecoded] = useState(null);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  // const handleClick = () => {
  //   window.open('openphone://dial?number=8002752273');
  // };

  const handleDate = (date: string | Date, type: string) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await dispatch(
      getDashboardInsights({ startDate, endDate, userId })
    ).unwrap();

    if (res.success) {
      getUpdatedData(res.data);
    }
  };

  const getUpdatedData = (payload) => {
    if (payload) {
      const updatedPayload = payload.map((info: CardInterface) => {
        let icon;

        if (info.type === 'LEAD') {
          icon = (
            <img
              className="w-4 h-4"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/leads-icon.png`}
            />
          );
        } else if (
          info.type === 'OPPORTUNITY' ||
          info.type === 'FOLLOW_UP_OPPORTUNITY'
        ) {
          icon = (
            <img
              className="w-4 h-4"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/opportunity-icon.jpg`}
            />
          );
        } else if (info.type === 'APPOINTMENTS') {
          icon = <Presentation />;
        } else if (info.type === 'DEALS') {
          icon = <Handshake />;
        } else if (info.type === 'ALL_LOGS') {
          icon = <Logs />;
        } else if (info.type === 'PHONE_LOGS') {
          icon = <Phone />;
        } else if (info.type === 'MAIL_LOGS') {
          icon = <Mail />;
        } else if (info.type === 'COMMENT_LOGS') {
          icon = <MessageCircle />;
        } else {
          icon = '';
        }

        return {
          ...info,
          icon,
        };
      });

      console.log('updatedPayload', updatedPayload);
      setData([...updatedPayload]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(
        getDashboardInsights({ startDate: null, endDate: null, userId: null })
      ).unwrap();

      const userData = await dispatch(getUsersList()).unwrap();
      if (userData.success) {
        setUsers(userData.data);
      }

      const payload = res.data;
      getUpdatedData(payload);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This will only run on the client side
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      }
    }
  }, []);

  return (
    <div>
      <div className="flex m-4 justify-center">
        <div className="mr-2">
          <label>Start Date</label> <br />
          <DatePicker
            selected={startDate}
            showTimeSelect
            timeFormat="HH:mm"
            onChange={(date) => handleDate(date, 'start')}
            className={`p-2 border border-gray-300 rounded-md h-full w-full`}
          />
        </div>

        <div>
          <label>End Date</label> <br />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDate(date, 'end')}
            className={`p-2 border border-gray-300 rounded-md h-full w-full`}
          />
        </div>
        {decoded && decoded.role === 'admin' && (
          <div className="ml-2 mt-6">
            <select
              onChange={handleStatus}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="" selected>
                Select your option
              </option>
              {users.map((user, index: number) => {
                return (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div className="ml-2 mt-6">
          <Button
            handleClick={handleSubmit}
            className={`h-10 w-[86px] gap-4 bg-[#3673D4]`}
            text="Submit"
            type="button"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 px-4 py-8">
        {data?.map((info: CardInterface, index: number) => {
          return (
            <div key={index}>
              <Card data={info} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
