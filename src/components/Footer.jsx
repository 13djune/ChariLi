import { Icon } from '@iconify/react';
import Lava from './Lava';
export default function Footer() {
  const icons = [
    'material-symbols:photo-camera-outline-rounded',
    'material-symbols:audio-video-receiver-outline-rounded',
    'material-symbols:extension-outline',
    'material-symbols:mic-outline-rounded',
    'material-symbols:movie-edit-outline-rounded',
    'material-symbols:blur-on',
    'material-symbols:dirty-lens-outline-rounded',
    'material-symbols:theaters-rounded',
    'material-symbols:playing-cards-outline-rounded',
    'material-symbols:music-cast-rounded',
    'material-symbols:filter-drama-outline-rounded',
    'mdi:star-four-points-outline',
    'material-symbols:camera-outline-rounded',
    'material-symbols:star-shine-outline-rounded',
    'material-symbols:dinner-dining-outline-rounded',
    'material-symbols:psychiatry-outline-rounded',
    'material-symbols:speed-camera-outline-rounded',
    'material-symbols:confirmation-number-outline-rounded',
    'material-symbols:beach-access-rounded',
    'material-symbols:fragrance-rounded',
    'material-symbols:mic-external-on-outline-rounded',
    'material-symbols:photo-filter-rounded',
    'material-symbols:phonelink-ring-rounded',
    'material-symbols:gallery-thumbnail-outline-rounded',
    'material-symbols:radio-outline-rounded',
    'material-symbols:draw-abstract-outline',
    'material-symbols:folder-zip-outline-rounded',
    'material-symbols:draw',
    'material-symbols:trail-length-outline-rounded',
    'material-symbols:electrical-services-rounded',
    'material-symbols:dirty-lens-outline-rounded',
    'material-symbols:wb-incandescent-outline-rounded',



  ];

  return (
    <footer className="mt-20  bg-background pt-8">
      <div className="relative overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            {[...icons, ...icons, ...icons].map((icon, i) => (
              <Icon
                key={i}
                icon={icon}
                className="mx-6 text-primary text-3xl sm:text-4xl"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-hidden bg-black h-[60dvh] flex flex-col items-center content-center">
  <div className="absolute inset-0">
    <Lava />
  </div>

  <div className="relative z-10 mix-blend-difference text-white flex flex-col items-center ">
    <p className="p-6 text-center text-md font-bodySemiBold pointer-events-none">
      © {new Date().getFullYear()} ChariLi. Todos los derechos reservados.
    </p>
    <p className="p-6 pt-2 text-center text-md font-bodySemiBold border-t-2 border-primary w-max pointer-events-none">
      website diseñada & desarrollada por
    </p>
    <p className="text-center text-md font-bodySemiBold">
      <a
        href="https://belencastillo.netlify.app/"
        className="hover:underline hover:font-Teletext"
      >
        june castillo
      </a>
    </p>
  </div>
</div>


{/* 
      <div className="flex flex-row justify-between">
        <div className='flex flex-col items-center'>
            <p className='p-6 text-center text-text text-sm font-bodySemiBold'>
        © {new Date().getFullYear()} ChariLi. Todos los derechos reservados.

            </p>
            <p className='p-6 pt-2 text-center text-text text-sm font-bodySemiBold border-t-2 border-primary w-max'>
            website diseñada & desarrollada por 
            </p>
            <p className='text-center text-text text-sm font-bodySemiBold '>
            <a href='https://belencastillo.netlify.app/' className='font-bodySemiBold hover:font-Teletext hover:underline hover:decoration-solid hover:text-accent py-8'>june castillo</a>
            </p>
        </div>
        <div className="flex w-[60%] z-10">
            <Lava />
        </div>
      </div> */}
    </footer>
  );
}
