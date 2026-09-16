const fs = require('fs');

let code = fs.readFileSync('src/pages/About.js', 'utf8');

// Fix Lomography z-index: The text should have a lower z-index than the hovering images
code = code.replace(
  /className="relative z-50 flex flex-col items-center justify-center w-full h-full py-6 mt-2"/g,
  'className="relative z-10 flex flex-col items-center justify-center w-full h-full py-6 mt-2"'
);

// The text "Lomography" WorkLink has z-50 relative
code = code.replace(
  /className="font-heading block text-center mb-2 z-50 relative transition-colors duration-300 dark:group-hover:text-text-inverse"/g,
  'className="font-heading block text-center mb-2 relative transition-colors duration-300 dark:group-hover:text-text-inverse"'
);

code = code.replace(
  /className="text-sm text-center transition-colors duration-300 dark:group-hover:text-text-inverse relative z-50"/g,
  'className="text-sm text-center transition-colors duration-300 dark:group-hover:text-text-inverse relative"'
);

// The images div has z-40, we'll make it z-50 so they are strictly above the text
code = code.replace(
  /className="absolute inset-0 flex justify-center items-center pointer-events-none z-40"/g,
  'className="absolute inset-0 flex justify-center items-center pointer-events-none z-50"'
);

// Fix the festival text spacing
// The user said: "porque los nombres de los festivales no salen donde deberian de salir."
// Let's ensure the spacing is correct. 
code = code.replace(
  /Categoría Mejor Corto en el <a href='https:\/\/festivaladn.com\/#:~:text=Gazpachuelo%20de%20Chari%20Li%20Rinc%C3%B3n%20Rivas%20\(Mejor%20Cortometraje\)' target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-primary\/50 hover:decoration-primary hover:text-primary transition-colors">Festival ADN 2023\.<\/a> Presentado y participando en el Festival\s*Internacional de Cine en Guadalajara \(México\)\./g,
  'Categoría Mejor Corto en el <a href="https://festivaladn.com" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline">Festival ADN 2023</a>. Presentado y participando en el Festival Internacional de Cine en Guadalajara (México).'
);

code = code.replace(
  /Coordinación en departamentos de dirección y producción, ganador a mejor dirección de arte en el <a href="https:\/\/festivaladn.com\/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-primary\/50 hover:decoration-primary hover:text-primary transition-colors">Festival ADN 2025\.<\/a>/g,
  'Coordinación en departamentos de dirección y producción, ganador a mejor dirección de arte en el <a href="https://festivaladn.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline">Festival ADN 2025</a>.'
);

fs.writeFileSync('src/pages/About.js', code);
console.log('Fixed About.js');
