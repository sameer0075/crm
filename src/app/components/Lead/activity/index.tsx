'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { LogsInterface } from '@/redux/slices/logs-slice';

const CallActivity = ({ data }: LogsInterface) => {
  return (
    <section>
      <div
        className={`rounded-lg bg-gradient-to-br from-white via-white to-transparent shadow-lg ${data?.length > 0 ? 'h-[400px]' : 'h-auto'} p-4 overflow-auto`}
      >
        <h2 className="text-lg font-semibold text-[#3673D4] pb-[12px]">
          Activity
        </h2>
        {data?.length === 0 && (
          <p className="text-[#111] pt-2 text-center font-medium text-xs font-roboto">
            No Data Found
          </p>
        )}
        <div className="flex flex-col relative">
          {data?.map((step, index) => (
            <div key={index} className="flex items-center mb-6 relative ">
              <div
                className={`flex items-center justify-center w-[30px] h-[30px] rounded-full text-white text-center mr-4 
                ${step.label === 'Email' ? 'bg-[#3673D4]' : 'bg-[#72D436]'}`}
              >
                {step.type === 'call' && (
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
                )}

                {step.type === 'email' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                  >
                    <path
                      d="M10.8 0H1.2C0.54 0 0.00599999 0.5625 0.00599999 1.25L0 8.75C0 9.4375 0.54 10 1.2 10H10.8C11.46 10 12 9.4375 12 8.75V1.25C12 0.5625 11.46 0 10.8 0ZM10.8 2.5L6 5.625L1.2 2.5V1.25L6 4.375L10.8 1.25V2.5Z"
                      fill="white"
                    />
                  </svg>
                )}

                {step.type === 'comment' && <MessageCircle />}
              </div>
              <div className="bg-[#D9D9D9] rounded-md w-full p-2 bg-opacity-20">
                <h1 className="text-[#3673D4] text-[12px] font-bold pb-[2px] break-words">
                  {step.type &&
                    step.type[0]?.toUpperCase() + step.type.slice(1)}
                </h1>
                <div className="flex justify-between items-center text-black text-[12px]">
                  <p>
                    You logged {step.type === 'email' ? 'an' : 'a'}{' '}
                    {step.type.toLowerCase()}
                  </p>
                  <p>{step.callDuration}</p>
                </div>
              </div>
              {index < data?.length - 1 && (
                <div className="absolute left-3 top-12 w-[2px] h-[70%] bg-[#72D436]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallActivity;
