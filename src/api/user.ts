const API_URL = import.meta.env.REACT_APP_API_URL; // Load API URL from environment variables

export const isUserExist = async (id) => {
  try {
    const response = await fetch(`${API_URL}/user/checkExist/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (id, name, avatar) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, avatar }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
