import React, { createContext, useContext, useState } from 'react';

// יצירת ה-Context
const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
