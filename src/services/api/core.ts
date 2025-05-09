export const handleApiError = (error: any) => {
  console.error("API Error:", error);
  throw error;
};

export const getAuthOptions = (token: string, options: RequestInit = {}) => {
  return {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
