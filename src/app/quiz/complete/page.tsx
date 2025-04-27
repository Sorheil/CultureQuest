"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export default function QuizComplete() {
    const router = useRouter()

    return (
        <div className="mobile-container flex flex-col h-screen">

            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image src="/quest-owl.png" alt="CultureQuest Owl" width={120} height={120} className="mb-6" />
                </motion.div>

                <motion.h1
                    className="text-2xl font-bold mb-4 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Félicitations !
                </motion.h1>

                <motion.p
                    className="text-center text-gray-300 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Vous avez terminé votre leçon, passons a la suite.
                </motion.p>

                <motion.div
                    className="w-full flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <button className="bg-[#a73c1c] text-white py-4 px-12 rounded-full" onClick={() => router.push("/")}>
                        CONTINUER
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
