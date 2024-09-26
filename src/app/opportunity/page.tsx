'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';
import { LeadLabels } from '../components/mockdata/leads';
import Table from '../components/Table';
import FileUpload from '../components/FileUpload';
import {
  bulkUpload,
  getOpportunities,
  getFollowUpOpportunities,
} from '@/redux/slices/lead-slice';
const Opportunity = () => {
  const loading = useSelector((state) => state.leads.isLoading);
  const data = useSelector((state) => state.leads.data);
  const count = useSelector((state) => state.leads.count);
  const followUpData = useSelector((state) => state.leads.followUpData);
  const followUpCount = useSelector((state) => state.leads.followUpCount);
  const dispatch = useDispatch<AppDispatch>();
  const [openFileUpload, setFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [extentionError, setExtentionError] = useState(null);

  const handleFileUploadModal = () => {
    const value = !openFileUpload;
    if (value === false) {
      setFile(null);
      setExtentionError(null);
    }
    setFileUpload(value);
  };

  const fileHandling = (fileData) => {
    const allowedExtensions = ['csv', 'xls', 'xlsx'];
    const files = Array.from(fileData);

    const disallowedFiles = files.filter((info: File) => {
      const fileExtension = info.name.split('.').pop().toLowerCase();
      return !allowedExtensions.includes(fileExtension);
    });

    if (disallowedFiles.length > 0) {
      setExtentionError(
        'Invalid file type. Only CSV and Excel files are allowed.'
      );
      return false;
    } else {
      setExtentionError(null);
      return true;
    }
  };

  const handleFile = (e) => {
    const validFile = fileHandling(e.target.files);
    if (validFile) {
      setFile(e.target.files);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', file[0]);
    dispatch(bulkUpload(formData)).then(() => {
      handleFileUploadModal();
    });
  };

  const getList = (page: number, pageSize: number) => {
    const payload = {
      type: 'OPPORTUNITY',
      page,
      pageSize,
    };
    dispatch(getOpportunities(payload));
  };

  const getFollowUpList = (page: number, pageSize: number) => {
    const payload = {
      type: 'FOLLOW_UP_OPPORTUNITY',
      page,
      pageSize,
    };
    dispatch(getFollowUpOpportunities(payload));
  };

  return (
    <div className="w-full">
      <div className="flex m-10">
        <div className="flex-1">
          <h1 className="text-[32px] font-outfit font-500 leading-[24px]">
            All Opportunities
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
              extentionError={extentionError}
            />
          )}
        </div>
      </div>

      <div className="m-8">
        <Table
          labels={LeadLabels}
          data={followUpData}
          title="Follow Up Opportunities"
          totalRecords={followUpCount}
          loading={loading}
          handleApiCall={getFollowUpList}
        />
      </div>

      <div className="m-8">
        <Table
          labels={LeadLabels}
          data={data}
          title="New Opportunities"
          totalRecords={count}
          loading={loading}
          handleApiCall={getList}
        />
      </div>
    </div>
  );
};

export default Opportunity;
