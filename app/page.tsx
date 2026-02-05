"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Envelope from "@/components/Envelope";

import ganpatiImg from "@/app/assets/ganpati.png";
import firstImageImg from "@/app/assets/firstImage.png";
import ringBoxImg from "@/app/assets/ringBox.png";
import ringImg from "@/app/assets/ring.png";
import layer9Img from "@/app/assets/layer9.png";
import layer8Img from "@/app/assets/layer8.png";
import imageTwoImg from "@/app/assets/imageTwo.png";
import swanImg from "@/app/assets/swan.png";
import clockImg from "@/app/assets/clock.png";
import kabutarImg from "@/app/assets/kabutar.png";
import fullImg from "@/app/assets/full.png";
import inviteesImg from "@/app/assets/invitees.png";
import pinkRoseImg from "@/app/assets/pinkRose.png";
import groupLogoImg from "@/app/assets/groupLogo.png";

const MotionImage = motion(Image);

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

  const clockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: clockProgress } = useScroll({
    target: clockRef,
    offset: ["start end", "end start"]
  });
  const clockY = useTransform(clockProgress, [0, 1], [30, -60]);
  const clockRotate = useTransform(clockProgress, [0, 1], [0, -45]);

  const inviteesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: inviteesProgress } = useScroll({
    target: inviteesRef,
    offset: ["start end", "end start"]
  });
  const inviteesRotate = useTransform(inviteesProgress, [0, 1], [-10, 10]);

  const birdRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: birdProgress } = useScroll({
    target: birdRef,
    offset: ["start end", "end start"]
  });
  const birdX = useTransform(birdProgress, [0, 1], [100, -200]);   // Right to Left
  const birdY = useTransform(birdProgress, [0, 1], [0, -150]);      // Slight diagonal up

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
          <MotionImage
            src={ganpatiImg}
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
            <Image
              src={firstImageImg}
              alt="Couple"
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
          <motion.div
            style={{ scale: boxScale, y: boxY }}
            className="absolute bottom-[-180px] left-[-50px] w-[250px] z-10 origin-center"
          >
            <Image
              src={ringBoxImg}
              alt="Ring Box"
              className="w-full h-full object-contain scale-x-[-1] -rotate-6"
            />
          </motion.div>
          <motion.div
            style={{ scale: ringScale, x: ringX, y: ringY }}
            className="absolute bottom-[-70px] left-[30px] w-28 z-20 origin-center"
          >
            <Image
              src={ringImg}
              alt="Ring"
              className="w-full h-full object-contain -rotate-12"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full bg-white flex items-center justify-start mt-3 relative overflow-visible">
        {/* Background Image (Behind) */}
        <MotionImage
          style={{ opacity: layerOpacity }}
          src={layer9Img}
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
        <MotionImage
          style={{ opacity: layerOpacity }}
          src={layer8Img}
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
            <Image src={imageTwoImg} alt="Couple" className="w-80 object-cover" />
          </div>
        </div>


        <motion.div style={{ y: swanY }} className="flex justify-center -mt-48 z-50 relative">
          <Image src={swanImg} alt="Swan Decoration" className="w-80 pl-4" />
        </motion.div>

        {/* 2. Countdown */}
        <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-start">
          <div className="pt-20">
            <div className="text-center mb-8 relative z-10">
              <div ref={clockRef} className="relative inline-block">
                <h2 className="text-8xl font-birthstone text-[#E9AD3E] relative leading-none">Countdown</h2>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-25 z-20 pointer-events-none w-32">
                  <MotionImage
                    style={{ y: clockY, rotate: clockRotate }}
                    src={clockImg}
                    alt="Clock"
                    className="w-full opacity-80"
                  />
                </div>
              </div>
              <p className="text-[#633d5c] font-poppins text-lg tracking-wide -mt-4">To the most special day</p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-center max-w-sm mx-auto relative z-10 px-4">
              {/* Days */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.days}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Days</span>
              </div>

              {/* Hours */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.hours}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Hours</span>
              </div>

              {/* Minutes */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.minutes}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Minutes</span>
              </div>

              {/* Seconds */}
              <div className="relative bg-transparent rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#D4AF37] aspect-square flex flex-col items-center justify-center min-w-[140px]">
                <div className="absolute inset-0.5 border border-[#D4AF37] rounded-xl opacity-60 pointer-events-none"></div>
                <span className="text-6xl font-dm-serif text-[#6D4C41] z-10">{timeLeft.seconds}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8D6E63] z-10 mt-2">Seconds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flying Bird Animation */}
        <div ref={birdRef} className="relative z-50 h-[100px] w-full max-w-sm mx-auto overflow-visible pointer-events-none">
          <MotionImage
            style={{ x: birdX, y: birdY }}
            src={kabutarImg}
            alt="Flying Bird"
            className="w-28 absolute -right-4 bottom-10 scale-x-[1]"
          />
        </div>
      </div>

      <div className="w-full -mt-10">
        <div className="relative flex flex-col justify-center items-center w-full">
          <Image
            src={fullImg}
            alt="Couple Full Portrait"
            className="w-full max-w-[50%] rotate-180 rounded-xl relative -top-30 left-24"
          />
          <div ref={inviteesRef} className="relative z-10 -mt-80 w-full ml-10">
            <MotionImage
              style={{ rotate: inviteesRotate }}
              src={inviteesImg}
              alt="Invitees List"
              className="w-full h-auto drop-shadow-md max-w-90"
            />
          </div>
          <Image
            src={fullImg}
            alt="Decoration Bottom Left"
            className="absolute -bottom-20 -left-14 w-72 z-20 blur-[6px]"
          />
        </div>

        {/* 3. Map Section */}
        <div className="px-6 mt-10">
          <div className="text-center mb-8">
            <h2 className="text-7xl font-birthstone text-[#E9AD3E] mb-2 relative z-10">Location</h2>
            <p className="text-[#633d5c] font-poppins text-lg tracking-wide -mt-4">Join us at the venue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E9AD3E]/20 min-w-72 w-72 mx-auto" >
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
                className="inline-block px-8 py-3 bg-[#633d5c] text-white font-serif rounded-2xl shadow-md hover:bg-[#633d5c] transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

      </div>
      {/* Footer Logos */}
      <div className="flex flex-col justify-center items-center relative bg-transparent min-h-[calc(100vh-20px)] overflow-hidden">

        <Image src={pinkRoseImg} alt="Background Rose" className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120%] max-w-lg opacity-80 z-0 pointer-events-none" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[#633d5c] font-dm-serif text-4xl relative z-10 w-60 text-left flex items-start justify-start"
        >
          With the Blessings and Warm Presence of
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10 mt-20"
        >
          <Image src={groupLogoImg} alt="Group Logo" className="w-44 h-auto object-contain opacity-90 " />
        </motion.div>
      </div>
    </main >
  );
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpened) {
    return <Envelope onOpen={() => setIsOpened(true)} />;
  }

  return <InvitationContent />;
}