import React from 'react';
import { StepMockData } from '../../mockdata/calendardata';

const CalendarLogs = () => (
  <section>
    <div className="rounded-lg bg-gradient-to-br from-white via-white to-transparent shadow-lg p-4">
      <div className="rounded-lg bg-[#D7E6FF] p-4">
        <h1 className="text-[#111111] text-[14px] font-semibold">
          September 2024
        </h1>
      </div>
      <div className="flex flex-col relative pt-4">
        {StepMockData.map((step, index) => (
          <div key={index} className="flex items-center mb-6 relative">
            <div
              className={`flex items-center justify-center min-w-[30px] ma-w-[30px] h-[30px] rounded-full text-white text-center mr-3 bg-[#72D436]
             `}
            >
              {step.icon}
            </div>
            <div className="w-full">
              <h1 className="text-[#3673D4] text-[12px] font-bold pb-[2px]">
                {step.label}
              </h1>
              <div className="flex justify-between items-center text-black text-[12px]">
                <p>You logged a {step.label.toLowerCase()}</p>
                <p>15 min 30 sec</p>
              </div>
            </div>
            <div
              className={`absolute left-3 top-9 w-[2px] h-[70%] bg-[#72D436]`}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CalendarLogs;
