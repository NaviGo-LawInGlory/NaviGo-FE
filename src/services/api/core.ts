export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.navigo.com";

export const handleApiError = (error: any) => {
  console.error("API Error:", error);

  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

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

