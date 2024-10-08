'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import EmailBuilder from '../../EmailBuilder';

interface CallNowInterface {
  phone: string;
  email: string;
}

const CallNow = ({ phone, email }: CallNowInterface) => {
  const [emailBuilders, setEmailBuilders] = useState<number[]>([]);
  const [tooltip, setTooltip] = useState<{
    type: string;
    visible: boolean;
  } | null>(null);
  const disablePhone = useSelector((state) => state.comments.disablePhone);
  const disableEmail = useSelector((state) => state.comments.disableEmail);

  const handleBoxClick = () => {
    if (!disableEmail) {
      setEmailBuilders([...emailBuilders, emailBuilders.length]); // Add a new instance
    }
  };

  const handleClick = () => {
    if (!disablePhone) {
      window.open(`openphone://dial?number=${phone}`);
    }
  };

  const showTooltip = (type: string) => {
    setTooltip({ type, visible: true });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  return (
    <div className="text-[16px] font-semibold rounded-lg bg-white p-4 flex justify-between items-center bg-gradient-to-br from-white via-transparent to-transparent shadow-lg shadow-gray-300 relative">
      <div
        onClick={handleClick}
        onMouseEnter={() => showTooltip('call')}
        onMouseLeave={hideTooltip}
        className={`flex items-center ${
          disablePhone ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        <div className="w-[45px] h-[45px] bg-[#EBF3FF] border-2 border-[#BDD2F2] rounded flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22.1314 16.2341C20.5646 16.2341 19.0487 15.9794 17.6348 15.5208C17.189 15.3679 16.6922 15.4826 16.3483 15.8265L14.3484 18.3359C10.7435 16.6163 7.36792 13.368 5.57184 9.63578L8.05577 7.52126C8.3997 7.16459 8.50161 6.66781 8.36149 6.22197C7.89018 4.80805 7.64815 3.29221 7.64815 1.72543C7.64815 1.03757 7.07494 0.464355 6.38708 0.464355H1.9797C1.29184 0.464355 0.463867 0.77007 0.463867 1.72543C0.463867 13.5591 10.3104 23.3929 22.1314 23.3929C23.0358 23.3929 23.3924 22.5904 23.3924 21.8898V17.4952C23.3924 16.8073 22.8192 16.2341 22.1314 16.2341Z"
              fill="#3673D4"
            />
          </svg>
        </div>
        <h1 className="text-[14px] font-semibold ml-2">Call Now</h1>
      </div>
      <div
        onClick={handleBoxClick}
        onMouseEnter={() => showTooltip('email')}
        onMouseLeave={hideTooltip}
        className={`flex items-center ${disableEmail ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <div className="w-[45px] h-[45px] bg-[#EBF3FF] border-2 border-[#BDD2F2] rounded flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
          >
            <path
              d="M26.5359 0.464355H3.60728C2.03094 0.464355 0.755541 1.75409 0.755541 3.33043L0.741211 20.5269C0.741211 22.1032 2.03094 23.3929 3.60728 23.3929H26.5359C28.1122 23.3929 29.4019 22.1032 29.4019 20.5269V3.33043C29.4019 1.75409 28.1122 0.464355 26.5359 0.464355ZM26.5359 6.1965L15.0716 13.3617L3.60728 6.1965V3.33043L15.0716 10.4956L26.5359 3.33043V6.1965Z"
              fill="#3673D4"
            />
          </svg>
        </div>
        <h1 className="text-[14px] font-semibold ml-2">Email Now</h1>
      </div>

      {tooltip && (
        <div
          className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${tooltip.visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            top: tooltip.type === 'call' ? '15px' : '15px', // Adjust to place the tooltip above the buttons
            left: tooltip.type === 'call' ? '0%' : '50%', // Center align horizontally
            transform: 'translate(-50%, -100%)', // Adjust to center horizontally and move above
          }}
        >
          {tooltip.type === 'call'
            ? disablePhone
              ? 'Phone call is disabled'
              : 'Make a call'
            : disableEmail
              ? 'Email is disabled'
              : 'Send email'}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}

      {emailBuilders.map((_, index) => (
        <div key={index}>
          <EmailBuilder email={email} />
        </div>
      ))}
    </div>
  );
};

export default CallNow;
