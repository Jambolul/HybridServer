import { MediaItem, Tag } from '@sharedTypes/DBTypes';
import {fetchAllTags, fetchTagsByMediaId, postTag} from '../models/tagModel';

export default {
  MediaItem: {
    tags: async (parent: {media_id: string}) => {
      console.log(parent);
      return await fetchTagsByMediaId(Number(parent.media_id));
    }
  },
    Query: {
        tags: async () => {
            return await fetchAllTags();
        },
    },
    Mutation: {
      createTag: async (
        _parent: undefined,
        args: {input: Omit<Tag, 'tag_id'>},
        ) => {
          return postTag(args.input);
        }
    },
};
