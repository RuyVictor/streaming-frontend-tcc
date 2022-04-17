import { AxiosPromise } from 'axios';
import { IPagination } from '../models/Common/Pagination';
import { ISearchQuery } from '../models/Common/SearchQuery';
import { IStream } from '../models/Stream';

import api from './api';

const StreamService = {
  getStreams(data: ISearchQuery): AxiosPromise<IPagination<IStream[]>> {
    return api.get("/stream/find", { params: data });
  },
};

export default StreamService;