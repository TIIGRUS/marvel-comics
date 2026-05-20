import { Outlet } from "react-router-dom";
import { CharactersProvider } from "../contexts/CharactersContext";

const CharacterLayout = () => {
  return (
    <CharactersProvider>
      <Outlet></Outlet>
    </CharactersProvider>
  );
};

export default CharacterLayout;
