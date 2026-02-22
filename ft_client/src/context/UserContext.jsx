import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  //   const [product, setProduct] = useState({});

  //   const function1 = () => {
  //     alert("HERE I AM");
  //   };

  //   const function2 = () => {
  //     alert("HERE I AM 2");
  //   };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
