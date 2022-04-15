import React, { createContext, useContext, useEffect, useState } from "react";
import { CategoryService } from "../services";
import { ISearchQuery } from "../models/Common/SearchQuery";
import { toast } from "react-toastify";
import { IPagination } from "../models/Common/Pagination";
import { ICategory, ICategorySearch } from "../models/Category";


type CategoryContextData = {
  handleGetCategories: (data: ICategorySearch) => void;
  handleGetSubCategories: (data: ICategorySearch) => void;
  isLoading: boolean;
  categories?: ICategory[];
  subCategories?: ICategory[];
  queryOptions: ICategorySearch;
  setQueryOptions: React.Dispatch<React.SetStateAction<ISearchQuery>>;
};

const CategoryContext = createContext<CategoryContextData>({} as CategoryContextData);

export const CategoryProvider: React.FC = ({ children }) => {

  const [categories, setCategories] = useState<IPagination<ICategory[]>>({
    data: [],
    total: 0
  });
  const [subCategories, setSubCategories] = useState<IPagination<ICategory[]>>({
    data: [],
    total: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryOptions, setQueryOptions] = useState<ISearchQuery>({
    page: 1,
  });

  const handleGetCategories = async ({take = 9, ...rest}: ICategorySearch) => {
    try {
      setIsLoading(true)
      const response = await CategoryService.getCategories({take, ...rest});
      setCategories(response.data);
      setIsLoading(false)
    } catch (error) {
      toast.error("Ocorreu um problema ao requisitar dados do servidor!");
    }
  };

  const handleGetSubCategories = async ({take = 9, ...rest}: ICategorySearch) => {
    try {
      setIsLoading(true)
      const response = await CategoryService.getCategories({take, ...rest});
      setSubCategories(response.data);
      setIsLoading(false)
    } catch (error) {
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
