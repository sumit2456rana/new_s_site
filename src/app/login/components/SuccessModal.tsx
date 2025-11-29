import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuccessModal() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Redirect to home page
                    window.location.href = '/';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Floating hearts animation with stable positions
    const floatingHearts = [
        { id: 0, startX: 120, endX: 890, delay: 0, duration: 4.8 },
        { id: 1, startX: 450, endX: 230, delay: 0.5, duration: 5.2 },
        { id: 2, startX: 780, endX: 560, delay: 1, duration: 4.3 },
        { id: 3, startX: 210, endX: 920, delay: 1.5, duration: 5.7 },
        { id: 4, startX: 650, endX: 180, delay: 2, duration: 4.6 },
        { id: 5, startX: 340, endX: 710, delay: 2.5, duration: 5.4 },
        { id: 6, startX: 920, endX: 340, delay: 3, duration: 4.9 },
        { id: 7, startX: 540, endX: 650, delay: 3.5, duration: 5.1 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-linear-to-br from-pink-900/40 via-purple-900/40 to-rose-900/40 backdrop-blur-sm flex justify-center items-center z-50"
        >
            {/* Floating hearts in background */}
            {floatingHearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{
                        opacity: 0,
                        y: 100,
                        x: heart.startX
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: -100,
                        x: heart.endX,
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "easeInOut"
                    }}
                    className="absolute text-pink-300/30 text-2xl"
                >
                    ❤️
                </motion.div>
            ))}

            <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50, rotateX: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.6, opacity: 0, y: 30 }}
                transition={{
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                    opacity: { duration: 0.3 }
                }}
                className="relative bg-linear-to-br from-pink-50 via-white to-rose-50 p-10 rounded-3xl shadow-2xl w-96 text-center flex flex-col gap-6 border-2 border-pink-200"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.1)'
                }}
            >
                {/* Success icon with pulse animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 10
                    }}
                    className="mx-auto"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-20 h-20 bg-linear-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <Heart className="w-10 h-10 text-white fill-white" />
                    </motion.div>

                    {/* Sparkle effects around the heart */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-8 left-1/2 -translate-x-1/2"
                    >
                        <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-12 -left-12" />
                        <Sparkles className="w-4 h-4 text-pink-400 absolute -top-10 left-16" />
                        <Sparkles className="w-6 h-6 text-purple-400 absolute top-2 -left-16" />
                    </motion.div>
                </motion.div>

                {/* Message text with staggered animation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-3"
                >
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl font-semibold text-pink-600 font-heading"
                    >
                        You unlocked it…
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-lg text-gray-700 font-fredoka leading-relaxed font-text"
                    >
                        Just like you unlock my heart every time.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-lg font-medium text-rose-600 font-heading"
                    >
                        Come inside, your surprise is waiting.
                    </motion.p>
                </motion.div>

                {/* Timer and sweet message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                    className="flex flex-col items-center gap-2"
                >
                    <motion.div
                        key={countdown}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold text-pink-500"
                    >
                        {countdown}
                    </motion.div>
                    <p className="text-sm text-gray-600 font-heading">
                        Taking you there in a heartbeat... 💕
                    </p>
                </motion.div>

                {/* Button with linear and glow effect */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 40px rgba(236, 72, 153, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/'}
                    className="mt-2 py-3 px-8 bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg cursor-pointer relative overflow-hidden"
                >
                    <motion.div
                        animate={{
                            x: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    />
                    <span className="relative z-10">Continue 💖</span>
                </motion.button>

                {/* Decorative corner accents */}
                <div className="absolute top-4 right-4 text-pink-300 text-2xl">✨</div>
                <div className="absolute bottom-4 left-4 text-rose-300 text-2xl">💕</div>
            </motion.div>
        </motion.div>
    );
};