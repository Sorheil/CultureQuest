"use client"

import {motion} from "framer-motion"
import Image from "next/image"
import {ChevronLeft} from "lucide-react"

type Language = {
    id: string;
    name: string;
    flag: string;
};

export default function Step3({
                                  handleNext,
                                  languages,
                                  selectedLanguage,
                                  setSelectedLanguage
                              }: {
    handleNext: () => void;
    languages: Language[];
    selectedLanguage: string | null;
    setSelectedLanguage: (language: string) => void;
}) {

    const handleContinue = () => {
        if (selectedLanguage) {
            handleNext()
        }
    }

    return (
        <div className="mobile-container">
            <div className="px-6 py-4">
                <div className="flex items-start mb-8">
                    <Image src="/quest-owl.png" alt="CultureQuest Owl" width={80} height={80}/>
                    <div className="speech-bubble ml-4">
                        <p className="text-lg font-medium">Que veux-tu apprendre ?</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-6">CHOISISSEZ VOTRE LANGUE</h2>

                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
                    {languages.map((language, index) => (
                        <motion.div
                            key={language.id}
                            className={`language-option ${selectedLanguage === language.id ? "selected" : ""}`}
                            onClick={() => setSelectedLanguage(language.id)}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1, duration: 0.3}}
                        >
                            <span className="text-2xl">{language.flag}</span>
                            <span className="text-lg font-medium">{language.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                className="flex justify-center px-6"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3}}
            >
                <button
                    className={`bg-[#a73c1c] text-white py-4 px-12 rounded-full ${selectedLanguage ? "" : "opacity-50"}`}
                    onClick={handleContinue}>
                    CONTINUER
                </button>
            </motion.div>
        </div>
    )
}
