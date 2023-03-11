<script lang="ts">
import { useMoviesStore } from '../stores/moviesStore'

export default {
  props: ['setShowMovieDetails'],
  setup() {
    const moviesStore = useMoviesStore()

    return { moviesStore }
  },
}
</script>

<template>
  <button @click="setShowMovieDetails()">Back</button>
  <div class="movie-container">
    <div class="movie">

      <img :src=moviesStore.movieById.Poster />

      <span class="movie__title">{{ moviesStore.movieById.Title }}</span>

      <div class="movie__details">
        <span class="details__title">Rated: </span>
        <span class="details__description">{{ moviesStore.movieById.Rated }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Released: </span>
        <span class="details__description">{{ moviesStore.movieById.Released }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Runtime: </span>
        <span class="details__description">{{ moviesStore.movieById.Runtime }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Genre: </span>
        <span class="details__description">{{ moviesStore.movieById.Genre }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Director: </span>
        <span class="details__description">{{ moviesStore.movieById.Director }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Writer: </span>
        <span class="details__description">{{ moviesStore.movieById.Writer }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Actors: </span>
        <span class="details__description">{{ moviesStore.movieById.Actors }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Plot: </span>
        <span class="details__description">{{ moviesStore.movieById.Plot }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Language: </span>
        <span class="details__description">{{ moviesStore.movieById.Language }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Country: </span>
        <span class="details__description">{{ moviesStore.movieById.Country }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Awards: </span>
        <span class="details__description">{{ moviesStore.movieById.Awards }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Raiting: </span>
        <span class="details__description details__description--raiting">
          <span v-for="(raiting, index) in moviesStore.movieById.Ratings" :key="index" class="">{{ raiting.Source }}: {{ raiting.Value }}</span>
        </span>
      </div>

      <div class="movie__details">
        <span class="details__title">Metascore: </span>
        <span class="details__description">{{ moviesStore.movieById.Metascore }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">IMDb rating: </span>
        <span class="details__description">{{ moviesStore.movieById.imdbRating }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">IMDb votes: </span>
        <span class="details__description">{{ moviesStore.movieById.imdbVotes }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Box office: </span>
        <span class="details__description">{{ moviesStore.movieById.BoxOffice }}</span>
      </div>

      <div class="movie__details">
        <span class="details__title">Production: </span>
        <span class="details__description">{{ moviesStore.movieById.Production }}</span>
      </div>
      
    </div>
  </div>
</template>

<style scoped>

.movie > img {
  width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.movie__title {
  font-size: 2rem;
  font-weight: 600px;
  text-align: center;
}

.movie__details {
  display: flex;
  gap: 10px;
}

.details__title {
  min-width: 100px;
  font-weight: 600;
  text-align: right;
}

.details__description--raiting {
  display: flex;
  flex-direction: column;
}
.movie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.movie {
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 50%;
}

.movie__raiting {
  display: flex;
  gap: 5px;
}
</style>