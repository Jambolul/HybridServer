import { MediaItem } from '@sharedTypes/DBTypes';
import {fetchAllMedia, fetchMediaById, fetchMediaByTag, postMedia} from '../models/mediaModel';

export default {

  Query: {
    mediaItems: async () => {
      return await fetchAllMedia();
    },
    mediaItem: async (_parent: undefined, args: {media_id: string}) => {
      console.log(args);
      const id = Number(args.media_id);
      return await fetchMediaById(id);
    },
    mediaItemsByTag: async (_parent: undefined, args: {tag: string}) => {
      return await fetchMediaByTag(args.tag);
  },
},
Mutation: {
  createMediaItem: async (
    _parent: undefined,
    args: {input: Omit<MediaItem, 'media_id' | 'created_at' | 'thumbnail'>},
    ) => {
      return postMedia(args.input);
    }
},
};
