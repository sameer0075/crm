'use client';
import React from 'react';
import { IoMail } from 'react-icons/io5';
import { IoMdCall } from 'react-icons/io';

const CallNow = () => {
  return (
    <div className="text-[16px] font-semibold rounded-lg bg-white p-4 flex justify-between items-center bg-gradient-to-br from-white via-transparent to-transparent shadow-lg shadow-gray-300">
      <div className="flex items-center">
        <div className="w-[45px] h-[45px] bg-[#EBF3FF] border-1 border-[#BDD2F2] rounded flex justify-center items-center">
          <IoMdCall className="text-[#3673D4] text-[24px]" />
        </div>

        <h1 className="text-[14px] font-semibold ml-2">Call Now</h1>
      </div>
      <div className="flex items-center">
        <div className="w-[45px] h-[45px] bg-[#EBF3FF] border-1 border-[#BDD2F2] rounded flex justify-center items-center">
          <IoMail className="text-[#3673D4] text-[24px]" />
        </div>
        <h1 className="text-[14px] font-semibold ml-2">Email Now</h1>
      </div>
    </div>
  );
};
export default CallNow;
