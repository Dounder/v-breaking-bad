<script setup lang="ts">
import type { RouterLink } from '@/router/links.routes';

interface Props {
  title?: string;
  links: RouterLink[];
  showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  links: () => [],
});
</script>

<template>
  <nav>
    <img
      v-if="props.showIcon"
      src="@/assets/logo.svg"
      alt="Vue logo"
      height="25"
      width="25"
    />
    <span v-if="props.title">{{ props.title }}</span>

    <RouterLink
      v-for="link of props.links"
      :key="link.path"
      :to="{ name: link.name }"
      active-class="active"
      exact-active-class="active-exact"
    >
      {{ link.title }}
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  align-items: flex-start;
  display: flex;
  font-size: 1rem;
  margin-top: 0.8rem;
  text-align: center;
  width: 100%;
}

img {
  margin-right: 0.5rem;
}

span {
  margin-right: 0.8rem;
}

a {
  margin-right: 0.8rem;
}
</style>
