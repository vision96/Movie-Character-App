import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const CharacterDetail = ({ selectedId, onAddFavourites, isAddToFavourite }) => {
  const [character, setCharacter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        console.log(episodeId);
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        // console.log([episodeData])
        setEpisodes([episodeData].flat().slice(0,5));
        setCharacter(data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div className="select-character">
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return <div className="select-character">Please select a character!</div>;

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddToFavourite={isAddToFavourite}
        onAddFavourites={onAddFavourites}
      />
      <EpisodeList episodes={episodes}/>
    </div>
  );
};

export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavourite, onAddFavourites }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👱🏼‍♂️" : "👩🏻"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp; {character.species}</span>
        </div>
        <div className="location">
          <p>Last Know Location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourite ? (
            <p>Already Addet To Favourites!✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourites(character)}
            >
              Add to Favourites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({episodes}) {
  const [sortBy, setSortby] =useState(true)

  let sortedEpisodes;

  if(sortBy){
    sortedEpisodes = [...episodes].sort((a,b) => new Date(a.created) - new Date(b.created));
  } else {
    sortedEpisodes = [...episodes].sort((a,b) => new Date(b.created) - new Date(a.created));
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={()=> setSortby((is)=> !is)}>
          <ArrowUpCircleIcon className="icon" style={{rotate: sortBy ? "0deg" :"180deg"}}/>
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
