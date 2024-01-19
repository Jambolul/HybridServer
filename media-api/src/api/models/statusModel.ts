import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {MediaItemStatusResult} from '@sharedTypes/DBTypes';
import promisePool from '../../lib/db';
import {fetchData} from '../../lib/functions';
import {MessageResponse} from '@sharedTypes/MessageTypes';

// Request a list of Statuses
const fetchAllStatus = async (): Promise<MediaItemStatusResult[] | null> => {
  try {
    const [rows] = await promisePool.execute<
      RowDataPacket[] & MediaItemStatusResult[]
    >(
      `SELECT Status.status_id, Status.status_name, MediaItemStatus.media_id
       FROM Status
       JOIN MediaItemStatus ON Status.status_id = MediaItemStatus.status_id`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllStatus error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

// Request a list of media items by status
const fetchMediaByStatus = async (
  status: string
): Promise<MediaItemStatusResult[] | null> => {
  try {
    const [rows] = await promisePool.execute<
      RowDataPacket[] & MediaItemStatusResult[]
    >(
      `SELECT Status.status_id, Status.status_name, MediaItemStatus.media_id
       FROM Status
       JOIN MediaItemStatus ON Status.status_id = MediaItemStatus.status_id
       WHERE Status.status_name = ?`,
      [status]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchMediaBystatus error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/* // Request a list of Status by media item id
const fetchStatusByMediaId = async (
  id: number
): Promise<MediaItemStatusResult[] | null> => {
  try {
    const [rows] = await promisePool.execute<
      RowDataPacket[] & MediaItemStatusResult[]
    >(
      `SELECT Status.status_id, Status.status_name, MediaItemStatus.media_id
       FROM Status
       JOIN MediaItemStatus ON Status.status_id = MediaItemStatus.status_id
       WHERE MediaItemStatus.media_id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchStatusByMediaId error', (e as Error).message);
    throw new Error((e as Error).message);
  }
}; */

export {fetchAllStatus, fetchMediaByStatus};
