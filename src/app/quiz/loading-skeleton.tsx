export default function QuizSkeleton() {
    return (
        <div className="mobile-container flex flex-col h-screen">
            {/* Progress bar skeleton */}
            <div className="px-4 py-2 flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-full max-w-[300px] mx-4">
                    <div className="h-2 rounded-full bg-gray-300 animate-pulse"></div>
                </div>
            </div>

            {/* Main content skeleton */}
            <div className="px-6 flex-1 flex flex-col justify-between">
                {/* Character speech bubble (for some quiz types) */}
                <div className="mt-6 flex items-end gap-3">
                    <div className="w-16 h-16 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="p-4 rounded-2xl bg-gray-400 animate-pulse w-3/4 h-24"></div>
                </div>

                {/* Question area */}
                <div className="my-8">
                    <div className="h-6 w-3/4 bg-gray-400 animate-pulse rounded mb-2"></div>
                    <div className="h-6 w-1/2 bg-gray-400 animate-pulse rounded"></div>
                </div>

                {/* Answer options */}
                <div className="space-y-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 border border-gray-300 rounded-xl flex items-center gap-3">
                            {/* For image quiz type */}
                            <div className="w-12 h-12 rounded bg-gray-400 animate-pulse"></div>
                            <div className="h-5 bg-gray-400 animate-pulse rounded w-24"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom button area */}
                <div className="mb-8">
                    <div className="h-12 bg-gray-400 animate-pulse rounded-xl w-full"></div>
                </div>
            </div>
        </div>
    )
}
