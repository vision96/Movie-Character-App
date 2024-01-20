import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import useCharacter from "./hooks/useCharacter";
import { Toaster } from "react-hot-toast";
import useLocalStorage from "./hooks/useLocalStorage";


function App() {

  const [query, setQuery] = useState("");
  const {isLoading, characters} = useCharacter("https://rickandmortyapi.com/api/character?name",query)
  const [selectedId, setSelectedId] = useState(null);
 
  const [favourites, setFavourites]=useLocalStorage("FAVOURITES",[])

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourites = (character) => {
    setFavourites((prevFav) => [...prevFav, character]);
  };

  const handleDeleteFavourites = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />

      <Navbar
        numOfResult={characters.length}
        query={query}
        setQuery={setQuery}
        favourites={favourites}
        onDeleteFavoutites={handleDeleteFavourites}
      />
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourites={handleAddFavourites}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
