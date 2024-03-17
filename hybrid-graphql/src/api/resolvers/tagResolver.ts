import {GraphQLError} from 'graphql';
import {MyContext} from '../../local-types';
import {
  deleteTag,
  fetchAllTags,
  fetchTagsByMediaId,
  postTag,
  deleteTagFromMedia,
} from '../models/tagModel';

export default {
  MediaItem: {
    tags: async (parent: {media_id: string}) => {
      return await fetchTagsByMediaId(Number(parent.media_id));
    },
  },
  Query: {
    tags: async () => {
      return await fetchAllTags();
    },
  },
  Mutation: {
    deleteTag: async (
      _parent: undefined,
      args: {input: string},
      context: MyContext,
    ) => {
      if (!context.user || context.user.level_name !== 'Admin') {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await deleteTag(Number(args.input));
    },
    createTag: async (
      _parent: undefined,
      args: {input: {tag_name: string; media_id: string}},
    ) => {
      const {tag_name, media_id} = args.input;

      const formattedTagName =
        tag_name.charAt(0).toUpperCase() + tag_name.slice(1).toLowerCase();

      return await postTag(formattedTagName, Number(media_id));
    },
    deleteTagFromMediaItem: async (
      _parent: undefined,
      args: {input: {tag_id: string; media_id: string}},
      context: MyContext,
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      return await deleteTagFromMedia(
        Number(args.input.tag_id),
        Number(args.input.media_id),
        Number(context.user.user_id),
      );
    },
  },
};
