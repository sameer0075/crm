'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';
import { LeadLabels, LeadMockData } from '../components/mockdata/leads';
import Table from '../components/Table';
import FileUpload from '../components/FileUpload';
import { bulkUpload, getLeads } from '@/redux/slices/lead-slice';
import Lead from "../components/Lead"
const Leads = () => {
  const router = useRouter();
  const loading = useSelector((state) => state.leads.isLoading);
  const data = useSelector((state) => state.leads.data);
  const dispatch = useDispatch<AppDispatch>();
  const [leads, setLeads] = useState([]);
  const [openFileUpload, setFileUpload] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUploadModal = () => {
    const value = !openFileUpload;
    if (value === false) {
      setFile(null);
    }
    setFileUpload(value);
  };

  const handleFile = (e) => {
    setFile(e.target.files);
  };

  const handleAthentication = () => {
    const token = sessionStorage.getItem('token');
    dispatch(getLeads('LEAD'));
    // if (!token) {
    //   router.push('/');
    // } else {
      
    // }
  };

  useEffect(() => {
    console.log('data', leads);
    setLeads(data);
  }, [data]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', file[0]);
    dispatch(bulkUpload(formData)).then(() => {
      handleFileUploadModal();
    });
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
        <div className="flex">
          <Button
            handleClick={handleFileUploadModal}
            text="Bulk Upload"
            className="h-[48px] w-[158px] gap-4 mr-2"
          />
          <Button
            handleClick={() => {}}
            text="Add New"
            className="h-[48px] w-[158px] gap-4"
          />
          {openFileUpload && (
            <FileUpload
              open={openFileUpload}
              loading={loading}
              handleOpen={handleFileUploadModal}
              handleFile={handleFile}
              handleSubmit={handleSubmit}
              file={file}
            />
          )}
        </div>
      </div>
          <div>
            <Lead/>
          </div>
      {/* <div className="m-8">
        <Table
          labels={LeadLabels}
          data={LeadMockData}
          title="Follow Up Leads"
        />
      </div> */}

      {/* <div className="m-8">
        <Table labels={LeadLabels} data={data} title="New Leads" />
      </div> */}
    </div>
  );
};

export default Leads;
