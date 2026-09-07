import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/CutscenesData.js');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace('// Transición Tier 1 a Tier 2 (Completar caso 5)', '// Transición Tier 1 a Tier 2 (Completar caso 10)');
content = content.replace('sobre el vagabundo del Caso 5', 'sobre el borracho del Caso 1');
content = content.replace('// Transición Tier 2 a Tier 3 (Completar caso 10)', '// Transición Tier 2 a Tier 3 (Completar caso 20)');
content = content.replace('// Transición Tier 3 a Tier 4 (Completar caso 15)', '// Transición Tier 3 a Tier 4 (Completar caso 30)');
content = content.replace('// Transición Tier 4 a Tier 5 (Completar caso 20)', '// Transición Tier 4 a Tier 5 (Completar caso 40)');
content = content.replace('// Transición Tier 5 a Tier 6 (Completar caso 25)', '// Transición Tier 5 a Tier 6 (Completar caso 50)');
content = content.replace('// Transición Tier 6 a Tier 7 (Completar caso 30)', '// Transición Tier 6 a Tier 7 (Completar caso 60)');
content = content.replace('// Transición Tier 7 a Tier 8 (Completar caso 35)', '// Transición Tier 7 a Tier 8 (Completar caso 70)');
content = content.replace('// Transición Tier 8 a Tier 9 (Completar caso 40)', '// Transición Tier 8 a Tier 9 (Completar caso 80)');
content = content.replace('// Transición Tier 9 a Tier 10 (Completar caso 45)', '// Transición Tier 9 a Tier 10 (Completar caso 90)');
content = content.replace('// Epílogo final tras superar el Caso 50', '// Epílogo final tras superar el Caso 100');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Cutscenes fixed.');
