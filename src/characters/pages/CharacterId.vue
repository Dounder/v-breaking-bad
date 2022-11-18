<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '../composables/useCharacter';

const route = useRoute();
const router = useRouter();

const { id } = route.params as { id: string };
const { hasError, errorMessage, character, isLoading } = useCharacter(id);

watchEffect(() => {
  if (!isLoading.value && hasError.value)
    router.replace({ name: 'characters-list' });
});
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>

  <h1 v-else-if="hasError">{{ errorMessage }}</h1>

  <article v-else-if="character">
    <h1>{{ character.name }}</h1>
    <section class="character-container">
      <img :src="character.img" :alt="character.name" />
      <ul>
        <li>Apodo: {{ character.nickname }}</li>
        <li>Nacio: {{ character.birthday }}</li>
        <li>Serie: {{ character.category }}</li>
        <li>Ocupacion: {{ character.occupation.join(', ') }}</li>
        <li>Actor: {{ character.portrayed }}</li>
        <li>Estado: {{ character.status }}</li>
        <li>Temporadas: {{ character.appearance.join(', ') }}</li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.character-container {
  display: flex;
}

img {
  width: 10rem;
  border: 0.5rem;
}
</style>
