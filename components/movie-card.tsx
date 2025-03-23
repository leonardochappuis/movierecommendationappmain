"use client"

import { Clock, Star, Calendar, Bookmark, BookmarkCheck, Share2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAlertDialog } from "@/context/alert-dialog-context"

interface MovieCardProps {
  movie: any
  inWatchlist: boolean
  onToggleWatchlist: (movie: any) => void
  onShare: (movie: any) => void
  isWatchlistView?: boolean
}

export function MovieCard({ movie, inWatchlist, onToggleWatchlist, onShare, isWatchlistView = false }: MovieCardProps) {
  const { showDialog } = useAlertDialog()

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="border rounded-md p-3 bg-card">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <img
            src={movie.imageUrl || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
        <div className="w-full md:w-3/4 flex flex-col">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-lg">{movie.title}</h4>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 my-2">
            <Badge variant="outline">{movie.genre}</Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(movie.duration)}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {movie.year}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mt-1">{movie.description}</p>

          {/* Always show movie details */}
          <div className="mt-3 text-sm border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>
              <span className="font-semibold">Director:</span> {movie.director}
            </p>
            <p>
              <span className="font-semibold">Languages:</span> {movie.languages.join(", ")}
            </p>
            <p className="md:col-span-2">
              <span className="font-semibold">Cast:</span> {movie.cast.join(", ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-3 justify-end">
            {isWatchlistView ? (
              <Button
                className="hover:bg-muted"
                variant="outline"
                size="sm"
                onClick={() =>
                  showDialog({
                    title: "Remove movie from watchlist?",
                    description: "Are you sure you want to remove this movie from your watchlist?",
                    onConfirm: () => {
                      onToggleWatchlist(movie)
                    },
                  })
                }
              >
                <X className="mr-1 h-4 w-4" />
                Remove from Watchlist
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => onToggleWatchlist(movie)}>
                  {inWatchlist ? (
                    <>
                      <BookmarkCheck className="mr-1 h-4 w-4" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-1 h-4 w-4" />
                      Add to Watchlist
                    </>
                  )}
                </Button>

                <Button variant="outline" size="sm" onClick={() => onShare(movie)}>
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

