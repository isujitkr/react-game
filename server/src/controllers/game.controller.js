import Score from "../models/score.model.js";

export const submitScore = async (req, res) => {
  const { userId, score } = req.body;

  try {
    let scoreRecord = await Score.findOne({ userId });

    if (scoreRecord) {
      scoreRecord.highScore = Math.max(scoreRecord.highScore, score);
      scoreRecord.pastScores.push(score); 
      await scoreRecord.save();
    } else {
      scoreRecord = new Score({ userId, highScore: score, pastScores: [score] });
      await scoreRecord.save();
    }

    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating score', error });
  }
};

export const getHighScore = async (req, res) => {
  const { userId } = req.params;

  try {
    const userScore = await Score.findOne({ userId });

    if (!userScore) {
      return res.status(200).json({ highScore: 0,
        pastScores: 0, });
    }

    res.status(200).json({
      highScore: userScore.highScore,
      pastScores: userScore.pastScores,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching high score', error });
  }
};
