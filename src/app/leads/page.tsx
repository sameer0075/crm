'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';
import { LeadLabels, LeadMockData } from '../components/mockdata/leads';
import Table from '../components/Table';
import { getLeads } from '@/redux/slices/lead-slice';

const Leads = () => {
  const router = useRouter();
  // const loading = useSelector((state) => state.leads.isLoading);
  const data = useSelector((state) => state.leads.data);
  const dispatch = useDispatch<AppDispatch>();
  const [leads, setLeads] = useState([]);

  const handleAthentication = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      dispatch(getLeads('LEAD'));
    }
  };

  useEffect(() => {
    console.log('data', leads);
    setLeads(data);
  }, [data]);

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
        <Table labels={LeadLabels} data={[]} title="New Leads" />
      </div>
    </div>
  );
};

export default Leads;
