import { execSync } from 'child_process';
import fs from 'fs';

// Number of days to go back to restore the streak
const DAYS_BACK = 100;
const DUMMY_FILE = 'streak_restorer.txt';

console.log('Starting streak restoration...');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function runCommand(command, env) {
  try {
    execSync(command, { stdio: 'ignore', env: { ...process.env, ...env } });
  } catch (e) {
    console.error('Command failed:', command);
  }
}

for (let i = DAYS_BACK; i >= 0; i--) {
  const numCommits = randomInt(2, 5); // 2 to 5 commits per day for "max contribution" effect

  for (let j = 0; j < numCommits; j++) {
    // Generate date: Subtract 'i' days from today, and add random hours to spread them out
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(randomInt(9, 22), randomInt(0, 59), randomInt(0, 59));
    
    const dateString = date.toISOString();

    // Write to dummy file to create a diff
    fs.writeFileSync(DUMMY_FILE, `Streak restored on ${dateString} - commit ${j}\n`);

    runCommand('git add ' + DUMMY_FILE);

    // Make the commit with historical dates
    runCommand(`git commit -m "chore: Restore contribution streak ${i}-${j}"`, {
      GIT_AUTHOR_DATE: dateString,
      GIT_COMMITTER_DATE: dateString,
    });
  }
}

// Clean up the dummy file at the end
if (fs.existsSync(DUMMY_FILE)) {
  fs.unlinkSync(DUMMY_FILE);
  runCommand('git add ' + DUMMY_FILE);
  runCommand('git commit -m "chore: Clean up streak restorer file"');
}

console.log('Streak restoration complete! You can now push your repository.');
