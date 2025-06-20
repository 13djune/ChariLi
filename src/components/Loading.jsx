import { useEffect, useState } from 'react';

const words = [
  { text: 'Directora', className: 'font-AncizarItalic' },
  { text: 'Fotógrafa', className: 'font-Teletext' },
  { text: 'Productora', className: 'font-bodyBold' },
  { text: 'Artista', className: 'font-Graffiti' }, // asegúrate de definirla
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 400); // cambia cada 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-primary text-text font-heading text-center">
      <h1 className="text-5xl sm:text-7xl text-heading uppercase">ChariLi</h1>
      <div
        key={index}
        className={`text-3xl sm:text-5xl my-4 transition-all duration-300 ${words[index].className}`}
      >
        {words[index].text}
      </div>
      <h1 className="text-5xl sm:text-7xl text-heading">ChariLi</h1>
    </div>
  );
}
