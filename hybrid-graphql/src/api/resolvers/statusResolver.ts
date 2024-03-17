import {GraphQLError} from 'graphql';
import {MyContext} from '../../local-types';
import {
  fetchAllStatuses,
  fetchStatusByMediaId,
  createStatus,
  updateMediaItemStatus,
} from '../models/statusModel';

export default {
  MediaItem: {
    status: async (parent: {media_id: number}) => {
      return await fetchStatusByMediaId(parent.media_id);
    },
  },
  Query: {
    statuses: async () => {
      return await fetchAllStatuses();
    },
  },
  Mutation: {
    createStatus: async (
      _parent: undefined,
      args: {status_name: string},
      context: MyContext,
    ) => {
      if (!context.user || context.user.level_name !== 'Admin') {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await createStatus(args.status_name);
    },
    updateMediaItemStatus: async (
      _parent: undefined,
      args: {media_id: number; status_id: number},
      context: MyContext,
    ) => {
      if (!context.user) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await updateMediaItemStatus(args.media_id, args.status_id);
    },
  },
};
