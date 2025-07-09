import '../index.css';
import { useEffect, useState } from 'react';

export default function RealisticSwitch() {
  const [checked, setChecked] = useState(() => {
    // 🟢 default: claro = true (no dark mode)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'dark';
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    const isLight = checked;

    root.classList.toggle('dark', !isLight); // ⬅️ toggle dark if light is OFF
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [checked]);

  return (
    <main className="flex justify-center items-center overflow-hidden bg-[#d9d9d9] dark:bg-[#111]">
      <section className="panel">
        <input
          id="switch"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="switch"></label>
        <div className="overlay"></div>
      </section>
    </main>
  );
}
