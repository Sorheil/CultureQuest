"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { CorrectFeedback, IncorrectFeedback } from "@/components/ui/feedback"
import Introduction from "@/app/quiz/quiztype/introduction"
import {getChapterById} from "@/Helper/chapterAndQuizHelper";

type Option = {
    id: string
    label: string
    image?: string
}

type Question = {
    id: string
    word: string
    chapterId: string
    correctOption: Option
    options: Option[]
}

export default function CultureQuiz({
                                        currentQuestion,
                                        gotoNextQuestion,
                                    }: {
    currentQuestion: Question
    gotoNextQuestion: () => void
}) {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)
    const [quizState, setQuizState] = useState<"question" | "correct" | "incorrect">("question")
    const [showIntroduction, setShowIntroduction] = useState<boolean>(false)

    // Check localStorage on component mount to see if intro has been shown
    useEffect(() => {
        const introShown = localStorage.getItem(`culture-intro-shown-${currentQuestion.chapterId}`)
        // Si l'introduction n'a jamais été vue, on l'affiche automatiquement
        if (introShown !== "true") {
            setShowIntroduction(true)
            // Marquer comme vue pour les prochaines fois
            localStorage.setItem(`culture-intro-shown-${currentQuestion.chapterId}`, "true")
        }
    }, [currentQuestion.chapterId])

    function handleValidate() {
        if (selectedOption?.id === currentQuestion.correctOption.id) {
            setQuizState("correct")
        } else {
            setQuizState("incorrect")
        }
    }

    function handleContinue() {
        gotoNextQuestion()
    }

    function handleOptionClick(id: string) {
        const option = currentQuestion.options.find((option: Option) => option.id === id) || null
        setSelectedOption(option)
    }

    function handleIntroductionComplete() {
        setShowIntroduction(false)
    }

    // Introduction text - you can customize this
    const introductionText =  getChapterById(currentQuestion.chapterId)?.introduction

    return (
        <>
            {showIntroduction ? (
                <Introduction introduction={introductionText} onContinue={handleIntroductionComplete} />
            ) : (
                <>
                    {/* Zone personnage + bulle */}
                    <div className="flex items-center justify-center mb-4">
                        <div className="">
                            <Image src={"/quest-owl.png"} alt="Characters" width={100} height={100} />
                            <div className="speech-bubble ">
                                <span className="text-lg">{currentQuestion.word}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bouton pour revoir l'introduction */}
                    <button onClick={() => setShowIntroduction(true)} className="text-sm text-[#a73c1c] mb-4 underline">
                        Revoir l&#39;introduction
                    </button>

                    <div className="space-y-3 mb-4">
                        {currentQuestion.options.map((option) => (
                            <div
                                key={option.id}
                                className={`p-4 rounded-xl border cursor-pointer ${
                                    selectedOption?.id === option.id
                                        ? quizState === "correct" && option.id === currentQuestion.correctOption.id
                                            ? "border-green-500 bg-green-500 bg-opacity-10"
                                            : quizState === "incorrect" && option.id === selectedOption.id
                                                ? "border-red-500 bg-red-500 bg-opacity-10"
                                                : "border-[#a73c1c] bg-[#a73c1c] bg-opacity-10"
                                        : "border-gray-700"
                                }`}
                                onClick={() => quizState === "question" && handleOptionClick(option.id)}
                            >
                <span
                    className={`text-center block w-full text-lg ${
                        quizState === "correct" && option.id === currentQuestion.correctOption.id
                            ? "text-green-400"
                            : quizState === "incorrect" && option.id === selectedOption?.id
                                ? "text-red-400"
                                : selectedOption?.id === option.id || "text-white"
                    }`}
                >
                  {option.label}
                </span>
                            </div>
                        ))}
                    </div>

                    {/* Zone de feedback */}
                    {quizState === "correct" && <CorrectFeedback />}
                    {quizState === "incorrect" && <IncorrectFeedback CorrectAnswer={currentQuestion.correctOption.label} />}

                    <div className="mb-6">
                        {quizState === "question" ? (
                            <button
                                className={`w-full py-3 px-4 font-bold uppercase text-white rounded-full ${
                                    selectedOption ? "bg-[#a73c1c]" : "bg-[#a73c1c]/75"
                                }`}
                                onClick={handleValidate}
                                disabled={!selectedOption}
                            >
                                VALIDER
                            </button>
                        ) : quizState === "correct" ? (
                            <button
                                className="w-full py-3 px-4 rounded-full font-bold uppercase bg-green-500 text-white"
                                onClick={handleContinue}
                            >
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
                </>
            )}
        </>
    )
}
