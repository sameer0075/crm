import React from 'react';
import { LogsInterface } from '@/redux/slices/logs-slice';

const CalendarLogs = ({ data }: LogsInterface) => {
  return (
    <section>
      <div className="rounded-lg bg-gradient-to-br from-white via-white to-transparent shadow-lg p-4">
        <div className="rounded-lg bg-[#D7E6FF] p-4">
          <h1 className="text-[#111111] text-[14px] font-semibold">
            September 2024
          </h1>
        </div>
        {data?.length === 0 && (
          <p className="text-[#111] pt-2 text-center font-medium text-xs font-roboto">
            No Data Found
          </p>
        )}
        <div className="flex flex-col relative pt-4">
          {data.map((step, index) => (
            <div key={index} className="flex items-center mb-6 relative">
              <div
                className={`flex items-center justify-center min-w-[30px] ma-w-[30px] h-[30px] rounded-full text-white text-center mr-3 bg-[#72D436]
             `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  fill="none"
                >
                  <path
                    d="M10.395 8.25333C9.64333 8.25333 8.91611 8.12 8.23778 7.88C8.02389 7.8 7.78556 7.86 7.62056 8.04L6.66111 9.35333C4.93167 8.45333 3.31222 6.75333 2.45056 4.8L3.64222 3.69333C3.80722 3.50667 3.85611 3.24667 3.78889 3.01333C3.56278 2.27333 3.44667 1.48 3.44667 0.66C3.44667 0.3 3.17167 0 2.84167 0H0.727222C0.397222 0 0 0.16 0 0.66C0 6.85333 4.72389 12 10.395 12C10.8289 12 11 11.58 11 11.2133V8.91333C11 8.55333 10.725 8.25333 10.395 8.25333Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h1 className="text-[#3673D4] text-[12px] font-bold pb-[2px] break-words">
                  {step.type &&
                    step.type[0]?.toUpperCase() + step.type.slice(1)}
                </h1>
                <div className="grid grid-cols-12 justify-between  text-black text-[12px]">
                  <p className='break-words col-span-8'>You logged a call</p>
                  <p className='break-words col-span-4 text-end'>{step.callDuration ?? 'N/A'}</p>
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
};

export default CalendarLogs;
