import express from 'express';
import {mediaByStatus, statusListGet} from '../controllers/statusController';

import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(statusListGet);

router.route('/:status').get(mediaByStatus);

export default router;
