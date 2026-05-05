import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import CollegeCutoff from './models/CollegeCutoff';
import User from './models/User';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uptac-orcr';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- College Routes ---

app.get('/api/colleges', async (req, res) => {
  try {
    const { category, quota, round, rank, search } = req.query;
    let filter: any = {};

    if (category) filter.category = category;
    if (quota) filter.quota = quota;
    if (round) filter.round = round;
    if (rank) {
      filter.closingRank = { $gte: Number(rank) }; // Very simple filter, maybe needs adjust logic based on old frontend.
    }
    if (search) {
      filter.institute = { $regex: search as string, $options: 'i' };
    }

    // Limit to 100 for performance
    const colleges = await CollegeCutoff.find(filter).limit(100).lean();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

app.get('/api/colleges/compare', async (req, res) => {
  try {
    const { institute, round, category } = req.query;
    if (!institute) return res.status(400).json({ error: 'Institute is required' });

    let filter: any = { institute };
    if (round) filter.round = round;
    if (category) filter.category = category;

    const data = await CollegeCutoff.find(filter).lean();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comparison data' });
  }
});

// --- User & Counseling Routes ---

app.get('/api/users/:username', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      user = await User.create({ username: req.params.username, savedChoices: [] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users/:username/choices', async (req, res) => {
  try {
    const { choices } = req.body;
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { savedChoices: choices },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update choices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
