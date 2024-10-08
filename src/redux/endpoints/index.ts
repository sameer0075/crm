const AuthEndpoints = {
  loginUser: () => `/auth/login`,
  usersList: () => '/users',
};

const LeadEndpoints = {
  leadsList: (type: string) => `/records/list/${type}`,
  opportunityList: (type: string) => `/records/visible/${type}`,
  leadDetails: (id: string) => `/records/get/${id}`,
  bulkUpload: () => `/records/bulk-upload`,
};

const ActivityLogs = {
  logsList: (id: string, type?: string) => `/logs/${id}?type=${type ?? ''}`,
  sendMail: (id: string) => `/logs/send-mail/${id}`,
};

const CommentsEndpoints = {
  commentsList: (id: string) => `/comments/list/${id}`,
  addComment: () => `/comments/add`,
};

const DashboardEndpoints = {
  dashboardReport: () => `/dashboard`,
};

const StatusEndpoints = {
  statusList: (id: string) => `/status/list/${id}`,
};

export {
  AuthEndpoints,
  LeadEndpoints,
  ActivityLogs,
  CommentsEndpoints,
  StatusEndpoints,
  DashboardEndpoints,
};
