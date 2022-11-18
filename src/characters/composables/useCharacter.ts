import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import breakingBadApi from '@/api/breakingBadApi';
import type { Character } from '@/characters/interfaces/character';

const characterSet = ref<{ [x: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) return characterSet.value[id];

  try {
    const { data } = await breakingBadApi.get<Character[]>(`/characters/${id}`);
    if (data.length > 0) return data[0];
    throw new Error(`Personaje con id #${id} no encontrado`);
  } catch (error: any) {
    throw new Error(error);
  }
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.char_id] = character;
};

const loadedFailed = (error: string) => {
  hasError.value = true;
  errorMessage.value = error;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery([`characters`, id], () => getCharacters(id), {
    onSuccess: loadedCharacter,
    onError: loadedFailed,
  });

  return {
    //* Props
    errorMessage,
    hasError,
    isLoading,
    list: characterSet,
    character: computed<Character | null>(() => characterSet.value[id]),

    //! Getters

    //? Methods
  };
};

export default useCharacter;
