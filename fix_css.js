const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/\.modal-backdrop-lightbox\s*{[^}]*}\s*\.modal-content-lightbox\s*{[^}]*}\s*\.nav-button\s*{[^}]*}\s*\.nav-button:hover\s*{[^}]*}/, 
`.modal-backdrop-lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(4, 3, 22, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(12px);
}
.modal-content-lightbox {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 95vw;
  max-height: 95vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  animation: fadeInScale 0.3s ease-out;
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10001;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}
.nav-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
}`);
fs.writeFileSync('src/index.css', css);
