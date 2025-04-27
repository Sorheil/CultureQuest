import {CHAPTERS, QUESTIONS} from "@/data";
export const getAllChapters = () => {
    return CHAPTERS.filter(chapter => chapter.id !=="default");
}
export const getQuestionsByChapterId = (chapterId: string | null) => {
    return QUESTIONS.filter(question => question.chapterId === chapterId);
}

export const getChapterById = (chapterId: string | null) => {
    return CHAPTERS.find(chapter => chapter.id === chapterId)
}
