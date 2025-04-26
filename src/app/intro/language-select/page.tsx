"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export default function LanguageSelect() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const languages = [
    { id: "bassa", name: "Bassa", flag: "🇨🇲" },
    { id: "medumba", name: "Medumba", flag: "🇨🇲" },
    { id: "yemba", name: "Yemba", flag: "🇨🇲" },
  ]

  const handleContinue = () => {
    if (selectedLanguage) {
      router.push("/quiz")
    }
  }

  return (
    <div className="mobile-container">
      <div className="p-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-800">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="flex items-start mb-8">
          <Image src="/quest-owl.png" alt="CultureQuest Owl" width={80} height={80} />
          <div className="speech-bubble ml-4">
            <p className="text-lg font-medium">Que veux-tu apprendre ?</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">CHOISISSEZ VOTRE LANGUE</h2>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {languages.map((language, index) => (
            <motion.div
              key={language.id}
              className={`language-option ${selectedLanguage === language.id ? "selected" : ""}`}
              onClick={() => setSelectedLanguage(language.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <span className="text-2xl">{language.flag}</span>
              <span className="text-lg font-medium">{language.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 px-6">
        <button className="quest-button" onClick={handleContinue} disabled={!selectedLanguage}>
          CONTINUER
        </button>
      </div>
    </div>
  )
}
