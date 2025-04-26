"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, Check, Plus, Flame, Heart, MoreVertical, Play, BookOpen, Share, Star } from "lucide-react"

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

export default function Chapters() {
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

  const handleChapterClick = (chapter: Chapter) => {
    if (chapter.unlocked) {
      router.push(`/quiz?chapter=${chapter.id}`)
    }
  }

  const toggleContextMenu = (chapterId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Empêche le déclenchement du handleChapterClick
    setSelectedChapter(selectedChapter === chapterId ? null : chapterId)
  }

  const handleContextMenuAction = (action: string, chapterId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Empêche la propagation du clic

    // Implémentez les actions du menu contextuel ici
    switch (action) {
      case "start":
        router.push(`/quiz?chapter=${chapterId}`)
        break
      case "info":
        router.push(`/chapter-info?id=${chapterId}`)
        break
      case "share":
        // Logique de partage
        console.log(`Partager le chapitre ${chapterId}`)
        break
      case "favorite":
        // Logique pour ajouter aux favoris
        console.log(`Ajouter le chapitre ${chapterId} aux favoris`)
        break
      default:
        break
    }

    setSelectedChapter(null) // Ferme le menu après l'action
  }

  // Ferme le menu contextuel si on clique ailleurs sur la page
  const handlePageClick = () => {
    if (selectedChapter) {
      setSelectedChapter(null)
    }
    if (showLanguageMenu) {
      setShowLanguageMenu(false)
    }
  }

  return (
    <div className="mobile-container flex flex-col h-screen" onClick={handlePageClick}>

      {/* Top stats bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#1e2b32] border-b border-gray-800">
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            setShowLanguageMenu(!showLanguageMenu)
          }}
        >
          <Image src="/flag-cm.png" alt="Cameroun" width={28} height={20} className="rounded-md" />
        </div>
        <div className="flex items-center">
          <Flame className="text-orange-400 w-5 h-5 mr-1" />
          <span className="text-orange-400 font-bold">1</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-blue-400 rounded mr-1"></div>
          <span className="text-blue-400 font-bold">500</span>
        </div>
        <div className="flex items-center">
          <Heart className="text-red-400 w-5 h-5 mr-1" />
          <span className="text-red-400 font-bold">5</span>
        </div>
      </div>

      {/* Language menu popup */}
      {showLanguageMenu && (
        <div className="absolute left-0 top-[64px] w-full bg-[#1e2b32] border-b border-gray-800 z-20 shadow-lg">
          {/* Language selection */}
          <div className="px-4 py-3 border-b border-gray-800">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg border-2 border-blue-400 p-1 mb-1">
                  <div className="w-full h-full rounded bg-[#1e2b32] flex items-center justify-center">
                    <Image src="/flag-cm.png" alt="Cameroun" width={40} height={30} className="rounded" />
                  </div>
                </div>
                <span className="text-sm font-medium">Bassa</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg border border-gray-600 flex items-center justify-center mb-1">
                  <Plus className="text-gray-400 w-6 h-6" />
                </div>
                <span className="text-sm text-gray-400">Cours</span>
              </div>
            </div>
          </div>

          {/* New courses section */}
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="text-xl font-bold mb-4">Nouveaux cours</h2>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-blue-500 flex items-center justify-center mb-1">
                  <span className="text-white text-xl font-bold">≠</span>
                </div>
                <span className="text-sm">Maths</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-purple-500 flex items-center justify-center mb-1">
                  <span className="text-white text-xl">♪</span>
                </div>
                <span className="text-sm">Musique</span>
              </div>
            </div>
          </div>
        </div>
      )}

    

      {/* Chapters list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-xl font-bold mb-4">Chapitres</h2>
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`mb-4 rounded-xl border ${
              chapter.unlocked ? "border-gray-700" : "border-gray-800"
            } overflow-hidden relative`}
            onClick={() => handleChapterClick(chapter)}
          >
            <div className="relative">
              <div className={`h-24 w-full ${chapter.unlocked ? "" : "filter grayscale opacity-50"}`}>
                <Image src={chapter.image || "/placeholder.svg"} alt={chapter.title} fill className="object-cover" />
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
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              ) : null}

              {/* Context menu button (only for unlocked chapters) */}
              {chapter.unlocked && (
                <button
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center"
                  onClick={(e) => toggleContextMenu(chapter.id, e)}
                >
                  <MoreVertical size={16} className="text-white" />
                </button>
              )}
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
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${chapter.progress}%` }}></div>
                </div>
              )}
            </div>

            {/* Context menu */}
            {selectedChapter === chapter.id && chapter.unlocked && (
              <div className="absolute right-4 top-24 w-48 bg-[#1e2b32] border border-gray-700 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-800 flex items-center cursor-pointer"
                    onClick={(e) => handleContextMenuAction("start", chapter.id, e)}
                  >
                    <Play size={16} className="mr-2 text-green-500" />
                    <span>Commencer</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-800 flex items-center cursor-pointer"
                    onClick={(e) => handleContextMenuAction("info", chapter.id, e)}
                  >
                    <BookOpen size={16} className="mr-2 text-blue-400" />
                    <span>Détails</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-800 flex items-center cursor-pointer"
                    onClick={(e) => handleContextMenuAction("share", chapter.id, e)}
                  >
                    <Share size={16} className="mr-2 text-purple-400" />
                    <span>Partager</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-800 flex items-center cursor-pointer"
                    onClick={(e) => handleContextMenuAction("favorite", chapter.id, e)}
                  >
                    <Star size={16} className="mr-2 text-yellow-400" />
                    <span>Ajouter aux favoris</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom navigation */}
      <div className="border-t border-gray-800 px-4 py-3 flex justify-around">
        <button className="flex flex-col items-center text-[#a73c1c]">
          <div className="w-8 h-8 rounded-lg border-2 border-[#a73c1c] flex items-center justify-center mb-1">
            <Image src="/home-icon.png" alt="Home" width={20} height={20} />
          </div>
          <span className="text-xs">Accueil</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1">
            <Image src="/trophy-icon.png" alt="Trophy" width={20} height={20} />
          </div>
          <span className="text-xs">Trophées</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1">
            <Image src="/profile-icon.png" alt="Profile" width={20} height={20} />
          </div>
          <span className="text-xs">Profil</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1">
            <Image src="/shop-icon.png" alt="Shop" width={20} height={20} />
          </div>
          <span className="text-xs">Boutique</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1">
            <Image src="/bell-icon.png" alt="Notifications" width={20} height={20} />
          </div>
          <span className="text-xs">Alertes</span>
        </button>
      </div>
    </div>
  )
}
