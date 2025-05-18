import express from 'express';
import { getUserId } from '../controllers/getAllUserId.controller.js';
import { createUser } from '../controllers/createUser.controller.js';

const router = express.Router();

router.get('/getAllUserId', getUserId);
router.post('/createUser', createUser);

export default router;
