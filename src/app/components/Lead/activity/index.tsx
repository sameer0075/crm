'use client';
import React from 'react';
import { IoMail } from 'react-icons/io5';
import { IoMdCall } from 'react-icons/io';

const steps = [
  { icon: <IoMdCall />, label: 'Call' },
  { icon: <IoMail />, label: 'Email' },
  { icon: <IoMdCall />, label: 'Call' },
  { icon: <IoMdCall />, label: 'Call' },
];

const CallActivity = () => (
  <section>
    <div className="rounded-lg bg-gradient-to-br from-white via-white to-transparent shadow-lg h-[400px] p-4">
      <h2 className="text-lg font-semibold text-[#3673D4] pb-[12px]">
        Activity
      </h2>
      <div className="flex flex-col relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-6 relative ">
            <div
              className={`flex items-center justify-center w-[30px] h-[30px] rounded-full text-white text-center mr-4 
                            ${step.icon.type === IoMail ? 'bg-[#3673D4]' : 'bg-[#72D436]'}`}
            >
              {step.icon}
            </div>
            <div className="bg-[#D9D9D9] rounded-md w-full p-2 bg-opacity-20">
              <h1 className="text-[#3673D4] text-[12px] font-bold pb-[2px]">
                {step.label}
              </h1>
              <div className="flex justify-between items-center text-black text-[12px]">
                <p>You logged a call</p>
                <p>15 min 30 sec</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-3 top-12 w-[2px] h-[70%] bg-[#72D436]" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CallActivity;
