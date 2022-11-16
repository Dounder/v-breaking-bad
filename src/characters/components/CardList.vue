<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import { useQuery } from '@tanstack/vue-query';
import type { Character } from '../interfaces/character';
import CharacterCard from '@/characters/components/CharacterCard.vue';

const getCharactersSlow = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await breakingBadApi.get<Character[]>('/characters');
      resolve(
        data.filter((character) => ![14, 17, 39].includes(character.char_id))
      );
    }, 1000);
  });
};

const {
  isLoading,
  isError,
  data: characters,
  error,
} = useQuery(['characters'], getCharactersSlow, {
  cacheTime: 1000 * 60,
  refetchOnReconnect: 'always',
});
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <section class="card-list" v-else>
    <CharacterCard
      v-for="character of characters"
      :key="character.char_id"
      :character="character"
    />
  </section>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
