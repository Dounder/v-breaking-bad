import { reactive } from 'vue';
import type { Character } from '@/characters/interfaces/character';
import breakingBadApi from '@/api/breakingBadApi';

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };

  ids: {
    list: { [x: string]: Character };
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };

  //? Characters Methods
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;

  //? Characters by ids
  startLoadingCharacter: () => void;
  loadedCharacter: (character: Character) => void;
  checkIdInStore: (id: string) => boolean;
}

const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: [],
  },

  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: null,
  },

  //? Characters Methods
  async startLoadingCharacters(): Promise<void> {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    this.loadedCharacters(data);
  },
  loadedCharacters(data: Character[] | string): void {
    if (typeof data === 'string')
      return this.loadCharactersFailed(
        'La respuesta no es un arreglo de personajes'
      );

    const characters = data.filter(
      (character) => ![14, 17, 39].includes(character.char_id)
    );

    this.characters = {
      count: characters.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: characters,
    };
  },
  loadCharactersFailed(error: string): void {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: [],
    };
  },

  //? Characters by ids
  async startLoadingCharacter(): Promise<void> {
    this.ids = {
      ...this.ids,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    };
  },
  loadedCharacter: function (character: Character): void {
    this.ids.isLoading = false;
    this.ids.list[character.char_id] = character;
  },
  checkIdInStore: function (id: string): boolean {
    return !!this.ids.list[id];
  },
});

characterStore.startLoadingCharacters();

export default characterStore;
