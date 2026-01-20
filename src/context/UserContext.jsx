import { useState, createContext } from "react";

export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  //function to update user data
  const updateUser = (user) => {
    setUser(user);
  };
  //function to clean the user data
  const cleanUser = () => {
    setUser(null);
  };

  return (
    <userContext.Provider value={{ user, updateUser, cleanUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
