<script setup lang="ts">
import CharacterCard from '@/characters/components/CharacterCard.vue';
import type { Character } from '@/characters/interfaces/character';

const props = defineProps<{ characters: Character[] }>();
</script>

<template>
  <section class="card-list">
    <CharacterCard
      v-for="character of props.characters"
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
