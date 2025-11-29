"use client"
import { MotionDiv } from '@/components/MotionDiv';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { verifyKey } from '../actions/verify';
import { Loader, Unlock } from 'lucide-react';
import PartyBash from '@/components/PartyBash';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import { useAuth } from '@/context/AuthContext';

const successMessage = {
    emoji: "❤️",
    text: "You unlocked it… Just like you unlock my heart every time. Come inside, your surprise is waiting."
};

const errorMessages = [
    { emoji: "😏", text: "Wrong key, babe. But you can try again — I like seeing you work for it" },
    { emoji: "👀", text: "Nope! That didn’t open anything… except maybe my curiosity" },
    { emoji: "💗", text: "Try again, sweetheart. I know you know this one." },
    { emoji: "🤔", text: "Hmm… that doesn’t feel like our word. Try again, my love." },
    { emoji: "💘", text: "Your key didn’t unlock my heart… maybe try the one that always does?" },
    { emoji: "💞", text: "You’re close… I can feel it. Keep trying!" },
    { emoji: "🚫", text: "Access denied! The gates of love remain sealed… for now." },
    { emoji: "🛡️", text: "Incorrect key detected. Heart security activated." },
    { emoji: "😤", text: "You have angered the Heart Gods! Try again carefully." },
    { emoji: "💖", text: "Not the one I was hoping for… but I believe in you." }
];

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    // ⭐ ADDED success state
    const [showSuccess, setShowSuccess] = useState(false);

    const [bash, setBash] = useState(false);

    const [message, setMessage] = useState({
        emoji: "",
        text: "",
    });
    useEffect(() => { console.log(isAuthenticated); }, [isAuthenticated])
    const handleSubmit = async () => {
        if (!key) {
            setMessage({
                emoji: "😒",
                text: "A blank key won’t open my heart… type the magic word 💞",
            })
            setShowError(true);
            return;
        }
        setLoading(true);
        try {
            const res = await verifyKey(key);
            if (res) {
                // setIsAuthenticated(true);

                setBash(true); // party animation

                // ⭐ SHOW SUCCESS POPUP
                setMessage(successMessage);
                setShowSuccess(true);
                setIsAuthenticated(true);
            } else {
                setKey("");
                const random = Math.floor(Math.random() * 10)
                setMessage(errorMessages[random]);
                setShowError(true);
                setBash(false);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <PartyBash trigger={bash} />

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-20 w-full max-w-xl flex flex-col justify-center items-center gap-6 rounded-xl shadow-2xl bg-white/10 backdrop-blur-2xl text-white px-5 py-8"
            >
                {/* ❤️ FRAMER HEARTBEAT */}
                <MotionDiv
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl font-text"
                >
                    ❤️
                </MotionDiv>

                <h1 className="text-2xl sm:text-3xl font-semibold text-center leading-relaxed font-text font-heading">
                    This heart you see? <br />
                    Yeah… it’s been beating nonstop waiting for you 😌
                </h1>

                <p className='font-text text-zinc-400 font-semibold text-center'>
                    Enter the secret key and step into my little world. 💓
                </p>

                <input
                    type="password"
                    placeholder="Enter secret key… 💗"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-80 px-6 py-3 rounded-3xl bg-white/20 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/30 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-pink-500/20 font-nunito text-center"
                />

                <p className='text-blue-400 font-heading'>Hint: A word that makes us together 🤔</p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-1 sm:gap-2 py-3 px-8 text-center rounded-full mt-2 bg-pink-500/80 hover:bg-pink-500 text-white font-semibold text-base shadow-lg shadow-pink-500/30 hover:shadow-pink-500/60 backdrop-blur-xl font-fredoka cursor-pointer"
                >
                    {loading ? (
                        <>
                            <Loader className='animate-spin' />
                            <span className='text-xs sm:text-base'>Wait babe… I’m checking if you’re the one 😏</span>
                        </>
                    ) :
                        <>
                            <Unlock className='h-5 w-5 mb-1' />
                            <span>Unlock My Heart 💞</span>
                        </>}
                </motion.button>
            </motion.div>

            {/* ❌ ERROR POPUP */}
            <AnimatePresence mode="wait" onExitComplete={() => setShowError(false)}>
                {showError && (
                    <ErrorModal onClose={() => setShowError(false)} message={message} />
                )}
            </AnimatePresence>

            {/* ⭐ SUCCESS POPUP */}
            <AnimatePresence mode="wait">
                {showSuccess && (
                    <SuccessModal />
                )}
            </AnimatePresence>
        </>
    );
};

export default Login;
