import { AxiosPromise } from "axios";
import { IPagination } from "../models/Common/Pagination";
import { ISearchQuery } from "../models/Common/SearchQuery";
import { IEditStreamDTO, IStream } from "../models/Stream";

import api from "./api";

const StreamService = {
  getStreams(data: ISearchQuery): AxiosPromise<IPagination<IStream[]>> {
    return api.get("/stream/find", { params: data });
  },

  getOneStream(stream_host: string): AxiosPromise<IStream> {
    return api.get("/stream/find-one", { params: { stream_host } });
  },

  editStream(data: IEditStreamDTO): AxiosPromise<IStream> {
    return api.put("/stream/edit", data);
  },
};

export default StreamService;
