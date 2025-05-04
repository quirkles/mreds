import mongoose from 'mongoose';

export const matchMatch = (teamId: string, seasonId: string) => ({
  $match: {
    teamId: new mongoose.Types.ObjectId(teamId),
    seasonId: new mongoose.Types.ObjectId(seasonId),
  },
});
