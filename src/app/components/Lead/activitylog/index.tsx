'use client';
import React from 'react';
import { CommentsInterface } from '@/redux/slices/commentSlice';

const ActivityLog = ({ data }: CommentsInterface) => (
  <section>
    <div className="rounded-lg bg-gradient-to-br from-white via-white to-transparent shadow-lg max-h-[500px] p-6 overflow-auto">
      <h2 className="text-lg font-semibold text-black pb-[12px]">
        Activity Log
      </h2>
      {data?.length === 0 && (
        <p className="text-[#111] pt-2 text-center font-medium text-xs font-roboto">
          No Data Found
        </p>
      )}
      <div className="flex flex-col relative">
        {data?.map((log, index) => {
          const dateObject = new Date(log.createdAt);

          const datePart = dateObject.toISOString().split('T')[0];
          const timePart = dateObject.toISOString().split('T')[1].split('.')[0];
          return (
            <div
              key={index}
              className="relative w-full border-b border-[#D9D9D9] py-2"
            >
              <h1 className="text-black text-[12px] pb-[4px] break-words">
                {log.comment}
              </h1>
              <div className="grid grid-cols-2 justify-between  font-medium text-[#3673D4] text-[12px]">
                <p className="font-semibold break-words">{datePart}</p>
                <p className="font-semibold break-words">{timePart}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ActivityLog;
