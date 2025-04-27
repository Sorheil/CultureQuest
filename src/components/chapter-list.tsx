"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {Check, Lock } from "lucide-react"

interface Chapter {
    id: string
    title: string
    description: string
    level: number
    lessons: number
    unlocked: boolean
    completed: boolean
    progress: number
    image: string
}

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
    const router = useRouter()
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null)

    const handleChapterClick = (chapter: Chapter) => {
        if (chapter.unlocked) {
            router.push(`/quiz`)
        }
    }

    // Close context menu when clicking outside
    const handleClickOutside = () => {
        if (selectedChapter) {
            setSelectedChapter(null)
        }
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-4" onClick={handleClickOutside}>
            <h2 className="text-xl font-bold mb-4">Chapitres</h2>
            {chapters.map((chapter) => (
                <div
                    key={chapter.id}
                    className={`mb-4 rounded-xl border ${
                        chapter.unlocked ? "border-gray-700 hover:border-gray-500 cursor-pointer" : "border-gray-800"
                    } overflow-hidden relative transition-colors duration-200`}
                    onClick={() => handleChapterClick(chapter)}
                    role="button"
                    tabIndex={chapter.unlocked ? 0 : -1}
                    aria-disabled={!chapter.unlocked}
                >
                    <div className="relative">
                        <div className={`h-24 w-full ${chapter.unlocked ? "" : "filter grayscale opacity-50"}`}>
                            <Image
                                src={chapter.image || "/placeholder.svg?height=96&width=384"}
                                alt={chapter.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Level badge */}
                        <div className="absolute top-2 left-2 bg-[#a73c1c] text-white px-2 py-1 rounded-md text-xs font-bold">
                            Niveau {chapter.level}
                        </div>

                        {/* Lock or completion icon */}
                        {!chapter.unlocked ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                    <Lock size={24} className="text-gray-400" />
                                </div>
                            </div>
                        ) : chapter.completed ? (
                            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#a73c1c] flex items-center justify-center">
                                <Check size={16} className="text-white " />
                            </div>
                        ) : null}

                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className={`text-lg font-bold ${chapter.unlocked ? "text-white" : "text-gray-500"}`}>
                                {chapter.title}
                            </h3>
                            <span className={`text-sm ${chapter.unlocked ? "text-gray-300" : "text-gray-600"}`}>
                {chapter.lessons} leçons
              </span>
                        </div>

                        <p className={`text-sm mb-3 ${chapter.unlocked ? "text-gray-400" : "text-gray-600"}`}>
                            {chapter.description}
                        </p>

                        {/* Progress bar */}
                        {chapter.unlocked && (
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#a73c1c]/30 to-[#a73c1c] transition-all duration-300"
                                    style={{ width: `${chapter.progress}%` }}
                                    role="progressbar"
                                    aria-valuenow={chapter.progress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        )}
                    </div>

                </div>
            ))}
        </div>
    )
}
