import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <>
        <Hero />
        <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="relative z-0"
        >
          <Gallery />
        </motion.section>
      </>
    );
  }
