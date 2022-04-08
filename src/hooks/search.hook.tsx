import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamService } from "../services";
import { ISearchQuery } from "../models/Common/SearchQuery";
import { IStream } from "../models/Stream";
import { toast } from "react-toastify";


type StreamContextData = {
  streams?: IStream[];
  queryOptions: ISearchQuery;
  setQueryOptions: React.Dispatch<React.SetStateAction<ISearchQuery>>;
  handleGetStreams: (data: ISearchQuery) => void;
};

const StreamContext = createContext<StreamContextData>({} as StreamContextData);

export const StreamProvider: React.FC = ({ children }) => {

  const [streams, setStreams] = useState<IStream[]>();
  const [queryOptions, setQueryOptions] = useState<ISearchQuery>({
    page: 1,
  });

  const handleGetStreams = async ({perpage = 9, ...rest}: ISearchQuery) => {
    try {
      const response = await StreamService.getStreams({perpage, ...rest});
      setStreams(response);
    } catch (error) {
      toast.error("Ocorreu um problema ao requisitar dados do servidor!");
    }
  };

  useEffect(() => {
    handleGetStreams({
      search_filter: queryOptions.search_filter,
      page: queryOptions.page,
      perpage: queryOptions.perpage
    });
  }, [queryOptions]);

  return (
    <StreamContext.Provider
      value={{
        handleGetStreams,
        queryOptions,
        setQueryOptions,
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
