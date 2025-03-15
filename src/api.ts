import axios from "axios";

const API_BASE_URL = "https://globetrotter-oxle.onrender.com"; // Replace with your backend URL

export const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/users/register`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getRandomDestination = async () => {
  const response = await axios.get(`${API_BASE_URL}/destinations/hints`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const submitGuess = async (guess: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/game/guess`,
    { guess },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const getUserProfile = async (userId?: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/users${
      userId ? `?${new URLSearchParams({ userId }).toString()}` : "/me"
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
