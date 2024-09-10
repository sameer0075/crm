const AuthEndpoints = {
  loginUser: () => `/auth/login`,
};

const LeadEndpoints = {
  leadsList: (type: string) => `/records/list/${type}`,
};

export { AuthEndpoints, LeadEndpoints };
