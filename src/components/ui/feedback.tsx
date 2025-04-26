import {Check, X} from "lucide-react";

export const IncorrectFeedback = ({ CorrectAnswer }: { CorrectAnswer: string }) =>
    (
    <div className="mb-4">
        <div className="flex items-center text-red-500 mb-2">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                <X size={14} className="text-white"/>
            </div>
            <span className="text-lg font-bold">Incorrect</span>
        </div>
        <div className="text-red-400">
            <p>Bonne réponse :</p>
            <p className="text-lg">{CorrectAnswer}</p>
        </div>
    </div>
)

export const CorrectFeedback = () => (
    <div className="flex items-center text-green-500 mb-4">
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <Check size={14} className="text-white"/>
        </div>
        <span className="text-lg font-bold">Bien joué !</span>
    </div>)
