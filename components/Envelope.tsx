"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHint(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        setTimeout(onOpen, 2000);
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[#FDFBF7] overflow-hidden">
            <motion.div
                className="relative w-full h-full md:w-[320px] md:h-[480px] cursor-pointer perspective-1000 md:rounded-2xl"
                style={{ overflow: isOpen ? "visible" : "hidden" }}
                onClick={handleOpen}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isOpen ? 1.1 : 1, opacity: 1 }}
                transition={{ duration: 1 }}
            >

                {/* 3. Bottom Flap */}
                <div className="absolute bottom-0 left-0 right-0 w-full h-full z-25 pointer-events-none"
                    style={{ maskImage: "linear-gradient(to top, black 80%, transparent 100%)" }}>
                    <Image
                        src="/lowerflap.png"
                        alt="Bottom Flap"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* 4. Top Flap (Animates Open) */}
                <motion.div
                    className="absolute top-[0%] left-0 right-0 h-full z-30 origin-top"
                    initial={{ rotateX: 0, filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.2))" }}
                    animate={{
                        rotateX: isOpen ? 25 : 0,
                        filter: isOpen ? "drop-shadow(0px 15px 20px rgba(0,0,0,0.6))" : "drop-shadow(0px 3px 5px rgba(0,0,0,0.2))"
                    }}
                    transition={{
                        duration: 1.5, // Duration matches the rotation for sync
                        ease: "easeInOut"
                    }}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    <div className="absolute inset-0 w-full h-full scale-110">
                        <Image
                            src="/upperflap.png"
                            alt="Top Flap"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>


                </motion.div>



                <motion.p
                    className="absolute bottom-44 left-0 right-0 text-center font-birthstone z-40 pointer-events-none text-[#E9AD3E] text-4xl capitalize"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    This invitation is<br />exclusively for you
                </motion.p>

                <motion.p
                    className="absolute bottom-20 left-0 right-0 text-center font-poppins z-50 pointer-events-none text-[#633d5c]/80 text-sm tracking-widest uppercase animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (showHint && !isOpen) ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    ( Tap to Open )
                </motion.p>
            </motion.div>
        </div>
    );
}

{/* 
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
             */}