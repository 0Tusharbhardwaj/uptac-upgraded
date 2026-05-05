import mongoose from 'mongoose';

const collegeCutoffSchema = new mongoose.Schema({
  srNo: { type: Number },
  round: { type: String, index: true },
  institute: { type: String, index: true },
  program: { type: String, index: true },
  stream: { type: String },
  quota: { type: String },
  category: { type: String },
  seatGender: { type: String },
  openingRank: { type: Number },
  closingRank: { type: Number },
});

// Compound index for quick comparison chart lookups
collegeCutoffSchema.index({ institute: 1, program: 1 });

export default mongoose.model('CollegeCutoff', collegeCutoffSchema);
