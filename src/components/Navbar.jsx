import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

const Navbar = ({
  numOfResult,
  query,
  setQuery,
  favourites,
  onDeleteFavoutites,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO</div>
      <input
        type="text"
        className="text-field"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="navbar__result">Found {numOfResult} characters</div>
      <Modal title="List of Favourites" open={isOpen} onOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavoutites(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </nav>
  );
};

export default Navbar;
