"use client"

import { useState } from "react"

import { ChevronLeft } from "lucide-react"
import Step1 from "@/app/intro/step/step1";
import Step2 from "@/app/intro/step/step2";
import Step3 from "@/app/intro/step/step3";
import Step4 from "@/app/intro/step/step4";


export default function Intro() {
  const [step, setStep] = useState(0)
  const maxSteps = 3
    const languages = [
        { id: "bassa", name: "Bassa", flag: "🇨🇲" },
        { id: "medumba", name: "Medumba", flag: "🇨🇲" },
        { id: "yemba", name: "Yemba", flag: "🇨🇲" },
    ]
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const handleNext = () => {
    if (step < maxSteps) {
      setStep(step + 1)
    }
  }

  return (
    <div className="mobile-container">
      
      <div className="p-4">
        <button onClick={()=>step > 0 && setStep(step - 1)} className={`p-2 rounded-full hover:bg-gray-800 ${step === 0 ? 'hidden' : ''}`} >
          <ChevronLeft size={24} />
        </button>
      </div>

      {step === 0 && <Step1 handleNext={handleNext} />}
      {step === 1 && <Step2 handleNext={handleNext} />}
      {step === 2 && <Step3 handleNext={handleNext}
                            languages={languages}
                            selectedLanguage={selectedLanguage}
                            setSelectedLanguage={setSelectedLanguage} />}
      {step === 3 && <Step4 />}


      </div>
  )
}
