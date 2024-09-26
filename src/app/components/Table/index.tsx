'use client';
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
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

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const onSort = (event) => {
    setSortField(event.sortField);
    setSortOrder(event.sortOrder);
  };

  const paginatorLeft = (
    <Button
      type="button"
      className="paginator-left"
      icon="pi pi-refresh"
      text
    />
  );

  const processedData = useMemo(() => {
    const payload = data ? [...data] : [];
    const sortedData = payload.sort((a, b) => {
      if (!sortField) return 0; // No sorting applied
      const valueA = a[sortField] || ''; // Ensure undefined or null values are handled
      const valueB = b[sortField] || '';

      let comparison = 0;
      if (valueA < valueB) {
        comparison = -1;
      } else if (valueA > valueB) {
        comparison = 1;
      }
      return sortOrder === 1 ? comparison : -comparison;
    });

    return sortedData?.map((item) => {
      const { lead_source, updatedAt, ...rest } = item;
      const processedItem = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, value || 'N/A'])
      );
      return {
        ...processedItem,
        lead_source,
        updatedAt: moment(updatedAt).format('DD/MM/YYYY'),
        view: (
          <div className="cursor-pointer ml-1 w-[50px]">
            <Link href={`/details?id=${rest.id}`} prefetch={true}>
              <img
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/detail.png`}
              />
            </Link>
          </div>
        ),
      };
    });
  }, [data, sortField, sortOrder]);

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
          onSort={onSort}
          sortField={sortField}
          sortOrder={sortOrder}
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
                field={label?.label ?? 'N/A'}
                header={label.header}
                sortable={label.sortable}
                className="max-w-[auto] min-w-[auto] w-[200px]"
                // className="max-w-[200px] min-w-[200px] w-auto"
              />
            );
          })}
        </DataTable>
      </div>
    </div>
  );
}
