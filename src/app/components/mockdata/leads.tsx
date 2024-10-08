import { ReactNode } from 'react';

interface LeadIterface {
  fullName: string;
  title: string;
  company: string;
  website: string;
  industry: string;
  lead_source: string;
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
  { label: 'updatedAt', header: 'Last Updated', sortable: false },
  {
    label: 'view',
    header: (
      <div>
        <img
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/options.png`}
        />
      </div>
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
