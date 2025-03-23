"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Clock, Star } from "lucide-react"

interface MovieFiltersProps {
  selectedGenre: string
  setSelectedGenre: (value: string) => void
  availableTime: number
  setAvailableTime: (value: number) => void
  minRating: number
  setMinRating: (value: number) => void
  yearRange: string
  setYearRange: (value: string) => void
  selectedLanguage: string
  setSelectedLanguage: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  onFindMovies: () => void
  genres: string[]
  languages: string[]
  yearRanges: { label: string; value: string }[]
}

export function MovieFilters({
  selectedGenre,
  setSelectedGenre,
  availableTime,
  setAvailableTime,
  minRating,
  setMinRating,
  yearRange,
  setYearRange,
  selectedLanguage,
  setSelectedLanguage,
  sortBy,
  setSortBy,
  onFindMovies,
  genres,
  languages,
  yearRanges,
}: MovieFiltersProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="pt-0 px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Genre</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Available Time</label>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(availableTime)}
              </span>
            </div>
            <Slider
              value={[availableTime]}
              min={60}
              max={240}
              step={5}
              onValueChange={(value) => setAvailableTime(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1h</span>
              <span>2h</span>
              <span>3h</span>
              <span>4h</span>
            </div>
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Minimum Rating</label>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                {minRating.toFixed(1)}+
              </span>
            </div>
            <Slider
              value={[minRating]}
              min={1}
              max={10}
              step={0.1}
              onValueChange={(value) => setMinRating(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Year Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Release Period</label>
            <Select value={yearRange} onValueChange={setYearRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select year range" />
              </SelectTrigger>
              <SelectContent>
                {yearRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Preference */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort Results By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="year-new">Newest First</SelectItem>
                <SelectItem value="year-old">Oldest First</SelectItem>
                <SelectItem value="duration-short">Shortest First</SelectItem>
                <SelectItem value="duration-long">Longest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex mt-6">
        <Button onClick={onFindMovies} className="w-full">
          <Filter className="mr-2 h-4 w-4" />
          Find Movies
        </Button>
      </div>
    </div>
  )
}

