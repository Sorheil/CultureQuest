"use client"
import { X } from "lucide-react"
import { useState } from "react"
import Imagequiz from "@/app/quiz/quiztype/imagequiz"
import TranslationQuiz from "@/app/quiz/quiztype/TranslationQuiz"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { getQuestionsByChapterId } from "@/Helper/chapterAndQuizHelper"
import CultureQuiz from "@/app/quiz/quiztype/cultureQuiz"

type Option = {
    id: string
    label: string
    image?: string
}

type Character = {
    image: string
    speech: string
}

type Question =
    | {
    id: string
    type: string
    word: string
    chapterId: string
    correctOption: Option
    options: Option[]
    character?: Character
}
    | undefined

export default function Quiz() {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const ListQuestions = getQuestionsByChapterId(params.get("chapterId"))
    const [questions] = useState<Question[]>(ListQuestions)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const [progress, setProgress] = useState(10)

    // Add a key state to force re-render of quiz components
    const [quizKey, setQuizKey] = useState<number>(0)
    const router = useRouter()

    function gotoNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setProgress(progress + Math.floor(90 / questions.length))
            // Increment the key to force a re-render of the quiz component
            setQuizKey(quizKey + 1)
        } else {
            router.push("/quiz/quiz-complete")
        }
    }

    return (
        <div className="mobile-container flex flex-col h-screen">
            {/* Progress bar */}
            <div className="px-4 py-2 flex items-center">
                <X size={24} className="text-gray-400 cursor-pointer" onClick={() => router.push("/")} />
                <div className="w-full max-w-[300px] mx-4">
                    <div className="progress-bar ">
                        <div
                            className="progress-bar-fill bg-gradient-to-r from-[#a73c1c]/30 to-[#a73c1c]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Main content - using flex-1 to take remaining space */}
            <div className="px-6 flex-1 flex flex-col justify-between">
                {questions[currentQuestionIndex]?.type === "image" && (
                    <Imagequiz
                        key={quizKey}
                        currentQuestion={questions[currentQuestionIndex]}
                        gotoNextQuestion={gotoNextQuestion}
                    />
                )}
                {questions[currentQuestionIndex]?.type === "translation" && (
                    <TranslationQuiz
                        key={quizKey}
                        currentQuestion={questions[currentQuestionIndex]}
                        gotoNextQuestion={gotoNextQuestion}
                    />
                )}

                {questions[currentQuestionIndex]?.type === "culture" && (
                    <CultureQuiz
                        key={quizKey}
                        currentQuestion={questions[currentQuestionIndex]}
                        gotoNextQuestion={gotoNextQuestion}
                    />
                )}
            </div>
        </div>
    )
}
