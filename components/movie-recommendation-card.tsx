"use client";

import { useState, useEffect, useRef } from "react";
import { Film, Sun, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovieFilters } from "./movie-filters";
import { MovieCard } from "./movie-card";
import { MoviePagination } from "./movie-pagination";
import { EmptyState } from "./empty-state";
import { movieDatabase, genres, languages, yearRanges } from "./movie-data";

export default function MovieRecommendationCard() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [availableTime, setAvailableTime] = useState<number>(120);
  const [minRating, setMinRating] = useState<number>(7);
  const [yearRange, setYearRange] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("recommendations");
  const movieListRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;

  // Theme Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Scroll to top of movie list when page changes
  useEffect(() => {
    if (movieListRef.current) {
      movieListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // Filter movies based on all criteria
  const filterMovies = () => {
    const filteredMovies = movieDatabase.filter((movie) => {
      // Genre filter
      const genreMatch =
        selectedGenre && selectedGenre !== "any"
          ? movie.genre === selectedGenre
          : true;

      // Duration filter
      const durationMatch = movie.duration <= availableTime;

      // Rating filter
      const ratingMatch = movie.rating >= minRating;

      // Year range filter
      let yearMatch = true;
      if (yearRange !== "all") {
        if (yearRange === "before1980") {
          yearMatch = movie.year < 1980;
        } else if (yearRange === "1980s") {
          yearMatch = movie.year >= 1980 && movie.year < 1990;
        } else if (yearRange === "1990s") {
          yearMatch = movie.year >= 1990 && movie.year < 2000;
        } else if (yearRange === "2000s") {
          yearMatch = movie.year >= 2000 && movie.year < 2010;
        } else if (yearRange === "2010s") {
          yearMatch = movie.year >= 2010 && movie.year < 2020;
        } else if (yearRange === "2020s") {
          yearMatch = movie.year >= 2020;
        }
      }

      // Language filter
      const languageMatch = movie.languages.includes(selectedLanguage);

      return (
        genreMatch && durationMatch && ratingMatch && yearMatch && languageMatch
      );
    });

    // Sort options
    if (sortBy === "rating") {
      filteredMovies.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year-new") {
      filteredMovies.sort((a, b) => b.year - a.year);
    } else if (sortBy === "year-old") {
      filteredMovies.sort((a, b) => a.year - b.year);
    } else if (sortBy === "duration-short") {
      filteredMovies.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "duration-long") {
      filteredMovies.sort((a, b) => b.duration - a.duration);
    }

    return filteredMovies;
  };

  // Find Movies Button
  const handleFindMovies = () => {
    const filteredMovies = filterMovies();
    setRecommendations(filteredMovies);
    setCurrentPage(1);
    setHasSearched(true);
    setActiveTab("recommendations");
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSelectedGenre("");
    setAvailableTime(120);
    setMinRating(7);
    setYearRange("all");
    setSelectedLanguage("English");
    setSortBy("rating");
    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default values",
    });
  };

  // Add to Watchlist
  const handleToggleWatchlist = (movie: any) => {
    let undo = false;
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (isInWatchlist) {
      // Remove from watchlist
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));

      const toastInstance = toast({
        title: "Removed from watchlist",
        description: `"${movie.title}" has been removed from your watchlist`,
        action: (
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              undo = true;
              setWatchlist((prev) => [...prev, movie]); // Restore the movie
              toastInstance.dismiss();
            }}
          >
            Undo
          </Button>
        ),
      });

      // If undo is not clicked within 5 seconds, confirm deletion
      setTimeout(() => {
        if (!undo) {
        }
      }, 5000);
    } else {
      // Add to watchlist
      setWatchlist([...watchlist, movie]);

      toast({
        title: "Added to watchlist",
        description: `"${movie.title}" has been added to your watchlist`,
      });
    }
  };

  // Share Movie
  const handleShareMovie = (movie: any) => {
    const movieLink = `https://imdb.com/movies/${movie.id}`;

    navigator.clipboard
      .writeText(movieLink)
      .then(() => {
        toast({
          title: "Share the movie",
          description: `Link to "${movie.title}" copied to clipboard`,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Something went wrong. Please try again.",
        });
      });
  };

  // Pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate pagination
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);
  const paginatedMovies = recommendations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              <span className="text-xl md:text-2xl">Movie Recommendations</span>
            </CardTitle>

            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="ml-auto"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {isDarkMode ? "light" : "dark"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Find the perfect movie based on your preferences
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="recommendations">
              Recommendations {hasSearched && `(${recommendations.length})`}
            </TabsTrigger>
            <TabsTrigger value="watchlist">
              My Watchlist ({watchlist.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="p-4">
            <CardContent>
              <MovieFilters
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                availableTime={availableTime}
                setAvailableTime={setAvailableTime}
                minRating={minRating}
                setMinRating={setMinRating}
                yearRange={yearRange}
                setYearRange={setYearRange}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onFindMovies={handleFindMovies}
                genres={genres}
                languages={languages}
                yearRanges={yearRanges}
              />
            </CardContent>

            {hasSearched && (
              <>
                {recommendations.length > 0 ? (
                  <>
                    <div className="space-y-4 p-4" ref={movieListRef}>
                      {paginatedMovies.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          inWatchlist={watchlist.some(
                            (item) => item.id === movie.id
                          )}
                          onToggleWatchlist={handleToggleWatchlist}
                          onShare={handleShareMovie}
                        />
                      ))}
                    </div>

                    <MoviePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <EmptyState
                    message="No movies match your criteria"
                    buttonText="Clear Filters"
                    onButtonClick={handleClearFilters}
                  />
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="watchlist" className="p-4">
            {watchlist.length > 0 ? (
              <div className="space-y-4">
                {watchlist.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    inWatchlist={true}
                    onToggleWatchlist={handleToggleWatchlist}
                    onShare={handleShareMovie}
                    isWatchlistView={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                message="Your watchlist is empty"
                buttonText="Find Movies"
                onButtonClick={() => setActiveTab("recommendations")}
              />
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
