<script setup lang="ts">
import type { Character } from '@/characters/interfaces/character';
import { toRef } from 'vue';

const props = defineProps<{ character: Character }>();
const character = toRef(props, 'character');
</script>

<template>
  <article class="character-card">
    <img :src="character.img" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </article>
</template>

<style scoped>
.character-card {
  margin: 0.8rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 10rem;
  border: 0.8rem 0;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}
</style>
