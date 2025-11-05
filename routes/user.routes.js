import express from 'express';
import { getUsers, updateUserRole } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/authorize.middleware.js';

const router = express.Router();

// All routes in this file are admin-only
router.use(protect, authorize(['Admin']));

router.route('/')
  .get(getUsers);

router.route('/:id/role')
  .put(updateUserRole);

export default router;