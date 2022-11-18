<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import type { Character } from '@/characters/interfaces/character';
import characterStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params as { id: string };

const getCharactersCacheFirst = async (
  characterId: string
): Promise<Character> => {
  if (characterStore.checkIdInStore(characterId))
    return characterStore.ids.list[characterId];

  const { data } = await breakingBadApi.get<Character[]>(
    `/characters/${characterId}`
  );
  return data[0];
};

const { data: character } = useQuery(
  [`characters`, id],
  () => getCharactersCacheFirst(id),
  {
    onSuccess(character) {
      characterStore.loadedCharacter(character);
    },
  }
);
</script>

<template>
  <h1 v-if="!character">Loading...</h1>

  <article v-else>
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
