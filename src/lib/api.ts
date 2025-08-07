import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  } catch (error: unknown) {
    console.error("Login API error:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login failed");
    }
    throw new Error("Login failed");
  }
};

export const getPublicData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error: unknown) {
    console.error("Get Public Data API error:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to fetch public data");
    }
    throw new Error("Failed to fetch public data");
  }
};

export const getAdminData = async (endpoint: string, token: string) => {
  if (!token) {
    throw new Error("No auth token provided");
  }
  try {
    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Get Admin Data API error:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Failed to fetch admin data");
    }
    throw new Error("Failed to fetch admin data");
  }
};

export const registerUser = async (userData: unknown) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error: unknown) {
    console.error("Register API error:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Registration failed");
    }
    throw new Error("Registration failed");
  }
};

export const postData = async (endpoint: string, data: unknown, token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
