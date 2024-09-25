const AuthEndpoints = {
  loginUser: () => `/auth/login`,
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

const StatusEndpoints = {
  statusList: () => `/status/list`,
};

export {
  AuthEndpoints,
  LeadEndpoints,
  ActivityLogs,
  CommentsEndpoints,
  StatusEndpoints,
};
