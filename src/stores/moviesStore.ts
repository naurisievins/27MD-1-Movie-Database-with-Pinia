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
  Response: string
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
    movieById: {} as MovieById | undefined,
    currentPage: 1,
    searchFor: 'matrix',
    totalPages: 1,
    loading: false,
    error: false
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
      this.loading = true

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

          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },

    findMovieById(id: string) {
      this.loading = true

      axios
        .get<MovieById>(`http://www.omdbapi.com/?i=${id}&apikey=42944933`)
        .then(({ data }) => {
          this.movieById = data

          this.loading = true
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },

    clearMovieById() {
      this.movieById = undefined
    },

    setSearchFor(search: string) {
      this.searchFor = search
    },

    setTotalPages() {
      this.totalPages = 1
    },

    setFirstPage() {
      this.currentPage = 1
    },

    firstPage() {
      if (this.currentPage !== 1) {
        this.currentPage = 1
        this.findMovies(this.searchFor)
      }
    },

    lastPage() {
      if (this.totalPages > 1) {
        this.currentPage = this.totalPages
        this.findMovies(this.searchFor)
      }
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
