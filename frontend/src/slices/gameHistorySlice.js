import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch game history
export const fetchGameHistory = createAsyncThunk(
  'gameHistory/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users/profile/history', { 
        withCredentials: true 
      });
      
      // Handle both response formats:
      // 1. Direct array (your current backend)
      // 2. Structured response (from my suggested backend changes)
      return Array.isArray(data) ? data : data.history || [];
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch game history'
      );
    }
  }
);

// Slice
const gameHistorySlice = createSlice({
  name: 'gameHistory',
  initialState: { 
    history: [], 
    loading: false, 
    error: null,
    lastFetched: null 
  },
  reducers: {
    // Optional: Add a manual clear error reducer
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchGameHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = gameHistorySlice.actions;
export default gameHistorySlice.reducer;