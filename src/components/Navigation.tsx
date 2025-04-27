import {Home,User} from "lucide-react";
import type React from "react";

export default function Navigation() {
    return (
        <div className="border-t border-gray-800 px-4 py-3 flex justify-around">
            <button className="flex flex-col items-center text-[#a73c1c]">
                <div className="w-8 h-8 rounded-lg border-2 border-[#a73c1c] flex items-center justify-center mb-1">
                    <Home size={20}/>
                </div>
                <span className="text-xs">Accueil</span>
            </button>

            <button className="flex flex-col items-center text-gray-500">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                    <User size={20}/>
                </div>
                <span className="text-xs">Profil</span>
            </button>

        </div>
    )
}