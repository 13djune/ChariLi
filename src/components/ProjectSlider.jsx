import '../index.css';
import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import FancyButton from '../components/FancyButton';
import { Icon } from '@iconify/react';

Modal.setAppElement('#root');

export default function ProjectSlider({ project, onImageClick }) {
  const [modalData, setModalData] = useState(null);
  const scrollRef = useRef(null);

  const openInfoModal = () => setModalData(project);
  const closeModal = () => setModalData(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let moved = false;
    let velocity = 0;
    let animationId;
    let isPaused = false;
  
    const scroll = () => {
      if (!isPaused && !isDragging) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
  
    const onMouseDown = (e) => {
      isDragging = true;
      moved = false;
      startX = e.clientX;
      lastX = e.clientX;
      velocity = 0;
      el.classList.add('dragging');
    };
  
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const delta = e.clientX - lastX;
      el.scrollLeft -= delta;
      velocity = delta;
      lastX = e.clientX;
      if (Math.abs(e.clientX - startX) > 5) moved = true;
    };
  
    const onMouseUp = (e) => {
      isDragging = false;
      el.classList.remove('dragging');
  
      // 🔥 Solo bloquea el click si realmente se movió
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      const inertia = () => {
        if (Math.abs(velocity) > 0.1) {
          el.scrollLeft -= velocity;
          velocity *= 0.95;
          animationId = requestAnimationFrame(inertia);
        }
      };
      requestAnimationFrame(inertia);
    };
  
    const pause = () => { isPaused = true; };
    const resume = () => { if (!isDragging) isPaused = false; };
  
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseUp);
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause);
    el.addEventListener('touchend', resume);
  
    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseUp);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, []);
  
  
  

  return (
    <div className="space-y-12 w-full">
      <div key={project.id} className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-heading text-text">{project.title}</h2>
          <div className="flex items-center">
            <div className="hidden md:block">
              <FancyButton
                label="Más info"
                icon={
                  <Icon
                    icon="material-symbols:add-circle-outline-rounded"
                    width="20"
                    height="20"
                    className="text-current"
                  />
                }
                onClick={openInfoModal}
              />
            </div>
            <button 
              onClick={openInfoModal} 
              className="md:hidden text-text hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full" 
              aria-label="Más info"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M9 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 7a.75.75 0 0 0 0 1.5h.25v2h-1a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-1V7z" clipRule="evenodd"/></svg>
            </button>
          </div>
        </div>

        <div className="marquee-scroll-wrapper overflow-y-hidden py-6" ref={scrollRef}>
          <div className="marquee-scroll-content">
            {[...project.media, ...project.media].map((media, i) => (
              <div key={i} className="marquee-item">
                {media.type === 'image' ? (
                  <button
                    type="button"
                    onClick={() =>
                      onImageClick(
                        project.media,
                        project.media.filter(item => item.type === 'image')
                          .findIndex(item => item.src === media.src)
                      )
                    }
                    className="p-0 m-0 border-0 bg-transparent cursor-pointer relative block group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 transition-all duration-500 ease-out"
                    aria-label={`Ver ${project.title} imagen ${i + 1} en galería`}
                  >
                    <div className="relative">
                      <img loading="lazy" decoding="async"
                        src={media.src}
                        alt={`${project.title} ${i + 1}`}
                        className="w-[280px] sm:w-[320px] md:w-[450px] h-[320px] md:h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </button>
                ) : (
                  <div className="overflow-hidden rounded-xl bg-secondary">
                    <video
                      src={media.src}
                      muted
                      autoPlay
                      loop
                      className="w-[280px] sm:w-[320px] md:w-[450px] h-[320px] md:h-[400px] object-cover pointer-events-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

                        <Modal
        isOpen={!!modalData}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="relative mx-auto mt-10 mb-10 max-w-5xl w-[95%] bg-background text-text outline-none rounded-2xl shadow-2xl z-[9999] flex flex-col-reverse md:flex-row overflow-hidden border border-neutral-700"
        overlayClassName="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-[9998]"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-4xl font-bodyBold hover:text-primary z-[9999] w-12 h-12 flex items-center justify-center rounded-full bg-background border border-neutral-700 pointer-events-auto shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Galería (izquierda) */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto h-auto md:max-h-[85vh] border-b md:border-b-0 md:border-r border-neutral-700 custom-scrollbar bg-black/10">
          <div className="flex flex-col gap-6">
            {modalData?.media?.filter(m => m.type === 'image').slice(0, 1).map((media, i) => (
              <div key={i} className="shadow-lg rounded-xl overflow-hidden">
                {media.type === 'image' ? (
                  <img
                    src={media.src}
                    alt={`${modalData.title} ${i + 1}`}
                    className="w-full h-auto object-cover"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <video
                    src={media.src}
                    muted
                    autoPlay
                    loop
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info (derecha) */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 overflow-y-auto h-auto md:max-h-[85vh] custom-scrollbar flex flex-col bg-background">
          <h2 className="text-3xl font-heading uppercase tracking-wider mb-2">
            {modalData?.title}
          </h2>
          <span className="text-sm font-heading text-neutral-500 mb-6 block">({modalData?.year})</span>

          <div className="mb-6 space-y-4 text-base font-body leading-relaxed text-text">
            {Array.isArray(modalData?.description) ? (
              modalData.description.map((paragraph, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))
            ) : (
              <p dangerouslySetInnerHTML={{ __html: modalData?.description }} />
            )}
          </div>

          <ul className="list-disc list-inside space-y-1 mb-8 text-text font-body">
            {modalData?.disciplines.map((d, i) => (
              <li key={i} className="text-sm mx-2 inline-block mb-2 font-bold bg-primary text-black-500 px-3 py-1 rounded-full">{d}</li>
            ))}
          </ul>

          {modalData?.link && (
            <div className="mt-auto pt-4 border-t border-neutral-700">
              <FancyButton
                label="Ver vídeo"
                icon={
                  <Icon
                    icon="material-symbols:open-in-new-rounded"
                    width="20"
                    height="20"
                    className="text-current"
                  />
                }
                onClick={() => window.open(modalData.link, '_blank')}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
