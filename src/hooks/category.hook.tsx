import React, { createContext, useContext, useState } from "react";
import { CategoryService } from "../services";
import { ISearchQuery } from "../models/Common/SearchQuery";
import { toast } from "react-toastify";
import { IPagination } from "../models/Common/Pagination";
import { ICategory, ICategorySearch } from "../models/Category";
import { AxiosError } from "axios";

type CategoryContextData = {
  handleGetCategories: (data: ICategorySearch) => void;
  handleGetSubCategories: (data: ICategorySearch) => void;
  isLoading: boolean;
  categories?: ICategory[];
  subCategories?: ICategory[];
  queryOptions: ISearchQuery;
  setQueryOptions: React.Dispatch<React.SetStateAction<ISearchQuery>>;
};

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData
);

export const CategoryProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<IPagination<ICategory[]>>({
    data: [],
    total: 0,
  });
  const [subCategories, setSubCategories] = useState<IPagination<ICategory[]>>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryOptions, setQueryOptions] = useState<ISearchQuery>({
    page: 1,
    take: 9
  });

  const handleGetCategories = async (data: ICategorySearch) => {
    try {
      setIsLoading(true);
      const response = await CategoryService.getCategories(data);
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Ocorreu um problema ao requisitar dados do servidor!");
    }
  };

  const handleGetSubCategories = async (data: ICategorySearch) => {
    try {
      setIsLoading(true);
      const response = await CategoryService.getCategories(data);
      setSubCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      const err = error as AxiosError;
      if (err.response?.status === 404) {
        return toast.error("Categoria não encontrada!");
      }
      toast.error("Ocorreu um problema ao requisitar dados do servidor!");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        handleGetCategories,
        handleGetSubCategories,
        categories: categories.data,
        subCategories: subCategories.data,
        isLoading,
        queryOptions,
        setQueryOptions,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory(): CategoryContextData {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useStream must be used within an AuthProvider");
  }
  return context;
}
