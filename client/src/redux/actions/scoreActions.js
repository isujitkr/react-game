import { fetchScoresStart, fetchScoresSuccess, fetchScoresFailure, updateScore } from './scoreSlice';
import API from '../../api/api';

export const fetchUserScores = (userId) => async (dispatch) => {
  try {
    dispatch(fetchScoresStart());
    const response = await API.get(`/game/highscore/${userId}`);
    const scores = response.data;
    dispatch(fetchScoresSuccess(scores));
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Network error';
    dispatch(fetchScoresFailure(errorMessage));
  }
};

export const updateUserScore = (userId, highScore, newScore) => async (dispatch) => {
  try {
    const response = await API.put(`/game/highscore/${userId}`, { highScore, newScore });
    dispatch(updateScore({ highScore, newScore }));
  } catch (error) {
    console.error('Error updating score:', error);
  }
};