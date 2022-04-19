import { AxiosPromise } from "axios";
import { ICategory, ICategorySearch } from "../models/Category";
import { IPagination } from "../models/Common/Pagination";

import api from "./api";

const CategoryService = {
  getCategories(data: ICategorySearch): AxiosPromise<IPagination<ICategory[]>> {
    return api.get("/category/find", { params: data });
  },

  getSelectableCategories(): AxiosPromise<IPagination<ICategory[]>> {
    return api.get("/category/selectable");
  },

  getOneCategory(name: string): AxiosPromise<ICategory> {
    return api.get("/category/find-one", { params: { name } });
  },
};

export default CategoryService;
