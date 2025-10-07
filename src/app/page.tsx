"use client";
import { motion } from "framer-motion";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.8]"
      >
        <source
          src="https://res.cloudinary.com/dqgvmwnpl/video/upload/v1759864802/background_image/20072-307163785_small_mnwmo6.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navigation />

        <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[90px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-400 drop-shadow-xl"
          >
            Shine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-xl text-cyan-100 uppercase tracking-[0.3em] mt-2"
          >
            resin decor
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10"
          >
            <Button />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
