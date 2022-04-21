import React, { createContext, useContext, useState } from "react";
import { StreamService } from "../services";
import { IStreamSearch } from "../models/Stream";
import { IStream } from "../models/Stream";
import { toast } from "react-toastify";
import { IPagination } from "../models/Common/Pagination";


type StreamContextData = {
  streams?: IPagination<IStream[]>;
  setStreams: React.Dispatch<React.SetStateAction<IPagination<IStream[]>>>;
  queryOptions: IStreamSearch;
  isLoading: boolean;
  setQueryOptions: React.Dispatch<React.SetStateAction<IStreamSearch>>;
  handleGetStreams: (data: IStreamSearch) => void;
};

const StreamContext = createContext<StreamContextData>({} as StreamContextData);

export const StreamProvider: React.FC = ({ children }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streams, setStreams] = useState<IPagination<IStream[]>>({
    data: [],
    total: 0
  });
  const [queryOptions, setQueryOptions] = useState<IStreamSearch>({
    page: 1,
    take: 9
  });

  const handleGetStreams = async (data: IStreamSearch) => {
    try {
      setIsLoading(true)
      const response = await StreamService.getStreams(data);
      setStreams(response.data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error("Ocorreu um problema ao requisitar dados do servidor!");
    }
  };

  return (
    <StreamContext.Provider
      value={{
        handleGetStreams,
        queryOptions,
        isLoading,
        setQueryOptions,
        setStreams,
        streams
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
