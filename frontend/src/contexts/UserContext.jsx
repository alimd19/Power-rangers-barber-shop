import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext({ name: "" });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "" });
  const updateUser = (actionType, payload) => {
    switch (actionType) {
      case "SET_USER":
        setUser((prev) => ({ ...prev, ...payload }));
        return;
      case "REMOVE_USER":
        setUser({ name: "" });
        return;
      default:
        return;
    }
  };
  return (
    <UserContext.Provider value={{user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
