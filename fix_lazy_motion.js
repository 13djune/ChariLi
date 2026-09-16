const fs = require('fs');

const addLazyLoadingMotion = (file) => {
    let code = fs.readFileSync(file, 'utf8');
    // For motion.img
    code = code.replace(/<motion\.img(?![^>]*loading=)([^>]*)>/g, '<motion.img loading="lazy" decoding="async"$1>');
    fs.writeFileSync(file, code);
};

['src/pages/Projects.js', 'src/pages/About.js', 'src/components/Gallery.js'].forEach(file => {
    if(fs.existsSync(file)) addLazyLoadingMotion(file);
});
console.log('Lazy loading added to motion.img');
