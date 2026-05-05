import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import CollegeCutoff from './models/CollegeCutoff';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uptac-orcr';

async function migrateData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const dataPath = path.resolve(__dirname, '../../public/uptac_orcr_full.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const cutoffs = JSON.parse(rawData);

    console.log(`Loaded ${cutoffs.length} records. Clearing existing collection...`);
    await CollegeCutoff.deleteMany({});
    
    console.log('Transforming and inserting records...');
    const formattedData = cutoffs.map((item: any) => ({
      srNo: item['Sr. No'],
      round: item['Round'],
      institute: item['Institute'],
      program: item['Program'],
      stream: item['Stream'],
      quota: item['Quota'],
      category: item['Category'],
      seatGender: item['Seat Gender'],
      openingRank: item['Opening Rank'],
      closingRank: item['Closing Rank']
    }));

    // Insert in batches to avoid memory issues with huge arrays
    const BATCH_SIZE = 5000;
    for (let i = 0; i < formattedData.length; i += BATCH_SIZE) {
      const batch = formattedData.slice(i, i + BATCH_SIZE);
      await CollegeCutoff.insertMany(batch);
      console.log(`Inserted ${i + batch.length} / ${formattedData.length}`);
    }

    console.log('Migration complete.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
