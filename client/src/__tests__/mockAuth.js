const data = {
  userName: "Auth Tester",
  email: "authtester@gmail.com",
  password: "xyz",
  token: "xyz123",
};

export const login = () => {
  let dataFromServer = {};
  let currentUser = {};
  return {
    currentUser,
    setCurrentUser: () => ({ ...currentUser, ...dataFromServer }),
    login: () => (dataFromServer = data),
  };
};
