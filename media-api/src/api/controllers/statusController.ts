import {Request, Response, NextFunction} from 'express';

import {fetchAllStatus, fetchMediaByStatus} from '../models/statusModel';

import CustomError from '../../classes/CustomError';
import {MessageResponse} from '@sharedTypes/MessageTypes';
import {MediaItemStatusResult} from '@sharedTypes/DBTypes';

// list of status
const statusListGet = async (
  req: Request,
  res: Response<MediaItemStatusResult[]>,
  next: NextFunction
) => {
  try {
    const status = await fetchAllStatus();
    if (status === null) {
      const error = new CustomError('No status found', 404);
      next(error);
      return;
    }
    res.json(status);
  } catch (error) {
    next(error);
  }
};

// list of media items by status
const mediaByStatus = async (
  req: Request<{status: string}>,
  res: Response<MediaItemStatusResult[]>,
  next: NextFunction
) => {
  try {
    const media = await fetchMediaByStatus(req.params.status);
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

export {statusListGet, mediaByStatus};
