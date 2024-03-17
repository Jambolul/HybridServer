import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from '../../lib/db';
import {Status, StatusResult} from '@sharedTypes/DBTypes';
import {MessageResponse} from '@sharedTypes/MessageTypes';

// Fetch all statuses
const fetchAllStatuses = async (): Promise<Status[] | null> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Status[]>(
      'SELECT * FROM Status',
    );
    console.log(rows); // Add this to log the output
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllStatuses error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

// Fetch status by media ID
const fetchStatusByMediaId = async (
  media_id: number,
): Promise<StatusResult | null> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & StatusResult[]>(
      `SELECT Status.status_id, Status.status_name
       FROM Status
       JOIN MediaItemStatus ON Status.status_id = MediaItemStatus.status_id
       WHERE MediaItemStatus.media_id = ?`,
      [media_id],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('fetchStatusByMediaId error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

// Create a new status
const createStatus = async (
  status_name: string,
): Promise<MessageResponse | null> => {
  try {
    const [result] = await promisePool.execute<ResultSetHeader>(
      'INSERT INTO Status (status_name) VALUES (?)',
      [status_name],
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return {message: 'Status created successfully'};
  } catch (e) {
    console.error('createStatus error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

// Update media item's status
const updateMediaItemStatus = async (
  media_id: number,
  status_id: number,
): Promise<MessageResponse | null> => {
  try {
    // Delete any existing status for the media item
    await promisePool.execute<ResultSetHeader>(
      'DELETE FROM MediaItemStatus WHERE media_id = ?',
      [media_id],
    );

    // Insert the new status for the media item
    const [result] = await promisePool.execute<ResultSetHeader>(
      'INSERT INTO MediaItemStatus (media_id, status_id) VALUES (?, ?)',
      [media_id, status_id],
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return {message: 'Media item status updated successfully'};
  } catch (e) {
    console.error('updateMediaItemStatus error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {
  fetchAllStatuses,
  fetchStatusByMediaId,
  createStatus,
  updateMediaItemStatus,
};
