const fs = require('fs');
const path = require('path');
const imgDir = path.join(__dirname, 'public/img');

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const allFiles = getFiles(imgDir).filter(f => /\.(png|jpe?g|webp|svg|gif)$/i.test(f));

let exportBody = 'export const ASSETS = {\n';

let projectGroups = {
  'Gazpachuelo': [],
  'DURA': [],
  'Locurote': [],
  'Química-Averzzo + DeKé Magazine': [],
  'Nave Oliva': [],
  'LA CORRIENTE (Making Of)': [],
  'Funked Up': [],
  'Randall Boggs': [],
};

let gallery = [];
let otherAssets = {};
let varCounter = 0;

allFiles.sort();

allFiles.forEach(file => {
  const relativePath = path.relative(path.join(__dirname, 'public'), file).replace(/\\/g, '/');
  const webPath = '/' + relativePath;
  
  let folder = path.basename(path.dirname(file));
  let basename = path.basename(file, path.extname(file));
  
  let varName = `${folder.replace(/[^a-zA-Z0-9]/g, '_')}_${basename.replace(/[^a-zA-Z0-9]/g, '_')}`;
  if (varName.match(/^[0-9]/)) varName = 'IMG_' + varName;
  varName = varName + '_' + (varCounter++);
  
  exportBody += `  ${varName}: '${webPath}',\n`;
  
  if (relativePath.includes('GALLERY/')) {
    gallery.push(`'${webPath}'`);
  } else if (relativePath.includes('GAZPACHUELO/')) {
    projectGroups['Gazpachuelo'].push(`'${webPath}'`);
    if (basename === 'CARTEL_GANADOR') {
        otherAssets['Gazpachuelo'] = `'${webPath}'`;
    }
  } else if (relativePath.includes('DURA')) { 
    projectGroups['DURA'].push(`'${webPath}'`);
    otherAssets['DURA'] = `'${webPath}'`;
  } else if (relativePath.includes('LOCUROTE/')) {
    projectGroups['Locurote'].push(`'${webPath}'`);
  } else if (relativePath.includes('QUIMICA_AVERZZO/')) {
    projectGroups['Química-Averzzo + DeKé Magazine'].push(`'${webPath}'`);
  } else if (relativePath.includes('NAVEOLIVA/')) {
    projectGroups['Nave Oliva'].push(`'${webPath}'`);
  } else if (relativePath.includes('LA_CORRIENTE_BTS/')) {
    projectGroups['LA CORRIENTE (Making Of)'].push(`'${webPath}'`);
  } else if (relativePath.includes('FUNKED_UP/')) {
    projectGroups['Funked Up'].push(`'${webPath}'`);
  } else if (relativePath.includes('RANDALL_BOGGS/')) {
    projectGroups['Randall Boggs'].push(`'${webPath}'`);
  } else if (relativePath.includes('CONTACT/')) {
    if (basename.includes('Email')) otherAssets['Email'] = `'${webPath}'`;
    if (basename.includes('Linkedin')) otherAssets['Linkedin'] = `'${webPath}'`;
    if (basename.includes('Queso')) otherAssets['Queso'] = `'${webPath}'`;
    if (basename.includes('Sevenup')) otherAssets['Sevenup'] = `'${webPath}'`;
    if (basename.includes('Lomography')) otherAssets['Lomography'] = `'${webPath}'`;
  } else if (relativePath.includes('lomography/')) {
    if (basename.includes('Lomo1')) otherAssets['Lomo1'] = `'${webPath}'`;
    if (basename.includes('Lomo2')) otherAssets['Lomo2'] = `'${webPath}'`;
    if (basename.includes('Lomo3')) otherAssets['Lomo3'] = `'${webPath}'`;
  } else if (basename.includes('xari')) {
    otherAssets['xari'] = `'${webPath}'`;
  } else if (basename.includes('Graffiti_cursor')) {
    otherAssets['Graffiti_cursor'] = `'${webPath}'`;
  } else if (basename.includes('HERO')) {
    otherAssets['HERO'] = `'${webPath}'`;
  }
});

for (const [key, val] of Object.entries(otherAssets)) {
  exportBody += `  ${key}: ${val},\n`;
}

exportBody += `  PROJECTS: {\n`;
for (const [pName, pImgs] of Object.entries(projectGroups)) {
  exportBody += `    '${pName}': [\n      ${pImgs.join(',\n      ')}\n    ],\n`;
}
exportBody += `  },\n`;

exportBody += `  GALLERY: [\n    ${gallery.join(',\n    ')}\n  ],\n`;
exportBody += `};\n`;

fs.writeFileSync('src/constants/assets.js', exportBody);
console.log('Regenerated src/constants/assets.js with public paths');
