<script setup lang="ts">
import type { RouterLink } from '@/router/links.routes';
import NavBar from '@/shared/components/NavBar.vue';
import { characterRoute } from '../router';

const routeLinks: RouterLink[] = characterRoute
  .children!.filter((route) => (route.props as { visible: boolean }).visible)
  .map((route) => ({
    name: route.name as string,
    path: route.path,
    title: (route.props as { title: string; visible: boolean }).title,
  }));
</script>

<template>
  <h1>Personajes</h1>
  <NavBar :show-icon="false" :links="routeLinks" />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style lang="scss" scoped></style>
