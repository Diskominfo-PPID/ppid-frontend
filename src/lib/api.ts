import axios from "axios";

// Membuat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Mengambil URL dari .env.local
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fungsi untuk login pengguna.
 * Mengirim email dan password ke endpoint /auth/login.
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @returns {Promise<any>} - Data respons dari server (termasuk token)
 */
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

/**
 * Fungsi untuk mengambil data publik.
 * @param {string} endpoint - Path endpoint (misal: '/informasi')
 * @returns {Promise<any>} - Data dari server
 */
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

/**
 * Fungsi untuk mengambil data yang memerlukan autentikasi.
 * @param {string} endpoint - Path endpoint (misal: '/permintaan')
 * @param {string} token - Token JWT pengguna
 * @returns {Promise<any>} - Data dari server
 */
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
