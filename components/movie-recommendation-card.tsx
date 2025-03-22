"use client"

import { useState, useEffect, useRef } from "react"
import {
  Film,
  Clock,
  Star,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Share2,
  Sun,
  Moon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAlertDialog } from "@/context/AlertDialogContext"

// Sample movie database
const movieDatabase = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: "Drama",
    duration: 142,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    year: 1994,
    languages: ["English", "Spanish"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    duration: 152,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    year: 2008,
    languages: ["English", "French", "German"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 3,
    title: "Inception",
    genre: "Sci-Fi",
    duration: 148,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    year: 2010,
    languages: ["English", "Japanese"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Crime",
    duration: 154,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    year: 1994,
    languages: ["English", "Spanish", "French"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
    duration: 178,
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    rating: 8.8,
    year: 2001,
    languages: ["English", "Spanish", "French", "German"],
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 6,
    title: "Parasite",
    genre: "Drama",
    duration: 132,
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    rating: 8.6,
    year: 2019,
    languages: ["Korean", "English"],
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 7,
    title: "Get Out",
    genre: "Horror",
    duration: 104,
    description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    rating: 7.7,
    year: 2017,
    languages: ["English", "Spanish"],
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 8,
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    duration: 99,
    description:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    rating: 8.1,
    year: 2014,
    languages: ["English", "French", "German"],
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 9,
    title: "La La Land",
    genre: "Musical",
    duration: 128,
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    rating: 8.0,
    year: 2016,
    languages: ["English", "French"],
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 10,
    title: "Toy Story",
    genre: "Animation",
    duration: 81,
    description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    rating: 8.3,
    year: 1995,
    languages: ["English", "Spanish", "French", "Italian"],
    director: "John Lasseter",
    cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 11,
    title: "The Godfather",
    genre: "Crime",
    duration: 175,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    year: 1972,
    languages: ["English", "Italian"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 12,
    title: "Spirited Away",
    genre: "Animation",
    duration: 125,
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    rating: 8.6,
    year: 2001,
    languages: ["Japanese", "English"],
    director: "Hayao Miyazaki",
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 13,
    title: "The Matrix",
    genre: "Sci-Fi",
    duration: 136,
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    year: 1999,
    languages: ["English", "Spanish", "French"],
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 14,
    title: "Forrest Gump",
    genre: "Drama",
    duration: 142,
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    year: 1994,
    languages: ["English", "French", "German"],
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 15,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: 169,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    year: 2014,
    languages: ["English", "Spanish", "French"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 16,
    title: "The Silence of the Lambs",
    genre: "Horror",
    duration: 118,
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    rating: 8.6,
    year: 1991,
    languages: ["English", "German"],
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 17,
    title: "Whiplash",
    genre: "Drama",
    duration: 106,
    description:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    rating: 8.5,
    year: 2014,
    languages: ["English", "French"],
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 18,
    title: "Eternal Sunshine of the Spotless Mind",
    genre: "Drama",
    duration: 108,
    description:
      "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    rating: 8.3,
    year: 2004,
    languages: ["English", "French"],
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 19,
    title: "The Departed",
    genre: "Crime",
    duration: 151,
    description:
      "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    rating: 8.5,
    year: 2006,
    languages: ["English", "Chinese"],
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 20,
    title: "Gladiator",
    genre: "Action",
    duration: 155,
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    rating: 8.5,
    year: 2000,
    languages: ["English", "Spanish", "Italian"],
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 21,
    title: "The Lion King",
    genre: "Animation",
    duration: 88,
    description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    rating: 8.5,
    year: 1994,
    languages: ["English", "Spanish", "French", "German"],
    director: "Roger Allers, Rob Minkoff",
    cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 22,
    title: "The Prestige",
    genre: "Drama",
    duration: 130,
    description:
      "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    rating: 8.5,
    year: 2006,
    languages: ["English", "French"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 23,
    title: "Casablanca",
    genre: "Drama",
    duration: 102,
    description:
      "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    rating: 8.5,
    year: 1942,
    languages: ["English", "French", "German"],
    director: "Michael Curtiz",
    cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 24,
    title: "City of God",
    genre: "Crime",
    duration: 130,
    description:
      "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
    rating: 8.6,
    year: 2002,
    languages: ["Portuguese", "English"],
    director: "Fernando Meirelles, Kátia Lund",
    cast: ["Alexandre Rodrigues", "Leandro Firmino", "Matheus Nachtergaele"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 25,
    title: "Oldboy",
    genre: "Action",
    duration: 120,
    description:
      "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.",
    rating: 8.4,
    year: 2003,
    languages: ["Korean", "English"],
    director: "Park Chan-wook",
    cast: ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jung"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 26,
    title: "Amélie",
    genre: "Comedy",
    duration: 122,
    description:
      "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    rating: 8.3,
    year: 2001,
    languages: ["French", "English"],
    director: "Jean-Pierre Jeunet",
    cast: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 27,
    title: "Pan's Labyrinth",
    genre: "Fantasy",
    duration: 118,
    description:
      "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.",
    rating: 8.2,
    year: 2006,
    languages: ["Spanish", "English"],
    director: "Guillermo del Toro",
    cast: ["Ivana Baquero", "Ariadna Gil", "Sergi López"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 28,
    title: "Inglourious Basterds",
    genre: "Action",
    duration: 153,
    description:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    rating: 8.3,
    year: 2009,
    languages: ["English", "German", "French", "Italian"],
    director: "Quentin Tarantino",
    cast: ["Brad Pitt", "Diane Kruger", "Eli Roth"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 29,
    title: "The Social Network",
    genre: "Drama",
    duration: 120,
    description:
      "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    rating: 7.7,
    year: 2010,
    languages: ["English", "French"],
    director: "David Fincher",
    cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 30,
    title: "Memento",
    genre: "Mystery",
    duration: 113,
    description: "A man with short-term memory loss attempts to track down his wife's murderer.",
    rating: 8.4,
    year: 2000,
    languages: ["English", "Spanish"],
    director: "Christopher Nolan",
    cast: ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 31,
    title: "The Truman Show",
    genre: "Comedy",
    duration: 103,
    description: "An insurance salesman discovers his whole life is actually a reality TV show.",
    rating: 8.1,
    year: 1998,
    languages: ["English", "Spanish"],
    director: "Peter Weir",
    cast: ["Jim Carrey", "Ed Harris", "Laura Linney"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 32,
    title: "Goodfellas",
    genre: "Crime",
    duration: 146,
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    rating: 8.7,
    year: 1990,
    languages: ["English", "Italian"],
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 33,
    title: "Schindler's List",
    genre: "Drama",
    duration: 195,
    description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    rating: 8.9,
    year: 1993,
    languages: ["English", "German", "Hebrew", "Polish"],
    director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 34,
    title: "Fight Club",
    genre: "Drama",
    duration: 139,
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    rating: 8.8,
    year: 1999,
    languages: ["English", "Spanish", "French"],
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 35,
    title: "The Pianist",
    genre: "Drama",
    duration: 150,
    description: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.",
    rating: 8.5,
    year: 2002,
    languages: ["English", "German", "Polish"],
    director: "Roman Polanski",
    cast: ["Adrien Brody", "Thomas Kretschmann", "Frank Finlay"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 36,
    title: "Blade Runner 2049",
    genre: "Sci-Fi",
    duration: 164,
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    rating: 8.0,
    year: 2017,
    languages: ["English", "Spanish", "French"],
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 37,
    title: "Your Name",
    genre: "Animation",
    duration: 106,
    description:
      "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    rating: 8.4,
    year: 2016,
    languages: ["Japanese", "English"],
    director: "Makoto Shinkai",
    cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi", "Ryo Narita"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 38,
    title: "The Shining",
    genre: "Horror",
    duration: 146,
    description:
      "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    rating: 8.4,
    year: 1980,
    languages: ["English", "Spanish", "French"],
    director: "Stanley Kubrick",
    cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 39,
    title: "Coco",
    genre: "Animation",
    duration: 105,
    description:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    rating: 8.4,
    year: 2017,
    languages: ["English", "Spanish"],
    director: "Lee Unkrich, Adrian Molina",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 40,
    title: "The Revenant",
    genre: "Action",
    duration: 156,
    description:
      "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
    rating: 8.0,
    year: 2015,
    languages: ["English", "French", "Pawnee"],
    director: "Alejandro G. Iñárritu",
    cast: ["Leonardo DiCaprio", "Tom Hardy", "Will Poulter"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 41,
    title: "A Clockwork Orange",
    genre: "Crime",
    duration: 136,
    description:
      "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
    rating: 8.3,
    year: 1971,
    languages: ["English", "Russian"],
    director: "Stanley Kubrick",
    cast: ["Malcolm McDowell", "Patrick Magee", "Michael Bates"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 42,
    title: "Moonlight",
    genre: "Drama",
    duration: 111,
    description:
      "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
    rating: 7.4,
    year: 2016,
    languages: ["English", "Spanish"],
    director: "Barry Jenkins",
    cast: ["Mahershala Ali", "Naomie Harris", "Trevante Rhodes"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 43,
    title: "The Sixth Sense",
    genre: "Horror",
    duration: 107,
    description: "A boy who communicates with spirits seeks the help of a disheartened child psychologist.",
    rating: 8.1,
    year: 1999,
    languages: ["English", "Spanish", "French"],
    director: "M. Night Shyamalan",
    cast: ["Bruce Willis", "Haley Joel Osment", "Toni Collette"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 44,
    title: "Jurassic Park",
    genre: "Action",
    duration: 127,
    description:
      "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    rating: 8.1,
    year: 1993,
    languages: ["English", "Spanish", "French"],
    director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 45,
    title: "The Intouchables",
    genre: "Comedy",
    duration: 112,
    description:
      "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
    rating: 8.5,
    year: 2011,
    languages: ["French", "English"],
    director: "Olivier Nakache, Éric Toledano",
    cast: ["François Cluzet", "Omar Sy", "Anne Le Ny"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 46,
    title: "Grave of the Fireflies",
    genre: "Animation",
    duration: 89,
    description: "A young boy and his little sister struggle to survive in Japan during World War II.",
    rating: 8.5,
    year: 1988,
    languages: ["Japanese", "English"],
    director: "Isao Takahata",
    cast: ["Tsutomu Tatsumi", "Ayano Shiraishi", "Akemi Yamaguchi"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 47,
    title: "The Usual Suspects",
    genre: "Crime",
    duration: 106,
    description:
      "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
    rating: 8.5,
    year: 1995,
    languages: ["English", "Hungarian", "Spanish", "French"],
    director: "Bryan Singer",
    cast: ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 48,
    title: "Rear Window",
    genre: "Mystery",
    duration: 112,
    description:
      "A wheelchair-bound photographer spies on his neighbors from his apartment window and becomes convinced one of them has committed murder.",
    rating: 8.5,
    year: 1954,
    languages: ["English", "French"],
    director: "Alfred Hitchcock",
    cast: ["James Stewart", "Grace Kelly", "Wendell Corey"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 49,
    title: "Alien",
    genre: "Horror",
    duration: 117,
    description:
      "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    rating: 8.4,
    year: 1979,
    languages: ["English", "Spanish"],
    director: "Ridley Scott",
    cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 50,
    title: "The Thing",
    genre: "Horror",
    duration: 109,
    description:
      "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    rating: 8.1,
    year: 1982,
    languages: ["English", "Norwegian"],
    director: "John Carpenter",
    cast: ["Kurt Russell", "Wilford Brimley", "Keith David"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
]

// Available genres
const genres = ["Action", "Animation", "Comedy", "Crime", "Drama", "Fantasy", "Horror", "Musical", "Mystery", "Sci-Fi"]

// Available languages
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Norwegian",
  "Polish",
  "Hebrew",
  "Hungarian",
]

// Year ranges
const yearRanges = [
  { label: "All Years", value: "all" },
  { label: "Before 1980", value: "before1980" },
  { label: "1980s", value: "1980s" },
  { label: "1990s", value: "1990s" },
  { label: "2000s", value: "2000s" },
  { label: "2010s", value: "2010s" },
  { label: "2020s", value: "2020s" },
]

export default function MovieRecommendationCard() {
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [availableTime, setAvailableTime] = useState<number>(120)
  const [minRating, setMinRating] = useState<number>(7)
  const [yearRange, setYearRange] = useState<string>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English")
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [sortBy, setSortBy] = useState<string>("rating")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("recommendations")
  const { showDialog } = useAlertDialog()
  const movieListRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = 10 // Updated to show 10 movies per page

  // UI Element 7: Theme Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    if (movieListRef.current) {
      movieListRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentPage])

  // Filter movies based on all criteria
  const filterMovies = () => {
    const filteredMovies = movieDatabase.filter((movie) => {
      // Genre filter
      const genreMatch = selectedGenre && selectedGenre !== "any" ? movie.genre === selectedGenre : true

      // Duration filter
      const durationMatch = movie.duration <= availableTime

      // Rating filter
      const ratingMatch = movie.rating >= minRating

      // Year range filter
      let yearMatch = true
      if (yearRange !== "all") {
        if (yearRange === "before1980") {
          yearMatch = movie.year < 1980
        } else if (yearRange === "1980s") {
          yearMatch = movie.year >= 1980 && movie.year < 1990
        } else if (yearRange === "1990s") {
          yearMatch = movie.year >= 1990 && movie.year < 2000
        } else if (yearRange === "2000s") {
          yearMatch = movie.year >= 2000 && movie.year < 2010
        } else if (yearRange === "2010s") {
          yearMatch = movie.year >= 2010 && movie.year < 2020
        } else if (yearRange === "2020s") {
          yearMatch = movie.year >= 2020
        }
      }

      // Language filter
      const languageMatch = movie.languages.includes(selectedLanguage)

      return genreMatch && durationMatch && ratingMatch && yearMatch && languageMatch
    })

    // UI Element 6: Sort options
    if (sortBy === "rating") {
      filteredMovies.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "year-new") {
      filteredMovies.sort((a, b) => b.year - a.year)
    } else if (sortBy === "year-old") {
      filteredMovies.sort((a, b) => a.year - b.year)
    } else if (sortBy === "duration-short") {
      filteredMovies.sort((a, b) => a.duration - b.duration)
    } else if (sortBy === "duration-long") {
      filteredMovies.sort((a, b) => b.duration - a.duration)
    }

    return filteredMovies
  }

  // UI Element 1: Find Movies Button
  const handleFindMovies = () => {
    const filteredMovies = filterMovies()
    setRecommendations(filteredMovies)
    setCurrentPage(1)
    setHasSearched(true)
    setActiveTab("recommendations")
  }

  // UI Element 2: Clear Filters
  const handleClearFilters = () => {
    setSelectedGenre("")
    setAvailableTime(120)
    setMinRating(7)
    setYearRange("all")
    setSelectedLanguage("English")
    setSortBy("rating")
    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default values",
    })
  }

  // UI Element 3: Add to Watchlist
  const handleToggleWatchlist = (movie: any) => {
    let undo = false
    const isInWatchlist = watchlist.some((item) => item.id === movie.id)

    if (isInWatchlist) {
      // Remove from watchlist
      setWatchlist(watchlist.filter((item) => item.id !== movie.id))

      const toastInstance = toast({
        title: "Removed from watchlist",
        description: `"${movie.title}" has been removed from your watchlist`,
        action: (
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              undo = true
              setWatchlist((prev) => [...prev, movie]) // ✅ Restore the movie
              toastInstance.dismiss()
            }}
          >
            Undo
          </Button>
        ),
      })

      // If undo is not clicked within 5 seconds, confirm deletion
      setTimeout(() => {
        if (!undo) {
        }
      }, 5000)
    } else {
      // Add to watchlist
      setWatchlist([...watchlist, movie])

      toast({
        title: "Added to watchlist",
        description: `"${movie.title}" has been added to your watchlist`,
      })
    }
  }

  // UI Element 5: Share Movie
  const handleShareMovie = (movie: any) => {
    const movieLink = `https://imdb.com/movies/${movie.id}`

    navigator.clipboard
      .writeText(movieLink)
      .then(() => {
        toast({
          title: "Share the movie",
          description: `Link to "${movie.title}" copied to clipboard`,
        })
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Something went wrong. Please try again.",
        })
      })
  }

  // UI Element 8: Pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Calculate pagination
  const totalPages = Math.ceil(recommendations.length / itemsPerPage)
  const paginatedMovies = recommendations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              <span className="text-xl md:text-2xl">Movie Recommendations</span>
            </CardTitle>

            {/* UI Element 7: Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="ml-auto">
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {isDarkMode ? "light" : "dark"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>Find the perfect movie based on your preferences</CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="recommendations">
              Recommendations {hasSearched && `(${recommendations.length})`}
            </TabsTrigger>
            <TabsTrigger value="watchlist">My Watchlist ({watchlist.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="p-4">
            <CardContent className="pt-0 px-0">
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

                  {/* UI Element 9: Minimum Rating Filter */}
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
                  {/* UI Element 10: Year Range Filter */}
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

                  {/* UI Element 11: Language Preference */}
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

                  {/* UI Element 6: Sort Options */}
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
                {/* UI Element 1: Find Movies Button */}
                <Button onClick={handleFindMovies} className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Find Movies
                </Button>
              </div>
            </CardContent>

            {hasSearched && (
              <>
                {recommendations.length > 0 ? (
                  <>
                    <div className="space-y-4 p-4" ref={movieListRef}>
                      {paginatedMovies.map((movie) => (
                        <div key={movie.id} className="border rounded-md p-3 bg-card">
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
                                {/* UI Element 3: Add to Watchlist */}
                                <Button variant="outline" size="sm" onClick={() => handleToggleWatchlist(movie)}>
                                  {watchlist.some((item) => item.id === movie.id) ? (
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

                                {/* UI Element 5: Share Movie */}
                                <Button variant="outline" size="sm" onClick={() => handleShareMovie(movie)}>
                                  <Share2 className="mr-1 h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* UI Element 8: Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-4 pb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Show page numbers */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Show first page, last page, current page, and pages around current
                            let pageToShow
                            if (totalPages <= 5) {
                              pageToShow = i + 1
                            } else if (currentPage <= 3) {
                              pageToShow = i + 1
                            } else if (currentPage >= totalPages - 2) {
                              pageToShow = totalPages - 4 + i
                            } else {
                              pageToShow = currentPage - 2 + i
                            }

                            if (pageToShow > 0 && pageToShow <= totalPages) {
                              return (
                                <Button
                                  key={pageToShow}
                                  variant={currentPage === pageToShow ? "default" : "outline"}
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() => handlePageChange(pageToShow)}
                                >
                                  {pageToShow}
                                </Button>
                              )
                            }
                            return null
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No movies match your criteria</p>
                    <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="watchlist" className="p-4">
            {watchlist.length > 0 ? (
              <div className="space-y-4">
                {watchlist.map((movie) => (
                  <div key={movie.id} className="border rounded-md p-3 bg-card">
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
                          <Button
                            className="hover:bg-muted"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              showDialog({
                                title: "Remove movie from watchlist?",
                                description: "Are you sure you want to remove this movie from your watchlist?",
                                onConfirm: () => {
                                  handleToggleWatchlist(movie)
                                },
                              })
                            }
                          >
                            <X className="mr-1 h-4 w-4" />
                            Remove from Watchlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your watchlist is empty</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add movies to your watchlist to keep track of what you want to watch
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

