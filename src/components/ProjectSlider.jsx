import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Modal from 'react-modal';
import { useState } from 'react';
import FancyButton from '../components/FancyButton';
import { Icon } from '@iconify/react';

Modal.setAppElement('#root');
export default function ProjectSlider({ project }) {
  const [modalData, setModalData] = useState(null);

  const openModal = () => setModalData(project);
  const closeModal = () => setModalData(null);

  return (
    <div className="space-y-12  px-12">
      <div key={project.id} className="relative">
        {/* Título + botón */}
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
            onClick={openModal}
          />
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop
          autoplay={{ delay: 2500 }}
        >
          {project.media.map((media, i) => (
            <SwiperSlide key={i}>
              {media.type === 'image' ? (
                <img
                  src={media.src}
                  alt={`${project.title} ${i + 1}`}
                  className="rounded-xl object-cover w-full h-auto"
                />
              ) : (
                <video
                  src={media.src}
                  muted
                  autoPlay
                  loop
                  className="rounded-xl object-cover w-full h-auto"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!modalData}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="fixed top-0 right-0 w-full sm:w-[500px] h-full bg-background text-text p-10 overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-heading uppercase tracking-wider">
            {modalData?.title} <span className="text-xs font-heading">({modalData?.year})</span>
          </h2>
          <button onClick={closeModal} className="text-3xl font-bodyBold cursor-pointer">×</button>
        </div>

        <h1 className="text-xl font-bodySemiBold mb-4">{modalData?.description}</h1>

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
