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
    <div className="space-y-12 px-12">
      <div key={project.id} className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-heading text-text">{project.title}</h2>
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

        <div className="marquee-scroll-wrapper" ref={scrollRef}>
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
                    className="p-0 m-0 border-0 bg-transparent cursor-pointer focus:outline-none"
                  >
                    <img
                      src={media.src}
                      alt={`${project.title} ${i + 1}`}
                      className="h-[320px] w-auto rounded-xl transition-transform duration-300 hover:scale-105"
                      draggable={false}
                    />
                  </button>
                ) : (
                  <video
                    src={media.src}
                    muted
                    autoPlay
                    loop
                    className="h-[320px] w-auto rounded-xl pointer-events-none"
                  />
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
        className="border-l-4 border-l-primary fixed top-0 right-0 w-full sm:w-[500px] h-full bg-background text-text p-10 overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-heading uppercase tracking-wider">
            {modalData?.title}{' '}
            <span className="text-xs font-heading">({modalData?.year})</span>
          </h2>
          <button
            onClick={closeModal}
            className="text-3xl font-bodyBold cursor-pointer hover:text-accent"
          >
            ×
          </button>
        </div>

        <div className="mb-4 space-y-4 text-base font-body leading-relaxed">
          {Array.isArray(modalData?.description) ? (
            modalData.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
            <p>{modalData?.description}</p>
          )}
        </div>

        <ul className="list-disc list-inside space-y-1 mb-4">
          {modalData?.disciplines.map((d, i) => (
            <li key={i} className="text-sm pill mx-2">{d}</li>
          ))}
        </ul>

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
      </Modal>
    </div>
  );
}
