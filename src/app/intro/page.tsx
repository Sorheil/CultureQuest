"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export default function Intro() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const introSteps = [
    {
      message: "Salut, moi c'est Quest !",
      delay: 0.2,
    },
    {
      message: "Réponds à 1 petites questions avant de commencer ta première leçon !",
      delay: 0.2,
    },
    {
      message: "D'accord ! C'est parti pour ta première leçon de 2 minutes.",
      delay: 0.2,
    },
  ]

  const handleNext = () => {
    if (step < introSteps.length - 1) {
      setStep(step + 1)
    } else {
      router.push("/intro/language-select")
    }
  }

  return (
    <div className="mobile-container">
      
      <div className="p-4">
        <button onClick={()=>step > 0 && setStep(step - 1)} className={`p-2 rounded-full hover:bg-gray-800 ${step === 0 ? 'hidden' : ''}`} >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            <div className="speech-bubble mb-4 text-center">
              <p className="text-lg font-medium">{introSteps[step].message}</p>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: introSteps[step].delay, duration: 0.5 }}
            >
              <Image src="/quest-owl.png" alt="CultureQuest Owl" width={120} height={120} className="mb-12" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-0 right-0 px-6">
        <button className="quest-button" onClick={handleNext}>
          CONTINUER
        </button>
      </div>
    </div>
  )
}
