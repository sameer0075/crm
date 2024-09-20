'use client';
import React from 'react';
import { DetailLogMockData } from '../../mockdata/detailmockdata';

const DetailLogs = ({ data }) => {
  const details = data ?? DetailLogMockData;
  return (
    <div className="w-full rounded-lg bg-gradient-to-br from-white via-transparent to-transparent shadow-lg">
      <div className="p-4 h-full flex flex-col bg-white rounded-lg">
        <h2 className="text-lg font-semibold text-[#3673D4]">Details</h2>

        {details?.map((log, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 py-[6px] text-[#000] text-[12px]"
          >
            <div className="w-1/3 text-left px-2">{log.state}</div>
            <div className="w-1/3 text-left px-2 break-words">{log.value}</div>
            <div className="ml-auto text-right">
              <img
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/edit.svg`}
                alt="edit icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLogs;
