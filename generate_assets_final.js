const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'src/assets/img');

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

let imports = '';
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

// To ensure consistent order
allFiles.sort();

allFiles.forEach(file => {
  const relativePath = path.relative(path.join(__dirname, 'src/constants'), file).replace(/\\/g, '/');
  
  let folder = path.basename(path.dirname(file));
  let basename = path.basename(file, path.extname(file));
  let varName = `${folder.replace(/[^a-zA-Z0-9]/g, '_')}_${basename.replace(/[^a-zA-Z0-9]/g, '_')}`;
  if (varName.match(/^[0-9]/)) varName = 'IMG_' + varName;
  varName = varName + '_' + (varCounter++);
  
  imports += `import ${varName} from '${relativePath}';\n`;
  exportBody += `  ${varName},\n`;

  if (relativePath.includes('GALLERY/')) {
    gallery.push(varName);
  } else if (relativePath.includes('GAZPACHUELO/')) {
    projectGroups['Gazpachuelo'].push(varName);
    if (basename === 'CARTEL_GANADOR') {
        otherAssets['Gazpachuelo'] = varName;
    }
  } else if (relativePath.includes('DURA')) { 
    projectGroups['DURA'].push(varName);
    otherAssets['DURA'] = varName;
  } else if (relativePath.includes('LOCUROTE/')) {
    projectGroups['Locurote'].push(varName);
  } else if (relativePath.includes('QUIMICA_AVERZZO/')) {
    projectGroups['Química-Averzzo + DeKé Magazine'].push(varName);
  } else if (relativePath.includes('NAVEOLIVA/')) {
    projectGroups['Nave Oliva'].push(varName);
  } else if (relativePath.includes('LA_CORRIENTE_BTS/')) {
    projectGroups['LA CORRIENTE (Making Of)'].push(varName);
  } else if (relativePath.includes('FUNKED_UP/')) {
    projectGroups['Funked Up'].push(varName);
  } else if (relativePath.includes('RANDALL_BOGGS/')) {
    projectGroups['Randall Boggs'].push(varName);
  } else if (relativePath.includes('CONTACT/')) {
    if (basename.includes('Email')) otherAssets['Email'] = varName;
    if (basename.includes('Linkedin')) otherAssets['Linkedin'] = varName;
    if (basename.includes('Queso')) otherAssets['Queso'] = varName;
    if (basename.includes('Sevenup')) otherAssets['Sevenup'] = varName;
    if (basename.includes('Lomography')) otherAssets['Lomography'] = varName;
  } else if (relativePath.includes('lomography/')) {
    if (basename.includes('Lomo1')) otherAssets['Lomo1'] = varName;
    if (basename.includes('Lomo2')) otherAssets['Lomo2'] = varName;
    if (basename.includes('Lomo3')) otherAssets['Lomo3'] = varName;
  } else if (basename.includes('xari')) {
    otherAssets['xari'] = varName;
  } else if (basename.includes('Graffiti_cursor')) {
    otherAssets['Graffiti_cursor'] = varName;
  } else if (basename.includes('HERO')) {
    otherAssets['HERO'] = varName;
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

fs.writeFileSync('src/constants/assets.js', imports + '\n' + exportBody);
console.log('Regenerated src/constants/assets.js');
