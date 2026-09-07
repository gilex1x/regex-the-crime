import fs from 'fs';
import { ALL_LEVELS } from './src/data/FullLevelsData.js';
let out = '';
ALL_LEVELS.forEach(l => {
  out += `Level ${l.id} - ${l.title}\nDesc: ${l.description}\nType: ${l.type}\n`;
  if(l.type === 'criminal_cipher'){
    out += `Question: ${l.question}\nOptions: ${l.options.map(o=>o.text).join(' | ')}\n`;
  } else {
    out += `Task: ${l.task}\n`;
  }
  out += '---\n';
});
fs.writeFileSync('c:/Users/GILEXX/.gemini/antigravity-ide/brain/68e57dc3-dd18-42cf-8635-4fa050a51960/scratch/levels_summary.md', out);
