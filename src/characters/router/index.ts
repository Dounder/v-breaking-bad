import type { RouteRecordRaw } from 'vue-router';
import CharacterLayout from '@/characters/layout/CharacterLayout.vue';
import CharacterId from '@/characters/pages/CharacterId.vue';
import CharacterList from '@/characters/pages/CharacterList.vue';
import CharacterSearch from '@/characters/pages/CharacterSearch.vue';

export const characterRoute: RouteRecordRaw = {
  path: '/characters',
  name: 'characters',
  redirect: { name: 'characters-list' },
  component: CharacterLayout,
  children: [
    {
      path: 'by/:id',
      name: 'characters-id',
      props: { title: 'Personaje por Id', visible: false },
      component: CharacterId,
    },
    {
      path: 'list',
      name: 'characters-list',
      props: { title: 'Lista completa', visible: true },
      component: CharacterList,
    },
    {
      path: 'search',
      name: 'characters-search',
      props: { title: 'Busqueda', visible: true },
      component: CharacterSearch,
    },
  ],
};
