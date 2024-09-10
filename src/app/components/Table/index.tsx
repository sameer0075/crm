'use client';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './table.css';

interface TableInterface {
  labels: LabelsInterface[];
  data: T[];
  title: string;
  rows?: number;
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
  rows = 5,
}: TableInterface) {
  const paginatorLeft = (
    <Button
      type="button"
      className="paginator-left"
      icon="pi pi-refresh"
      text
    />
  );

  return (
    <div className="table-wrapper">
      <h1 className="text-[22px] font-outfit font-bold leading-[24px] w-full bg-white mb-4 p-4">
        {title}
      </h1>
      <div className="table-container">
        <DataTable
          emptyMessage={<EmptyData />}
          scrollable
          scrollHeight="300px"
          value={data}
          paginator
          rows={rows}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '100%' }} // Adjusted to fit within the container
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorRight={paginatorLeft}
        >
          {labels.map((label: LabelsInterface, index: number) => (
            <Column
              key={index}
              field={label.label}
              header={label.header}
              sortable={label.sortable}
              style={{ width: 'auto' }}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
}
