<script lang="ts">
import { ref } from 'vue';
import { useMoviesStore } from '../stores/moviesStore';

export default {
  setup() {
    const moviesStore = useMoviesStore();
    const searchFor = ref('')

    const handleSubmit = () => {
      if (searchFor.value.length > 0) {
        moviesStore.setSearchFor(searchFor.value);
        moviesStore.setFirstPage();
        moviesStore.findMovies(moviesStore.searchFor);
      }
    }

    return { searchFor, handleSubmit, moviesStore }
  }
}
</script>

<template>
  <div class="search-bar">
    <form @submit.prevent="handleSubmit">
      <input 
        type="text"
        placeholder="Find a movie..."
        v-model="searchFor"
      />
      <button>Find</button>
      <span v-if="moviesStore.resultsFound"> Found {{ moviesStore.resultsFound }} matching results.</span>
    </form>
  </div>
</template>

<style>
  .search-bar {
    display: flex;
    border: 1px solid;
    padding: 5px;
  }
</style>