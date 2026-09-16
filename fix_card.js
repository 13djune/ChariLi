const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/\.card\s*{[\s\S]*?}/, `.card {
  @apply
  flex flex-col w-full md:w-[30%] min-h-[45dvh] h-auto
  justify-start items-center
  bg-background p-4 sm:px-6 md:px-10 py-8 gap-4
  rounded-2xl border-2 border-text
  shadow-md transition-shadow hover:shadow-lg
  hover:bg-primary
  text-black-500
  dark:text-text;
}`);
fs.writeFileSync('src/index.css', css);
console.log('Fixed card css');
