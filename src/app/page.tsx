"use client"

import type React from "react"

import {useState} from "react"

import Navigation from "@/components/Navigation";
import ChapterList from "@/components/chapter-list";
import TopNavigation from "@/components/ui/topNavigation";

import {getAllChapters} from "@/Helper/chapterAndQuizHelper";

import {Chapter} from "@/data";

export default function Main() {

    const chapterList =getAllChapters()

    // État des chapitres
    const [chapters] = useState<Chapter[]>(chapterList)

    return (
        <div className="mobile-container flex flex-col h-screen dark:bg-[#a73c1c]/20">

            <TopNavigation/>
            {/*  list */}
            <ChapterList chapters={chapters}/>
            <Navigation/>
        </div>
    )
}
