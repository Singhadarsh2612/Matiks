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
import User from '../models/userModel.js';
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

  router.get('/leaderboard', async (req, res) => {
    try {
      const users = await User.find();
  
      const leaderboard = users.map(user => {
        const games = user.gameHistory || [];
        const totalGames = games.length;
        const wins = games.filter(game => game.result === 'Win').length;
        const losses = games.filter(game => game.result === 'Loss').length;
  
        const winRate = totalGames === 0 ? 0 : Math.round((wins / totalGames) * 100);
        const rating = 500 + (wins * 30) - (losses * 10) + (totalGames * 2);
  
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          played: totalGames,
          wins,
          losses,
          winRate,
          rating,
        };
      });
  
      leaderboard.sort((a, b) => b.rating - a.rating); // Sort descending by rating
  
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  export default router;
  