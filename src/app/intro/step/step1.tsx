import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Step1({ handleNext }: { handleNext: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center w-full"
                >
                    <div className="speech-bubble mb-4 text-center">
                        <p className="text-lg font-medium">Salut, moi c&#39;est Quest ! Je t&#39;emmène découvrir une aventure où
                            tu apprendras une langue tout en explorant l&#39;art et la culture du Cameroun.</p>
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Image src="/avatar-hello.png" alt="CultureQuest Owl" width={120} height={120} className=" mt-4 mb-12" />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="flex justify-center px-6"
                onClick={handleNext}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <button className="bg-[#a73c1c] text-white py-4 px-12 rounded-full" onClick={handleNext}>
                    CONTINUER
                </button>
            </motion.div>
        </div>
    );
}
