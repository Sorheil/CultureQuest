"use client";
import Image from "next/image";
import {useState} from "react";
import {CorrectFeedback, IncorrectFeedback} from "@/components/ui/feedback";

// Types
type Option = {
    id: string;
    label: string;
};

type Character = {
    image: string;
    speech: string;
};

type Question = {
    id: string,
    word: string,
    correctOption: Option,
    options: Option[],
    character?: Character,
};


export default function TranslationQuiz({currentQuestion , gotoNextQuestion}: {currentQuestion: Question , gotoNextQuestion: () => void}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [quizState, setQuizState] = useState<"question" | "correct" | "incorrect">("question");

    function handleOptionClick(id: string) {
        setSelectedOption(id);
    }

    function handleValidate() {
        if (selectedOption === currentQuestion.correctOption.id) {
            setQuizState("correct");
        } else {
            setQuizState("incorrect");
        }
    }

    function handleContinue() {
        gotoNextQuestion();
    }

    return (
        <>
            {/* Zone personnage + bulle */}
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

            {/* Zone options */}
            <div className="space-y-3 mb-4">
                {currentQuestion.options.map((option) => (
                    <div
                        key={option.id}
                        className={`p-4 rounded-xl border cursor-pointer ${
                            selectedOption === option.id
                                ? quizState === "correct" && option.id === currentQuestion.correctOption.id
                                    ? "border-green-500 bg-green-500 bg-opacity-10"
                                    : quizState === "incorrect" && option.id === selectedOption
                                        ? "border-red-500 bg-red-500 bg-opacity-10"
                                        : "border-blue-400 bg-blue-500 bg-opacity-10"
                                : "border-gray-700"
                        }`}
                        onClick={() => quizState === "question" && handleOptionClick(option.id)}
                    >
            <span
                className={`text-center block w-full text-lg ${
                    quizState === "correct" && option.id === currentQuestion.correctOption.id
                        ? "text-green-400"
                        : quizState === "incorrect" && option.id === selectedOption
                            ? "text-red-400"
                            : selectedOption === option.id || "text-white"
                }`}
            >
              {option.label}
            </span>
                    </div>
                ))}
            </div>

            {/* Feedback */}
            {quizState === "correct" && CorrectFeedback()}
            {quizState === "incorrect" && (
                <IncorrectFeedback
                    CorrectAnswer={currentQuestion.options.find(opt => opt.id === currentQuestion.correctOption.id)?.label || ""}/>
            )}

            {/* Bouton d'action */}
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
                ) : (
                    <button
                        className="w-full py-3 px-4 rounded-full font-bold uppercase bg-blue-500 text-white"
                        onClick={handleContinue}
                    >
                        CONTINUER
                    </button>
                )}
            </div>
        </>
    );
}
