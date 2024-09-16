'use client';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

const DetailLogs = () => {
  const detailLogs = [
    { state: 'State', value: 'California' },
    { state: 'Name', value: 'Harve' },
    { state: 'Title', value: 'International Sales Director' },
    { state: 'Email', value: 'herve@100percent.com' },
    { state: 'Phone', value: '1 6104219074' },
    { state: 'Mobile', value: '1 6104219074' },
    { state: 'Website', value: 'www.biglifeinc.com' },
    { state: 'Company', value: '100percent' },
    { state: 'Industry', value: 'retail' },
    { state: 'Company Linkedin', value: 'http://www.linkedin.com' },
    { state: 'Country', value: 'United States' },
    { state: 'City', value: 'San Diego' },
  ];

  return (
    <div className="w-full rounded-lg bg-gradient-to-br from-white via-transparent to-transparent shadow-lg">
      <div className="p-4 h-full flex flex-col bg-white rounded-lg">
        <h2 className="text-lg font-semibold text-[#3673D4]">Details</h2>

        {detailLogs.map((log, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 py-[6px] text-[#000] text-[12px]"
          >
            <div className="w-1/3 text-left px-2">{log.state}</div>
            <div className="w-1/3 text-left px-2">{log.value}</div>
            <div className="ml-auto text-right ">
              <FaEdit className="text-[#3673D4]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailLogs;
