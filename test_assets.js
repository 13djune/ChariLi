const fs = require('fs');
let code = fs.readFileSync('src/pages/Projects.js', 'utf8');
if (!code.includes('console.log("ASSETS IN PROJECTS", ASSETS);')) {
  code = code.replace("export default function Projects() {", "export default function Projects() {\n  console.log(\"ASSETS IN PROJECTS\", ASSETS);\n");
  fs.writeFileSync('src/pages/Projects.js', code);
}
