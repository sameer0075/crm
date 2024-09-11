const AuthEndpoints = {
  loginUser: () => `/auth/login`,
};

const LeadEndpoints = {
  leadsList: (type: string) => `/records/list/${type}`,
  bulkUpload: () => `/records/bulk-upload`,
};

export { AuthEndpoints, LeadEndpoints };
