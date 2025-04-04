import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getGameHistory,
  updateGameHistory,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

// Protected routes (require authentication)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Game history routes
router.route('/profile/history')
  .get(protect, getGameHistory) // GET to retrieve history
  .post(protect, updateGameHistory); // POST to add new history entries

export default router;