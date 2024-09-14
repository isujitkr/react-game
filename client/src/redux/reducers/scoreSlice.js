import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  highScore: 0,
  pastScores: [],
  loading: false,
  error: null,
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    fetchScoresStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchScoresSuccess: (state, action) => {
      state.loading = false;
      state.highScore = action.payload.highScore;
      state.pastScores = action.payload.pastScores;
      state.error = null; 
    },
    fetchScoresFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateScore: (state, action) => {
      state.highScore = action.payload.highScore;
      state.pastScores = [...state.pastScores, action.payload.newScore];
    },
  },
});

export const { fetchScoresStart, fetchScoresSuccess, fetchScoresFailure, updateScore } = scoreSlice.actions;
export default scoreSlice.reducer;