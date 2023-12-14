import { useEffect, useState } from "react";
import { Character } from "../models/character.model";
import useCartStore from "../store/cart.store";

const BASE_URL = 'https://rickandmortyapi.com/api/character';

function Zustand() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const { cart, characterMap } = useCartStore(state => ({
    cart: state.cart,
    characterMap: state.characterMap
  }));
  const { addToCart, deleteCharacter, clearCart } = useCartStore();

  const isInCart = (id: number) => {
    return characterMap.get(id) || false;
  };

  useEffect(() => {
    const getCharacter = async () => {
      const res = await fetch(BASE_URL);
      const json = await res.json();
      setCharacters(json.results)
    }
    getCharacter();
  }, []);

  return (
    <>
      <section>
        <h1 className="text-center mt-2 mb-2 text-[32px]">Rick and Morty Zustand</h1>
        <div className="flex justify-center items-center gap-3">
          <p className="text-center mt-2 mb-2 text-[32px]">Cart: {cart.length} </p>
          <button className="bg-white text-black font-bold py-1 px-3" onClick={clearCart}>Clear</button>
        </div>
        <ul className="flex justify-center items-center flex-wrap gap-3">
          {characters && characters.map((character, i) => (
            <li className="flex flex-col gap-3 h-[450px]" key={`${character.id} - ${i}`}>
              <img src={character.image} alt="" />
              <h2 className="font-bold">{character.name}</h2>
              <button
                onClick={() => addToCart(character)}
                disabled={isInCart(character.id)}
                className="bg-slate-200 text-black py-1 px-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                Add Character
              </button>
              {
                isInCart(character.id) &&
                <button
                  className="bg-red-400 py-1 px-3 font-bold"
                  onClick={() => deleteCharacter(character.id)}>
                  Delete Character
                </button>
              }
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
export default Zustand