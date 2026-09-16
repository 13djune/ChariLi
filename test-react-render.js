const fs = require('fs');
let code = fs.readFileSync('src/pages/Projects.js', 'utf8');
code = code.replace("export default function Proyectos() {", "export default function Proyectos() {\n  console.log('ASSETS.PROJECTS', ASSETS.PROJECTS);");
fs.writeFileSync('src/pages/Projects.js', code);
