"use client"
import MovieRecommendationCard from "@/components/movie-recommendation-card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 pt-2 md:p-6 md:pt-4">
      <MovieRecommendationCard />
    </main>
  )
}

