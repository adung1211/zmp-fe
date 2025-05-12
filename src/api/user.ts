const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

export const isUserExist = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/user/checkExist/${id}`, {
      headers: { "ngrok-skip-browser-warning": "69420" },
    });

    return !!data;
  } catch (error) {
    console.error("Error in isUserExist:", error);
    throw error;
  }
};

export const createUser = async (zid, name, avatar) => {
  try {
    await axios.post(
      `${API_URL}/user/create`,
      { zid, name, avatar },
      {
        headers: { "ngrok-skip-browser-warning": "69420" },
      }
    );
  } catch (error) {
    throw error;
  }
};
