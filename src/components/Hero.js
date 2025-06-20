import PaintRevealImage from "../components/PaintRevealImage";

export default function Hero() {    
    return (
        <section className="relative ">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none
">
            <h1 className="font-Graffiti text-4xl md:text-8xl  text-text text-center z-10">
            ChariLi
            </h1>
            <p className="font-bodySemiBold text-text text-center text-2xl z-10">Creativa Audiovisual</p>
        </div>
        <PaintRevealImage />
        </section>
    );
    }