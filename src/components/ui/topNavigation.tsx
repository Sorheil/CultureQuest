"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TopNavigation() {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)

    return (
        <>
            <div className="flex justify-between items-center px-4 py-3 bg-[#a73c1c]/30 border-b border-gray-800">
                <Button
                    variant="ghost"
                    className="flex items-center justify-center w-10 h-10 p-0 rounded-none hover:bg-transparent"
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowLanguageMenu(!showLanguageMenu)
                    }}
                >
                    <Image src="/image/profile/profile.jpg" alt="Cameroun" width={28} height={20} className="rounded-md" />
                </Button>

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
                <Card className="absolute left-0 top-[64px] w-full bg-[#1e2b32] border-b border-gray-800 z-20 shadow-lg rounded-none">
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
                </Card>
            )}
        </>
    )
}
