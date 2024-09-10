interface LeadIterface {
  name: string;
  title: string;
  company: string;
  website: string;
  industry: string;
  lead_source: string;
  created_at: string | Date;
}

const LeadLabels = [
  { label: 'name', header: 'Name', sortable: true },
  { label: 'title', header: 'Title', sortable: true },
  { label: 'company', header: 'Company', sortable: true },
  { label: 'website', header: 'Company', sortable: true },
  { label: 'industry', header: 'Industry', sortable: true },
  { label: 'lead_source', header: 'Lead Source', sortable: true },
  { label: 'created_at', header: 'Last Updated', sortable: false },
];

const LeadMockData: LeadIterface[] = [
  {
    name: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
    created_at: '05/08/2024',
  },
  {
    name: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
    created_at: '05/08/2024',
  },
  {
    name: 'Ameer Haider',
    title: 'CEO & FOunder',
    company: 'Novatore Sols',
    website: 'novatoresols.com',
    industry: 'Sporting Goods',
    lead_source: 'Call & Email',
    created_at: '05/08/2024',
  },
];

export { LeadLabels, LeadMockData };
