import { streams } from '../mocks/Streams';
import { ISearchQuery } from '../models/Common/SearchQuery';
import { IStream } from '../models/Stream';

import api from './api';

const StreamService = {
  getStreams(data: ISearchQuery): IStream[] {
    return streams;
  },
};

export default StreamService;