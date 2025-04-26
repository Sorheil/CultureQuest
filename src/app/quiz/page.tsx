"use client"
import {X} from "lucide-react";
import {useState} from "react";
import Imagequiz from "@/app/quiz/quiztype/imagequiz";
import TranslationQuiz from "@/app/quiz/quiztype/TranslationQuiz";
import {useRouter} from "next/navigation";

type Option = {
    id: string
    label: string
    image?: string
}

type Character = {
    image: string
    speech: string
}

type Question = {
    id: string
    type: string
    word: string
    correctOption: Option
    options: Option[]
    character?: Character
}


const LISTOFQUESTIONS: Question[] = [
    {
        id: "q1",
        type: "image",
        word: "tea",
        correctOption: {id: "the", label: "thé", image: "/tea.png"},
        options: [
            {id: "cafe", label: "café", image: "/coffee.png"},
            {id: "bagel", label: "bagel", image: "/bagel.png"},
            {id: "croissant", label: "croissant", image: "/croissant.png"},
            {id: "the", label: "thé", image: "/tea.png"},
        ],
    },
    {
        id: "q2",
        type: "image",
        word: "coffee",
        correctOption: {id: "cafe", label: "café", image: "/coffee.png"},
        options: [
            {id: "bagel", label: "bagel", image: "/bagel.png"},
            {id: "cafe", label: "café", image: "/coffee.png"},
            {id: "the", label: "thé", image: "/tea.png"},
            {id: "croissant", label: "croissant", image: "/croissant.png"},
        ],
    },
    {
        id: "q3",
        type: "translation",
        word: "thé",
        correctOption: {id: "tea", label: "tea"},
        options: [
            {id: "tea", label: "tea"},
            {id: "coffee", label: "coffee"},
            {id: "please", label: "please",},
        ],
        character: {
            image: "/character.png",
            speech: "thé",
        },
    },
]

export default function Test() {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [progress, setProgress] = useState(10)
    const[questions, setQuestions] = useState<Question[]>(LISTOFQUESTIONS)
    const router = useRouter()

    function gotoNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setProgress(progress + Math.floor(90 / questions.length))
        }else
        {
            router.push("/quiz/quiz-complete")
        }
    }

    return (
        <div className="mobile-container flex flex-col h-screen">
            {/* Progress bar */}
            <div className="px-4 py-2 flex items-center">
                <X size={24} className="text-gray-400"/>
                <div className="w-full max-w-[300px] mx-4">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>

            {/* Main content - using flex-1 to take remaining space */}
            <div className="px-6 flex-1 flex flex-col justify-between">
                {questions[currentQuestionIndex].type === "image" && <Imagequiz
                    currentQuestion={questions[currentQuestionIndex]}
                    gotoNextQuestion={gotoNextQuestion}
                />}
                {questions[currentQuestionIndex].type === "translation" && <TranslationQuiz currentQuestion={questions[currentQuestionIndex]}
                                                                                          gotoNextQuestion={gotoNextQuestion}/>}
            </div>

        </div>

    )
        ;
}

