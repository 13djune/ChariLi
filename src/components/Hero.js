import { motion } from 'framer-motion';
import PaintRevealImage from "../components/PaintRevealImage";

export default function Hero() {
    return (
        <section className="relative ">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    className="font-Graffiti text-5xl sm:text-7xl md:text-[9rem] text-text text-center drop-shadow-2xl pointer-events-auto cursor-default"
                >
                    ChariLi
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    className="font-body text-text text-center text-2xl md:text-3xl mt-2 drop-shadow-md pointer-events-auto cursor-default bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full border border-neutral-700/30"
                >
                    <strong>Creativa</strong> Audiovisual
                </motion.p>
            </div>
            <PaintRevealImage />
        </section>
    );
}
