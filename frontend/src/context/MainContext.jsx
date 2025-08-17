import { createContext, useState } from "react";

const MainContext = createContext({});

export const MainProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;