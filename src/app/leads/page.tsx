'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../components/Button';
import { LeadLabels, LeadMockData } from '../components/mockdata/leads';
import Table from '../components/Table';

const Leads = () => {
  const router = useRouter();
  const handleAthentication = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  };

  useEffect(() => {
    handleAthentication();
  }, []);
  return (
    <div className="w-full">
      <div className="flex m-10">
        <div className="flex-1">
          <h1 className="text-[32px] font-outfit font-500 leading-[24px]">
            All Leads
          </h1>
        </div>
        <Button
          handleClick={() => {}}
          text="Add New"
          className="h-[48px] w-[158px] gap-4"
        />
      </div>

      <div className="m-8">
        <Table
          labels={LeadLabels}
          data={LeadMockData}
          title="Follow Up Leads"
        />
      </div>

      <div className="m-8">
        <Table labels={LeadLabels} data={LeadMockData} title="New Leads" />
      </div>
    </div>
  );
};

export default Leads;
