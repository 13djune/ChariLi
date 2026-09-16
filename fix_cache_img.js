const fs = require('fs');
let code = fs.readFileSync('src/components/Menu.js', 'utf8');
code = code.replace(/ASSETS\.Gazpachuelo,/g, "ASSETS.Gazpachuelo + '?v=2',");
fs.writeFileSync('src/components/Menu.js', code);
