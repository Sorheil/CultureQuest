"use client"
import {Volume2} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import {CorrectFeedback, IncorrectFeedback} from "@/components/ui/feedback";


function playAudio() {
    console.log("hello");
}

type Option = {
    id: string
    label: string
    image?: string
}

type Question = {
    id: string
    word: string
    correctOption: Option
    options: Option[]
}


export default function Imagequiz({currentQuestion,gotoNextQuestion}: { currentQuestion: Question, gotoNextQuestion: () => void }) {

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [quizState, setQuizState] = useState<"question" | "correct" | "incorrect">("question");

    function handleValidate() {
        if (selectedOption?.id === currentQuestion.correctOption.id) {
            setQuizState("correct");
        } else {
            setQuizState("incorrect");
        }
    }

    function handleContinue() {
        gotoNextQuestion();
    }

    function handleOptionClick(id: string) {
        const option = currentQuestion.options.find((option: Option) => option.id === id) || null;
        setSelectedOption(option);
    }

    return (
        <>
            <div className="flex items-center mb-4 bg-blue-500 bg-opacity-20 p-3 rounded-xl">
                <button onClick={() => (playAudio())}
                        className="w-10 h-10 rounded-xl bg-blue-400 flex items-center justify-center mr-3">
                    <Volume2 size={20} className="text-white"/>
                </button>
                <span className="text-lg font-medium text-purple-400">{currentQuestion.word}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {currentQuestion.options.map((option) => (
                    <div
                        key={option.id}
                        className={`quiz-option border-2 
                        ${selectedOption?.id === option.id ? "border-blue-400" : "border-gray-700"}
                        ${quizState === "correct" && selectedOption?.id === option.id ? "bg-green-500 bg-opacity-10 border-green-500" : ""}
                        ${quizState === "incorrect" && selectedOption?.id === option.id ? "bg-red-500 bg-opacity-10 border-red-500" : ""}`}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        <div className="w-20 h-20 flex items-center justify-center mb-1">
                            <Image src={option.image || "/placeholder.svg"} alt={option.label} width={60} height={60}/>
                        </div>
                        <span
                            className={`text-base font-medium 
                            ${selectedOption?.id === option.id ? "text-blue-400" :""}
                            ${quizState === "correct" && selectedOption?.id === option.id ? " bg-opacity-10 text-green-500" : ""}
                            ${quizState === "incorrect" && selectedOption?.id === option.id ? "bg-opacity-10 text-red-500" : ""}`
                            }>
                                {option.label}
                        </span>
                    </div>
                ))}

            </div>


            {/*zone de feedback*/}
            {quizState === "correct" && CorrectFeedback()}
            {quizState === "incorrect" && (
                <IncorrectFeedback CorrectAnswer={currentQuestion.correctOption.label}/>
            )}

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
        </>
    )
}
//${selectedOption?.id === option.id ? "text-green-400" : "text-red-400"}