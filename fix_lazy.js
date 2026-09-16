const fs = require('fs');

const addLazyLoading = (file) => {
    let code = fs.readFileSync(file, 'utf8');
    // Simple regex to add loading="lazy" if not present
    code = code.replace(/<img(?![^>]*loading=)([^>]*)>/g, '<img loading="lazy" decoding="async"$1>');
    fs.writeFileSync(file, code);
};

['src/pages/Projects.js', 'src/pages/About.js'].forEach(file => {
    if(fs.existsSync(file)) addLazyLoading(file);
});
console.log('Lazy loading added');
