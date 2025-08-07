import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Login failed" }));
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
};

export const getPublicData = async (endpoint: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getAdminData = async (endpoint: string, token: string) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const createRequest = async (requestData, token) => {
  if (!token) {
    throw new Error("No auth token provided");
  }
  try {
    const response = await apiClient.post("/permintaan", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Create Request API error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to create request");
  }
};

export const registerUser = async (userData: unknown) => {
  const userDataWithRole = {
    ...(userData as object),
    role: "Pemohon",
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDataWithRole),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Registration failed" }));
    throw new Error(errorData.message || "Registration failed");
  }

  return await response.json();
};

export const postData = async (
  endpoint: string,
  data: unknown,
  token?: string
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
