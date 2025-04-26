"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, Volume2, Check } from "lucide-react"

// Types de quiz
type QuizType = "image" | "translation"

// Structure d'une question
interface Question {
  id: string
  type: QuizType
  word: string
  correctAnswer: string
  options: {
    id: string
    label: string
    image?: string
    textColor?: string
  }[]
  character?: {
    image: string
    speech: string
  }
}

export default function Quiz() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [quizState, setQuizState] = useState<"question" | "correct" | "incorrect">("question")
  const [progress, setProgress] = useState(10)

  // Questions de quiz
  const questions: Question[] = [
    {
      id: "q1",
      type: "image",
      word: "tea",
      correctAnswer: "the",
      options: [
        { id: "cafe", label: "café", image: "/coffee.png" },
        { id: "bagel", label: "bagel", image: "/bagel.png" },
        { id: "croissant", label: "croissant", image: "/croissant.png" },
        { id: "the", label: "thé", image: "/tea.png", textColor: "text-blue-400" },
      ],
    },
    {
      id: "q2",
      type: "image",
      word: "coffee",
      correctAnswer: "cafe",
      options: [
        { id: "bagel", label: "bagel", image: "/bagel.png" },
        { id: "cafe", label: "café", image: "/coffee.png", textColor: "text-green-400" },
        { id: "the", label: "thé", image: "/tea.png" },
        { id: "croissant", label: "croissant", image: "/croissant.png" },
      ],
    },
    {
      id: "q3",
      type: "translation",
      word: "thé",
      correctAnswer: "tea",
      options: [
        { id: "tea", label: "tea" },
        { id: "coffee", label: "coffee" },
        { id: "please", label: "please", textColor: "text-blue-400" },
      ],
      character: {
        image: "/character.png",
        speech: "thé",
      },
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionClick = (id: string) => {
    setSelectedOption(id)
  }

  const handleValidate = () => {
    if (!selectedOption) return

    if (selectedOption === currentQuestion.correctAnswer) {
      setQuizState("correct")
    } else {
      setQuizState("incorrect")
    }
  }

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setQuizState("question")
      setProgress(progress + Math.floor(90 / questions.length))
    } else {
      // Quiz terminé, rediriger vers une autre page
      router.push("/quiz/quiz-complete")
    }
  }

  const playAudio = () => {
    // Fonction pour jouer l'audio (à implémenter)
    console.log(`Playing audio for: ${currentQuestion.word}`)
  }

  // Rendu du quiz de type image
  const renderImageQuiz = () => (
    <>
      <div className="flex items-center mb-4 bg-blue-500 bg-opacity-20 p-3 rounded-xl">
        <button onClick={playAudio} className="w-10 h-10 rounded-xl bg-blue-400 flex items-center justify-center mr-3">
          <Volume2 size={20} className="text-white" />
        </button>
        <span className="text-lg font-medium text-purple-400">{currentQuestion.word}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            className={`quiz-option ${
              selectedOption === option.id
                ? quizState === "correct" && option.id === currentQuestion.correctAnswer
                  ? "border-2 border-green-500"
                  : quizState === "incorrect" && option.id === selectedOption
                    ? "border-2 border-red-500"
                    : "border-2 border-blue-400"
                : "border border-gray-700"
            }`}
            onClick={() => quizState === "question" && handleOptionClick(option.id)}
          >
            <div className="w-20 h-20 flex items-center justify-center mb-1">
              <Image src={option.image || "/placeholder.svg"} alt={option.label} width={60} height={60} />
            </div>
            <span
              className={`text-base font-medium ${
                quizState === "correct" && option.id === currentQuestion.correctAnswer
                  ? "text-green-400"
                  : quizState === "incorrect" && option.id === selectedOption
                    ? "text-red-400"
                    : option.textColor || "text-white"
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </>
  )

  // Rendu du quiz de type traduction
  const renderTranslationQuiz = () => (
    <>
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <Image
            src={currentQuestion.character?.image || "/placeholder.svg"}
            alt="Character"
            width={100}
            height={100}
          />
          <div className="speech-bubble absolute -right-24 top-4">
            <span className="text-lg">{currentQuestion.character?.speech}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-xl border ${
              selectedOption === option.id
                ? quizState === "correct" && option.id === currentQuestion.correctAnswer
                  ? "border-green-500 bg-green-500 bg-opacity-10"
                  : quizState === "incorrect" && option.id === selectedOption
                    ? "border-red-500 bg-red-500 bg-opacity-10"
                    : "border-blue-400 bg-blue-500 bg-opacity-10"
                : "border-gray-700"
            } cursor-pointer`}
            onClick={() => quizState === "question" && handleOptionClick(option.id)}
          >
            <span
              className={`text-center block w-full text-lg ${
                quizState === "correct" && option.id === currentQuestion.correctAnswer
                  ? "text-green-400"
                  : quizState === "incorrect" && option.id === selectedOption
                    ? "text-red-400"
                    : option.textColor || "text-white"
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </>
  )

  // Rendu du feedback pour réponse incorrecte
  const renderIncorrectFeedback = () => (
    <div className="mb-4">
      <div className="flex items-center text-red-500 mb-2">
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
          <X size={14} className="text-white" />
        </div>
        <span className="text-lg font-bold">Incorrect</span>
      </div>
      <div className="text-red-400">
        <p>Bonne réponse :</p>
        <p className="text-lg">{currentQuestion.options.find((o) => o.id === currentQuestion.correctAnswer)?.label}</p>
      </div>
    </div>
  )

  // Rendu du feedback pour réponse correcte
  const renderCorrectFeedback = () => (
    <div className="flex items-center text-green-500 mb-4">
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
        <Check size={14} className="text-white" />
      </div>
      <span className="text-lg font-bold">Bien joué !</span>
    </div>
  )

  return (
    <div className="mobile-container flex flex-col h-screen">

      {/* Progress bar */}
      <div className="px-4 py-2 flex items-center">
        <X size={24} className="text-gray-400" />
        <div className="w-full max-w-[300px] mx-4">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main content - using flex-1 to take remaining space */}
      <div className="px-6 flex-1 flex flex-col justify-between">
        {/* Top section */}
        <div>
          {/* Badge */}
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
              <span className="text-white text-xs">🔤</span>
            </div>
            <span className="text-base font-bold text-purple-400">NOUVEAU MOT</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4">
            {currentQuestion.type === "image" ? "Choisis la bonne image" : "Choisis la bonne traduction"}
          </h2>

          {/* Quiz content based on type */}
          {currentQuestion.type === "image" ? renderImageQuiz() : renderTranslationQuiz()}

          {/* Feedback for incorrect answer */}
          {quizState === "incorrect" && renderIncorrectFeedback()}

          {/* Feedback for correct answer */}
          {quizState === "correct" && renderCorrectFeedback()}
        </div>

        {/* Button */}
        <div className="mb-6">
          {quizState === "question" ? (
            <button
              className={`w-full py-3 px-4 rounded-full font-bold uppercase ${
                selectedOption ? "bg-[#8bc34a] text-black" : "bg-gray-600 text-gray-400"
              }`}
              onClick={handleValidate}
              disabled={!selectedOption}
            >
              VALIDER
            </button>
          ) : quizState === "correct" ? (
            <button className="quest-button" onClick={handleContinue}>
              CONTINUER
            </button>
          ) : (
            <button
              className="w-full py-3 px-4 rounded-full font-bold uppercase bg-red-500 text-white"
              onClick={handleContinue}
            >
              D&apos;ACCORD
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
