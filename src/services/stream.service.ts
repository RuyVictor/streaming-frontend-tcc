import { AxiosPromise } from "axios";
import { IPagination } from "../models/Common/Pagination";
import { IEditStreamDTO, IStream, IStreamSearch } from "../models/Stream";

import api from "./api";

const StreamService = {
  getStreams(data: IStreamSearch): AxiosPromise<IPagination<IStream[]>> {
    return api.get("/stream/find", { params: data });
  },

  getOneStream(stream_host: string): AxiosPromise<IStream> {
    return api.get("/stream/find-one", { params: { stream_host } });
  },

  editStream(data: IEditStreamDTO): AxiosPromise<IStream> {
    return api.put("/stream/edit", data);
  },

  getTransmissionKey(): AxiosPromise<{ transmission_key: string }> {
    return api.get("/stream/transmission-key");
  },
};

export default StreamService;
