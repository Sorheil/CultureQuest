"use client";
import Image from "next/image";
import {useState} from "react";
import {CorrectFeedback, IncorrectFeedback} from "@/components/ui/feedback";
import {Volume2} from "lucide-react";

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

    const playSound = (url:string|undefined) => {
        const audio = new Audio(url);
        audio.play();
    };

    return (
        <>
            <div className="flex items-center mb-4 bg-[#a73c1c]/50 p-3 rounded-xl">
                <button
                    onClick={() => playSound(currentQuestion.character?.speech)}
                    className="w-10 h-10 rounded-xl bg-[#a73c1c] flex items-center justify-center mr-3"
                >
                    <Volume2 size={20} className="text-white" />
                </button>
                <span className="text-lg font-medium ">{currentQuestion.word}</span>
            </div>

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
                        <span className="text-lg">{currentQuestion.word}</span>
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
                                        : "border-[#a73c1c] bg-[#a73c1c] bg-opacity-10"
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
                        className={`w-full py-3 px-4  font-bold uppercase text-white rounded-full ${
                            selectedOption ? "bg-[#a73c1c]" : "bg-[#a73c1c]/75"
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
