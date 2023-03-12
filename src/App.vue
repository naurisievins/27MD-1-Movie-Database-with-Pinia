<script lang="ts">
  import { useMoviesStore } from './stores/moviesStore'
  import MovieListComponent from './components/MovieListComponent.vue';
  import SearchBarComponent from './components/SearchBarComponent.vue';
  import MovieDetailsComponent from './components/MovieDetailsComponent.vue';
  import { ref } from 'vue';

  export default {
    components: {
      MovieListComponent,
      SearchBarComponent,
      MovieDetailsComponent,
    },
    setup () {
      const moviesStore = useMoviesStore();
      const showMovieDetails = ref(false);

      const setShowMovieDetails = () => {
        showMovieDetails.value = !showMovieDetails.value;
      }

      return { moviesStore, setShowMovieDetails, showMovieDetails };
    }


}
</script>

<template>

  <header>
    <h1 class="title">Movie database</h1>
    <SearchBarComponent />
  </header>

  <main>
    <MovieListComponent :setShowMovieDetails="setShowMovieDetails" v-if="!showMovieDetails" />
    <MovieDetailsComponent :setShowMovieDetails="setShowMovieDetails" v-else />
  </main>
</template>

<style scoped>
  header {
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
    font-size: 5rem;
    line-height: 5rem;
    text-transform: uppercase;
    font-weight: 600px;
    text-shadow: rgb(20, 20, 20) 1px 0 10px;
  }

  @media only screen and (max-width: 600px) {
    .title {
      line-height: 3rem;
      font-size: 2.5rem;
    }

}

</style>
