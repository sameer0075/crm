const AuthEndpoints = {
  loginUser: () => `/auth/login`,
};

const LeadEndpoints = {
  leadsList: (type: string) => `/records/list/${type}`,
  leadDetails: (id: string) => `/records/get/${id}`,
  bulkUpload: () => `/records/bulk-upload`,
};

const ActivityLogs = {
  logsList: (id: string, type?: string) => `/logs/${id}?type=${type ?? ''}`,
};

const CommentsEndpoints = {
  commentsList: (id: string) => `/comments/list/${id}`,
  addComment: () => `/comments/add`,
};

export { AuthEndpoints, LeadEndpoints, ActivityLogs, CommentsEndpoints };
