import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  savedChoices: [
    {
      id: { type: String }, // Can be the stringified _id of CollegeCutoff or a custom generated ID
      institute: { type: String },
      program: { type: String },
      round: { type: String },
      category: { type: String },
      closingRank: { type: Number },
    }
  ]
});

export default mongoose.model('User', userSchema);
