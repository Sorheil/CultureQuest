"use client"

import type React from "react"

import {useState} from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import {Plus, Flame, Heart,} from "lucide-react"
import Navigation from "@/components/Navigation";
import ChapterList from "@/components/chapter-list";
import TopNavigation from "@/components/ui/topNavigation";

// Structure d'un chapitre
interface Chapter {
    id: string
    title: string
    description: string
    level: number
    lessons: number
    unlocked: boolean
    completed: boolean
    progress: number // 0-100
    image: string
}

export default function Main() {
    const router = useRouter()
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)

    // État des chapitres
    const [chapters] = useState<Chapter[]>([
        {
            id: "ch1",
            title: "Les bases",
            description: "Apprenez les mots essentiels",
            level: 1,
            lessons: 5,
            unlocked: true,
            completed: true,
            progress: 100,
            image: "/chapter1.png",
        },
        {
            id: "ch2",
            title: "Salutations",
            description: "Comment se présenter",
            level: 2,
            lessons: 4,
            unlocked: true,
            completed: false,
            progress: 50,
            image: "/chapter2.png",
        },
        {
            id: "ch3",
            title: "La famille",
            description: "Parler de sa famille",
            level: 3,
            lessons: 6,
            unlocked: false,
            completed: false,
            progress: 0,
            image: "/chapter3.png",
        },
        {
            id: "ch4",
            title: "La nourriture",
            description: "Vocabulaire culinaire",
            level: 4,
            lessons: 7,
            unlocked: false,
            completed: false,
            progress: 0,
            image: "/chapter4.png",
        },
        {
            id: "ch5",
            title: "Les traditions",
            description: "Culture et coutumes",
            level: 5,
            lessons: 8,
            unlocked: false,
            completed: false,
            progress: 0,
            image: "/chapter5.png",
        },
    ])

    return (
        <div className="mobile-container flex flex-col h-screen dark:bg-[#a73c1c]/20">

            <TopNavigation/>
            {/*  list */}
            <ChapterList chapters={chapters}/>
            <Navigation/>
        </div>
    )
}
