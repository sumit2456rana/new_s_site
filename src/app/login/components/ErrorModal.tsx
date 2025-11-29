import { motion } from "framer-motion";

export default function ErrorModal({ onClose, message }: { onClose: () => void, message: { emoji: string, text: string } }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <motion.div
                initial={{ scale: 0.6, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-2xl text-white p-8 rounded-3xl shadow-2xl w-80 text-center flex flex-col gap-4"
            >
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-4xl"
                >
                    {message.emoji}
                </motion.div>

                <p className="text-xl font-semibold font-fredoka">
                    {message.text}
                </p>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose} // closes instantly
                    className="mt-2 py-2 px-6 bg-pink-500 rounded-full shadow-lg cursor-pointer"
                >
                    {message.text === "A blank key won’t open my heart… type the magic word 💞" ? "Close" : "Try again"}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
