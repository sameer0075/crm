import { ReactNode } from 'react';

interface LeadIterface {
  fullName: string;
  title: string;
  company: string;
  website: string;
  industry: string;
  lead_source: string;
  action: ReactNode;
  updatedAt: string | Date;
  view: ReactNode;
}

const LeadLabels = [
  { label: 'fullName', header: 'Name', sortable: true },
  { label: 'title', header: 'Title', sortable: true },
  { label: 'company', header: 'Company', sortable: true },
  { label: 'website', header: 'Website', sortable: true },
  { label: 'industry', header: 'Industry', sortable: true },
  { label: 'lead_source', header: 'Lead Source', sortable: true },
  { label: 'action', header: 'Action', sortable: false },
  { label: 'updatedAt', header: 'Last Updated', sortable: false },
  {
    label: 'view',
    header: (
      <img src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/options.png`} />
    ),
  },
];

const LeadMockData: LeadIterface[] = [
  {
    fullName: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
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
    updatedAt: '05/08/2024',
    view: (
      <img
        className="cursor-pointer"
        src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/detail.png`}
      />
    ),
  },
  {
    fullName: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
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
    updatedAt: '05/08/2024',
    view: (
      <img
        className="cursor-pointer"
        src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/detail.png`}
      />
    ),
  },
  {
    fullName: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
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
    updatedAt: '05/08/2024',
    view: (
      <img
        className="cursor-pointer"
        src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/detail.png`}
      />
    ),
  },
];

export { LeadLabels, LeadMockData };
