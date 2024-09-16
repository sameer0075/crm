'use client';
import React from 'react';
import { logData } from '../../mockdata/activitylog';

const ActivityLog = () => (
  <section>
    <div className="rounded-lg bg-gradient-to-br from-white via-white to-transparent shadow-lg max-h-[500px] p-6">
      <h2 className="text-lg font-semibold text-black pb-[12px]">
        Activity Log
      </h2>
      <div className="flex flex-col relative">
        {logData.map((log, index) => (
          <div
            key={index}
            className="relative w-full border-b border-[#D9D9D9] py-2"
          >
            <h1 className="text-black text-[12px] pb-[4px]">{log.title}</h1>
            <div className="flex justify-between items-center font-medium text-[#3673D4] text-[12px]">
              <p className="font-semibold">{log.date}</p>
              <p className="font-semibold">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ActivityLog;
