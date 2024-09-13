'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { PaginationState } from 'primereact/paginator'; // Import PaginationState for type safety
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import moment from 'moment';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './table.css';

interface TableInterface {
  labels: LabelsInterface[];
  data: T[];
  title: string;
  rows?: number;
  totalRecords?: number;
  loading?: boolean;
  handleApiCall?: () => void;
}

interface LabelsInterface {
  label: string;
  header: string;
  sortable: boolean;
}

const EmptyData = () => {
  return (
    <div className="flex justify-center m-8">
      <h1>No Data to show</h1>
    </div>
  );
};

export default function Table({
  labels,
  data,
  title,
  totalRecords = 0,
  loading = false,
  handleApiCall,
}: TableInterface) {
  const [pagination, setPagination] = useState({
    first: 0,
    rows: 5, // Default rows per page
    page: 1,
  });

  const paginatorLeft = (
    <Button
      type="button"
      className="paginator-left"
      icon="pi pi-refresh"
      text
    />
  );

  const processedData = useMemo(() => {
    return data?.map((item) => {
      const { lead_source, updatedAt, ...rest } = item;
      const processedItem = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, value || 'N/A'])
      );
      return {
        ...processedItem,
        lead_source,
        action: (
          <div className="flex">
            <img
              className="cursor-pointer mr-2"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/phone.png`}
            />
            <img
              className="cursor-pointer"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/email.png`}
            />
          </div>
        ),
        updatedAt: moment(updatedAt).format('DD/MM/YYYY'),
        view: (
          <img
            className="cursor-pointer ml-1"
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/detail.png`}
          />
        ),
      };
    });
  }, [data]);

  const onPageChange = (event: PaginationState) => {
    setPagination((prev) => ({
      ...prev,
      first: event.first,
      rows: event.rows,
      page: Math.floor(event.first / event.rows), // Calculating page number
    }));
  };

  const onRowsPerPageChange = (event) => {
    setPagination((prev) => ({
      ...prev,
      first: event.first,
      rows: event.rows,
      page: 1,
    }));
  };

  useEffect(() => {
    if (handleApiCall)
      handleApiCall(
        pagination.page == 0 ? 1 : pagination.page,
        pagination.rows
      );
    if (pagination.page == 0) {
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    }
  }, [pagination]);

  return (
    <div className="table-wrapper">
      <h1 className="text-[22px] font-outfit font-bold leading-[24px] w-full bg-white mb-4 p-4">
        {title}
      </h1>
      <div className="table-container">
        <DataTable
          lazy
          emptyMessage={<EmptyData />}
          scrollable
          scrollHeight="300px"
          value={processedData}
          paginator
          rows={pagination.rows}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '100%' }} // Adjusted to fit within the container
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate={`${pagination.page} to ${pagination.page * pagination.rows + 1} of ${totalRecords}`}
          loading={loading}
          paginatorRight={paginatorLeft}
          totalRecords={totalRecords}
          first={pagination.page * pagination.rows}
          onChange={onPageChange}
          onPage={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        >
          <Column
            header={
              <input
                type="checkbox"
                className="border-gray-600 border-[1px]"
                onChange={() => {
                  /* Handle checkbox change */
                }}
              />
            }
            // access data using rowData
            body={() => (
              <input type="checkbox" className="border-gray-600 border-[1px]" />
            )} // Adjust body if you need per-row checkboxes
          />

          {labels.map((label: LabelsInterface, index: number) => {
            return (
              <Column
                key={index}
                field={label.label ?? 'N/A'}
                header={label.header}
                sortable={label.sortable}
                className="max-w-[200px] min-w-[200px] w-auto"
              />
            );
          })}
        </DataTable>
      </div>
    </div>
  );
}
