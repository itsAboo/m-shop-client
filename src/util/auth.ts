export const saveToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  if (!localStorage.getItem("token")) {
    return false;
  }
  return JSON.parse(localStorage.getItem("token") as string) as string;
};

export const removeToken = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
  return;
};
