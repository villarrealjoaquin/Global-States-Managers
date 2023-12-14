import { create } from "zustand";
import { Character } from "../models/character.model";

interface CartStore {
  cart: Character[];
  characterMap: Map<number, boolean>;
  addToCart: (character: Character) => void;
  deleteCharacter: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  characterMap: new Map(),
  addToCart: (character: Character) => {
    set((state) => {
      const isCharacterInCart = state.characterMap.has(character.id);
      if (isCharacterInCart) return state;
      const updatedMap = new Map(state.characterMap);
      updatedMap.set(character.id, true);

      return {
        ...state,
        cart: [...state.cart, character],
        characterMap: updatedMap,
      };
    });
  },
  deleteCharacter: (id: number) => {
    set((state) => {
      const index = state.cart.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.cart.splice(index, 1);
        state.characterMap.delete(id);
      }
      return { ...state };
    });
  },
  clearCart: () => set(state => ({
    ...state,
    cart: [],
    characterMap: new Map(),
  })),
}));

export default useCartStore;