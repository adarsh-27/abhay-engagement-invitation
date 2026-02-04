"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Envelope from "@/components/Envelope";
import { Reveal } from "@/components/Reveal";

function InvitationContent() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasSeenInvite, setHasSeenInvite] = useState(false);

  const { scrollY } = useScroll();
  const boxScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const boxY = useTransform(scrollY, [0, 500], [0, -50]);

  const ringScale = useTransform(scrollY, [0, 500], [1, 1.8]);
  const ringX = useTransform(scrollY, [0, 250, 2000, 2500], [0, 150, -20, 0]);
  const ringY = useTransform(scrollY, [0, 500], [0, 310]);
  const layerOpacity = useTransform(scrollY, [100, 400], [0, 1]);

  const dateRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: dateProgress } = useScroll({
    target: dateRef,
    offset: ["start end", "end start"]
  });
  const dateY = useTransform(dateProgress, [0, 0.25, 0.5, 0.75, 1], [0, 50, 0, -50, 0]);

  const swanY = useTransform(dateProgress, [0, 0.25, 1, 0.25, 1], [0, 30, 0, -30, 0]);

  useEffect(() => {
    const targetDate = new Date("2026-02-19T09:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="max-w-md mx-auto bg-white shadow-inner min-h-screen">
      {/* 1. Hero Image / Names (With Background) */}
      <div
        className="bg-[url('/firstBackground.png')] bg-cover bg-top pt-[20px] pb-12 px-6 h-screen min-h-screen relative z-30"
      >
        <div className="text-center mb-10">
          <motion.img
            src="/ganpati.png"
            alt="Ganpati"
            className="w-20 mx-auto mb-14 mt-6 opacity-90 drop-shadow-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="font-poppins tracking-tight capitalize text-sm text-[#633d5c]">Together With their family</p>
            <h1 className="text-6xl font-birthstone text-[#f0bb19] mb-2">Abhay & Dhruvi</h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: "easeOut" }}
          className="relative w-64 h-72 mx-auto mb-12"
        >
          <motion.div
            className="w-full h-full overflow-hidden"
            style={{ willChange: "transform" }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0, -5, 0]
            }}
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              },
              x: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <img
              src="/firstImage.png"
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ scale: boxScale, y: boxY }}
            className="absolute bottom-[-180px] left-[-50px] w-[250px] z-10 origin-center"
          >
            <img
              src="/ringBox.png"
              alt="Ring Box"
              className="w-full h-full object-contain scale-x-[-1] -rotate-6"
            />
          </motion.div>
          <motion.div
            style={{ scale: ringScale, x: ringX, y: ringY }}
            className="absolute bottom-[-70px] left-[30px] w-28 z-20 origin-center"
          >
            <img
              src="/ring.png"
              alt="Ring"
              className="w-full h-full object-contain -rotate-12"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full bg-white flex items-center justify-start -mt-8 relative overflow-visible">
        {/* Background Image (Behind) */}
        <motion.img
          style={{ opacity: layerOpacity }}
          src="/layer9.png"
          alt=""
          className="absolute -top-4 right-10 w-auto z-0 pointer-events-none"
        />

        <motion.div
          className="px-20 text-left relative z-10"
          onViewportEnter={() => setHasSeenInvite(true)}
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={hasSeenInvite ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="text-[#633d5c] font-poppins text-[18px] italic leading-6 capitalize"
          >
            cordially invite you to join the occasion of their
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={hasSeenInvite ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
            className="text-[#633d5c] font-dm-serif text-[40px] italic leading-10 capitalize"
          > engagement ceremony!
          </motion.p>
        </motion.div>

        {/* Foreground Image (Front) */}
        <motion.img
          style={{ opacity: layerOpacity }}
          src="/layer8.png"
          alt=""
          className="absolute -bottom-20 left-0 w-auto z-20 pointer-events-none"
        />
      </div>

      {/* Other Sections (White Background) */}
      <div className="px-6">

        <div ref={dateRef} className="relative flex justify-center items-center py-4 mb-4 overflow-hidden">
          {/* Date Text Behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center">
            <motion.h2
              style={{ y: dateY }}
              className="text-[20px] leading-none font-poppins text-[#E9AD3E] whitespace-nowrap tracking-wide uppercase"
            >
              Join Us On
            </motion.h2>
            <motion.h2
              style={{ y: dateY }}
              className="text-[100px] leading-none font-dm-serif text-[#E9AD3E] whitespace-nowrap tracking-tighter"
            >
              19 Feb
            </motion.h2>
            <motion.h2
              style={{ y: dateY }}
              className="text-[150px] leading-none font-dm-serif text-[#E9AD3E] whitespace-nowrap tracking-tighter -mt-8"
            >
              2026
            </motion.h2>
          </div>
          {/* Image */}
          <div className="relative z-10">
            <img src="/imageTwo.png" alt="Couple" className="w-80 object-cover" />
          </div>
        </div>


        <motion.div style={{ y: swanY }} className="flex justify-center -mt-48 z-50 relative">
          <img src="/swan.png" alt="Swan Decoration" className="w-80 pl-4" />
        </motion.div>

        {/* 2. Countdown */}
        <div className="relative w-full min-h-screen flex flex-col items-center justify-start py-10">
          <img
            src="/countdownBackground.png"
            alt="Countdown Background"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-3xl z-10 pointer-events-none select-none"
          />

          <div className="pt-25">
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-5xl font-birthstone text-[#E9AD3E] mb-2">Countdown</h2>
              <p className="text-[#633d5c] font-poppins text-lg tracking-wide">To the most special day</p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-center max-w-sm mx-auto relative z-10 px-4">
              {/* Days */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.days}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Days</span>
              </div>

              {/* Hours */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.hours}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Hours</span>
              </div>

              {/* Minutes */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.minutes}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Minutes</span>
              </div>

              {/* Seconds */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.seconds}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Seconds</span>
              </div>
            </div>
          </div>

        </div>

        <div className="relative flex flex-col justify-center items-center mb-16 p-12">
          {/* Frame Background */}
          <img
            src="/frame.png"
            alt="Decorative Frame"
            className="absolute inset-0 w-full h-full object-fill z-0 opacity-90 pointer-events-none"
          />

          <img
            src="/full.png"
            alt="Couple Full Portrait"
            className="w-full max-w-[80%] rotate-130 rounded-xl relative -top-35"
          />
          <div className="relative z-10 flex flex-col items-center -mt-60">
            <div className="text-center">
              <h3 className="text-5xl font-birthstone text-[#E9AD3E] mb-2">Invitees</h3>
              <div className="mb-4">
                <p className="text-[#633d5c] font-dm-serif text-xl tracking-normal">G J Unagar</p>
                <p className="text-[#633d5c] font-poppins text-[15px] tracking-normal">+91 94272 00969</p>
              </div>
              <div className="mb-4">
                <p className="text-[#633d5c] font-dm-serif text-xl tracking-normal">J J Unagar</p>
                <p className="text-[#633d5c] font-poppins text-[15px] tracking-normal">+91 94283 45834</p>
              </div>
              <div className="mb-4">
                <p className="text-[#633d5c] font-dm-serif text-xl tracking-normal">M J Unagar</p>
                <p className="text-[#633d5c] font-poppins text-[15px] tracking-normal">+91 99250 30101</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Map Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-5xl font-birthstone text-[#E9AD3E] mb-2">Location</h2>
            <p className="text-[#633d5c] font-poppins text-lg tracking-wide">Join us at the venue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E9AD3E]/20">
            {/* Map Iframe */}
            <div className="w-full h-64 bg-gray-100">
              <iframe
                width="100%"
                height="100%"
                title="map"
                scrolling="no"
                src="https://maps.google.com/maps?q=Sardarnagar+Society+Comunity+Hall,+Rajkot&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ filter: "grayscale(0.2) contrast(1.1) opacity(0.9)" }}
              ></iframe>
            </div>

            {/* Address & Button */}
            <div className="p-6 text-center">
              <h3 className="font-poppins text-xl text-[#633d5c] mb-2">Sardarnagar Community Hall</h3>
              <p className="text-[#633d5c] mb-6 text-sm font-poppins">Sardar Nagar, Rajkot, Gujarat</p>

              <a
                href="https://www.google.com/maps/dir//Sardarnagar+Society+Comunity+Hall,+Rajkot+patel+boding,+26-1,+Sardar+Nagar,+Rd+2a,+Om+Nagar,+Rajkot,+Gujarat+360004/@22.2701913,70.7853247,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#633d5c] text-white font-serif rounded-full shadow-md hover:bg-[#6b7d58] transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Footer Logos */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <img src="/fLogo.png" alt="F Logo" className="h-20 w-auto object-contain opacity-80" />
          <img src="/dcLogo.png" alt="DC Logo" className="h-20 w-auto object-contain opacity-80" />
        </div>
      </div>

      {/* Bottom Floral Decoration */}
      <div className="flex justify-between items-end w-full">
        <img src="/full.png" alt="Decoration Left" className="w-40 md:w-56 object-contain opacity-90" />
        <img src="/full.png" alt="Decoration Right" className="w-40 md:w-56 object-contain opacity-90 scale-x-[-1]" />
      </div>
    </main>
  );
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpened) {
    return <Envelope onOpen={() => setIsOpened(true)} />;
  }

  return <InvitationContent />;
}