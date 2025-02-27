export const saveSession = (user: any) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getSession = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearSession = () => {
  sessionStorage.removeItem("user");
};
