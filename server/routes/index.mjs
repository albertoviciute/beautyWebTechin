import express from 'express';
import usersRouter from './users.mjs';
import proceduresRouter from './procedures.mjs';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/procedures', proceduresRouter);

export default router;
