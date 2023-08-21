import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);


export const AppProvider = ({ children }) => {
  const [taskId, setTaskId] = useState("");

  const updateTaskId = ( objectId ) => {
    setTaskId(objectId.toString());
  }

  return (
    <AppContext.Provider value={{ taskId, updateTaskId }}>
      {children}
    </AppContext.Provider>
  );
};