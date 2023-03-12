<script lang="ts">
import { onMounted } from 'vue';
import { useMoviesStore } from '../stores/moviesStore'
import ErrorComponent from './ErrorComponent.vue';
import LoadingComponent from './LoadingComponent.vue';

export default {
    props: ["setShowMovieDetails"],
    setup(props) {
        const moviesStore = useMoviesStore();
        onMounted(() => {
            moviesStore.findMovies(moviesStore.searchFor);
        });
        const handleShowMovieById = (id: string) => {
            props.setShowMovieDetails();
            moviesStore.findMovieById(id);
        };
        return { moviesStore, handleShowMovieById };
    },
    components: { ErrorComponent, LoadingComponent }
}

</script>
<template>
  <div class="wraper">
    <div class="pagination">
      <button @click="moviesStore.firstPage()">First</button>
      <button class="pagination__prev-next-btn" @click="moviesStore.previousPage()">&laquo;</button>
      <button class="pagination__prev-next-btn" @click="moviesStore.nextPage()">&raquo;</button>
      <button @click="moviesStore.lastPage()">Last</button>
    </div>

    <ErrorComponent v-if="moviesStore.error" />
    <LoadingComponent v-if="moviesStore.loading" />

    <span class="page-info">Page <b>{{ moviesStore.currentPage }}</b> of <b>{{ moviesStore.totalPages }}</b></span>

    <div class="movie-container">
      <div 
        class="movie"
        v-for="movie in moviesStore.movies"
        :key="movie.imdbID"
        @click="handleShowMovieById(movie.imdbID)"
      > 

        <img v-if="movie.Poster!=='N/A'" :src=movie.Poster alt="Movie poster" />
        <img v-else src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png' alt="Movie poster" />
        <span class="movie__title">{{ movie.Title }}</span>

      </div>
    </div>
  </div>

</template>

<style scoped>

  .wraper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .movie-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .movie {
    display: flex;
    flex-direction: column;
    justify-content: start;
    cursor: pointer;
    width: 18%;
    min-width: 220px;
  }

  .movie:hover {
    opacity: 0.9;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }

  .movie > img {
    height: 300px;
  }

  .movie__title {
    font-weight: 600;
    text-align: center;
  }

  .pagination {
    display: flex;
    gap: 5px;
    margin: 0 auto;
  }

  .page-info {
    margin: 0 auto;
  }

  .pagination__prev-next-btn {
    padding: 0 15px;
  }

</style>