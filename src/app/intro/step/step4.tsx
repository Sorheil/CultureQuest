import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {useRouter} from "next/navigation";

export default function Step4() {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3}}
                    className="flex flex-col items-center w-full"
                >
                    <div className="speech-bubble mb-4 text-center">
                        <p className="text-lg font-medium">D&#39;accord ! C&#39;est parti pour ta première leçon de 2
                            minutes afin de te familiariser avec la langue.</p>
                    </div>

                    <motion.div
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: 0.2, duration: 0.5}}
                    >
                        <Image src="/quest-owl.png" alt="CultureQuest Owl" width={120} height={120}
                               className=" mt-4 mb-12"/>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="flex justify-center px-6"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3}}
            >
                <button className="bg-[#a73c1c] text-white py-4 px-12 rounded-full"
                        onClick={() => router.push('/quiz')}>
                    COMMENCER
                </button>
            </motion.div>

        </div>
    );
}
