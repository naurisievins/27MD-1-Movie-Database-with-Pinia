import { defineStore } from 'pinia'
import axios from 'axios'

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

type SearchedMoviesResponse = {
  Search: Movie[]
  totalResults: number
  Response: boolean
  Error: string
}

type MovieById = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
}

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    response: {} as SearchedMoviesResponse,
    movieById: {} as MovieById,
    currentPage: 1,
    searchFor: 'matrix',
    totalPages: 1
  }),

  getters: {
    movies(): Movie[] | undefined {
      return this.response.Search
    },

    resultsFound(): number | undefined {
      return this.response.totalResults
    }
  },

  actions: {
    findMovies(searchFor: string) {
      axios
        .get<SearchedMoviesResponse>(
          `http://www.omdbapi.com/?s=${searchFor}&page=${this.currentPage}&apikey=42944933`
        )
        .then(({ data }) => {
          this.response = data

          if (this.response.totalResults) {
            const pages = Math.ceil(this.response.totalResults / 10)
            this.totalPages = pages
          }
        })
    },

    findMovieById(id: string) {
      axios.get<MovieById>(`http://www.omdbapi.com/?i=${id}&apikey=42944933`).then(({ data }) => {
        this.movieById = data
      })
    },

    setSearchFor(search: string) {
      this.searchFor = search
    },

    setFirstPage() {
      this.currentPage = 1
    },

    firstPage() {
      this.currentPage = 1
      this.findMovies(this.searchFor)
    },

    lastPage() {
      this.currentPage = this.totalPages
      this.findMovies(this.searchFor)
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.findMovies(this.searchFor)
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.findMovies(this.searchFor)
      }
    }
  }
})
