interface LeadIterface {
  fullName: string;
  title: string;
  company: string;
  website: string;
  industry: string;
  lead_source: string;
  created_at: string | Date;
}

const LeadLabels = [
  { label: 'fullName', header: 'Name', sortable: true },
  { label: 'title', header: 'Title', sortable: true },
  { label: 'company', header: 'Company', sortable: true },
  { label: 'website', header: 'Website', sortable: true },
  { label: 'industry', header: 'Industry', sortable: true },
  { label: 'lead_source', header: 'Lead Source', sortable: true },
  { label: 'updatedAt', header: 'Last Updated', sortable: false },
];

const LeadMockData: LeadIterface[] = [
  {
    fullName: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
    created_at: '05/08/2024',
  },
  {
    fullName: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
    created_at: '05/08/2024',
  },
  {
    fullName: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
    created_at: '05/08/2024',
  },
];

export { LeadLabels, LeadMockData };
