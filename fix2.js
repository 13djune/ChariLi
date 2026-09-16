const fs = require('fs');
let code = fs.readFileSync('src/pages/About.js', 'utf8');
code = code.replace(/ASSETS\.([a-zA-Z0-9_]+) \+ '\?v=2'/g, "ASSETS.$1");
fs.writeFileSync('src/pages/About.js', code);

let code2 = fs.readFileSync('src/pages/Contact.js', 'utf8');
code2 = code2.replace(/ASSETS\.([a-zA-Z0-9_]+) \+ '\?v=2'/g, "ASSETS.$1");
fs.writeFileSync('src/pages/Contact.js', code2);

let code3 = fs.readFileSync('src/components/Menu.js', 'utf8');
code3 = code3.replace(/ASSETS\.([a-zA-Z0-9_]+) \+ '\?v=2'/g, "ASSETS.$1");
fs.writeFileSync('src/components/Menu.js', code3);
