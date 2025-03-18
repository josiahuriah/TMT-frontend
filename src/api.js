import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
fetch(`${API_BASE_URL}/cars`);

export const getCars = async () => {
  const response = await axios.get(`${API_URL}/cars`);
  return response.data;
};
