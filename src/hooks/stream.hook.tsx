import React, { createContext, useContext, useState } from "react";

type StreamContextData = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const StreamContext = createContext<StreamContextData>({} as StreamContextData);

export const StreamProvider: React.FC = ({ children }) => {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <StreamContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};

export function useStream(): StreamContextData {
  const context = useContext(StreamContext);

  if (!context) {
    throw new Error("useStream must be used within an AuthProvider");
  }
  return context;
}
