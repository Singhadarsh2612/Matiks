import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    gameHistory: [], // ✅ Initialize game history for new users
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// ------------------------------------------------------------------
// New Functionality for Game History

// @desc    Get user's game history
// @route   GET /api/users/history
// @access  Private
const getGameHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('gameHistory');
  
  if (user) {
    // Add game numbers and format dates for better client-side display
    const formattedHistory = user.gameHistory.map((game, index) => ({
      gameNo: index + 1,
      opponent: game.opponent,
      result: game.result,
      playedAt: game.playedAt || game.timestamp, // Handle both field names
      _id: game._id
    }));
    
    res.json({
      success: true,
      count: formattedHistory.length,
      history: formattedHistory
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user's game history after a game
// @route   POST /api/users/profile/history
// @access  Private
// @desc    Update user's game history after a game
// @route   POST /api/users/profile/history
// @access  Private
const updateGameHistory = asyncHandler(async (req, res) => {
  const { opponent, userResult } = req.body; // Changed from 'result' to 'userResult'
  
  if (!opponent || !userResult) {
    res.status(400);
    throw new Error('Please provide opponent and userResult');
  }

  const user = await User.findById(req.user._id);
  if (user) {
    const gameRecord = {
      opponent,
      result: userResult, // Now stores the user's actual result (WIN/LOSS)
      playedAt: new Date(),
      _id: new mongoose.Types.ObjectId()
    };

    user.gameHistory.unshift(gameRecord); // Fixes ordering simultaneously
    await user.save();

    res.status(201).json({
      success: true,
      gameRecord
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// ------------------------------------------------------------------

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getGameHistory,
  updateGameHistory,
};
