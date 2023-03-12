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
        moviesStore.setTotalPages();
        moviesStore.findMovies(moviesStore.searchFor);
        searchFor.value = '';
      }
    }

    return { searchFor, handleSubmit, moviesStore }
  }
}
</script>

<template>
  <div class="top-nav">
    <form 
      @submit.prevent="handleSubmit"
      class="search-form"
    >
      <input 
        type="text"
        placeholder="Find a movie..."
        v-model="searchFor"
        autofocus
      />
      <button>
        <span class="search-button-content">
          <img class="search-button-img" src="https://img.icons8.com/material-two-tone/256/search.png">
          Search
        </span>
      </button>
      <span v-if="moviesStore.response.Response === 'True'"> Found {{ moviesStore.resultsFound }} matching results for "<b>{{ moviesStore.searchFor }}</b>".</span>
      <span v-else-if="moviesStore.response.Response === 'False'"> Searched for "<b>{{ moviesStore.searchFor }}</b>". {{ moviesStore.response.Error }}</span>
      <span v-else> Nothing found for "{{ moviesStore.searchFor }}".</span>
    </form>
  </div>
</template>

<style scoped>

  .top-nav {
    display: flex;
    gap: 10px;
    padding: 5px 10px;
    background-color: rgb(42 38 38);
    color: rgb(214, 213, 213);
    border-radius: 7px;
  }

  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .search-form > input {
    border-radius: 10px;
    border: 1px solid rgb(19, 18, 18);
    padding: 0 7px;
  }

  .search-form > input:focus {
    outline: 1px solid white;
  }

  .search-button-content {
    display: flex;
    gap: 5px;
  }

  .search-button-img {
    width: 25px;
  }
</style>