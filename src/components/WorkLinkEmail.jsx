import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { createPortal } from 'react-dom';

export default function WorkLinkEmail({ children }) {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const link = linkRef.current;
    const underline = underlineRef.current;

    if (!link || !underline) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(underline, { width: '0%', left: '0%' }, { width: '100%', duration: 0.6, ease: 'power2.out' });
    tl.add('midway');
    tl.fromTo(underline, { width: '100%', left: '0%' }, { width: '0%', left: '100%', duration: 0.6, ease: 'power2.in' });

    const enter = () => { tl.pause(0); tl.tweenTo('midway'); };
    const leave = () => tl.play();

    link.addEventListener('mouseenter', enter);
    link.addEventListener('mouseleave', leave);

    return () => {
      link.removeEventListener('mouseenter', enter);
      link.removeEventListener('mouseleave', leave);
      tl.kill();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes usar EmailJS o fetch a una API
    console.log('Enviar:', formData);
    alert('Mensaje enviado');
    setShowForm(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <button
        ref={linkRef}
        onClick={() => setShowForm(true)}
        className="font-heading relative inline-block font-bold text-[16px]"
      >
        <span className="relative z-10">{children}</span>
        <span
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-[0.2em] w-0 bg-current"
        />
      </button>

      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" onClick={() => setShowForm(false)}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Enviar mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border px-3 py-2"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Tu email"
                className="w-full border px-3 py-2"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <textarea
                placeholder="Mensaje"
                className="w-full border px-3 py-2"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
              />
              <div className="flex justify-between">
                <button type="button" onClick={() => setShowForm(false)} className="text-gray-500">Cancelar</button>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">Enviar</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
