const AuthEndpoints = {
  loginUser: () => `/auth/login`,
};

const LeadEndpoints = {
  leadsList: (type: string) => `/records/list/${type}`,
  leadDetails: (id: string) => `/records/get/${id}`,
  bulkUpload: () => `/records/bulk-upload`,
};

export { AuthEndpoints, LeadEndpoints };
