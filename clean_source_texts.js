import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/FullLevelsData.js');
let content = fs.readFileSync(filePath, 'utf-8');

const fillerSentences = [
  "Las luces de neón parpadeaban sin cesar en la noche oscura.",
  "Los faros del vehículo iluminaron por un instante el callejón.",
  "Un perro ladró a lo lejos rompiendo el silencio.",
  "Se escuchó un crujido proveniente del viejo muelle de madera.",
  "El informe de las 04:00 AM no mostraba novedades inusuales.",
  "La sombra de un extraño se proyectó brevemente en la pared.",
  "Había colillas de cigarrillos esparcidas cerca de la entrada.",
  "El conserje dormitaba en su silla sin prestar atención.",
  "Las cortinas de la habitación 202 estaban completamente cerradas.",
  "El ruido sordo de un motor diesel provenía de los almacenes.",
  "Un papel arrugado yacía junto al bote de basura."
];

fillerSentences.forEach(sentence => {
  // Try to remove with newline before it
  let regex1 = new RegExp('\\\\n\\\\n' + sentence, 'g');
  content = content.replace(regex1, '');
  
  // Try to remove with newline after it
  let regex2 = new RegExp(sentence + '\\\\n\\\\n', 'g');
  content = content.replace(regex2, '');
  
  // Try to remove with just one newline
  let regex3 = new RegExp('\\\\n' + sentence, 'g');
  content = content.replace(regex3, '');

  let regex4 = new RegExp(sentence + '\\\\n', 'g');
  content = content.replace(regex4, '');

  // Finally just replace the exact sentence
  content = content.replace(new RegExp(sentence, 'g'), '');
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Cleaned filler sentences from sourceText.");
