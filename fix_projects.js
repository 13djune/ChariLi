const fs = require('fs');

let code = fs.readFileSync('src/pages/Projects.js', 'utf8');

// Use a simple regex to replace the media block.
// Each block looks like:
// media: [
//   { type: 'image', src: ASSETS.Gazpachuelo_0 }, ...
// ],

const replacements = [
  { title: 'Gazpachuelo', key: 'Gazpachuelo' },
  { title: 'DURA', key: 'DURA' },
  { title: 'Locurote', key: 'Locurote' },
  { title: 'Química-Averzzo + DeKé Magazine', key: 'Química-Averzzo + DeKé Magazine' },
  { title: 'Nave Oliva', key: 'Nave Oliva' },
  { title: 'LA CORRIENTE (Making Of)', key: 'LA CORRIENTE (Making Of)' },
  { title: 'Funked Up', key: 'Funked Up' },
  { title: 'Randall Boggs', key: 'Randall Boggs' },
];

for (const r of replacements) {
  const mediaRegex = new RegExp(`title:\\s*'${r.title.replace(/[+()]/g, '\\$&')}',\\s*year:[\\s\\S]*?media:\\s*\\[[\\s\\S]*?\\],`, 'g');
  
  code = code.replace(mediaRegex, (match) => {
    return match.replace(/media:\s*\[[\s\S]*?\],/, `media: ASSETS.PROJECTS['${r.key}'].map(src => ({ type: 'image', src })),`);
  });
}

// For the commented ones (BenidormFest, Escapar, 2 + 2) we can leave them as is since they just have ASSETS.Gazpachuelo_0 and are commented out.
fs.writeFileSync('src/pages/Projects.js', code);
console.log('Fixed Projects.js');
