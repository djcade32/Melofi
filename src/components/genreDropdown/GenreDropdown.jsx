import React, { useState } from "react";
import "./genredropdown.css";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import genres from "../../data/genres";

function generate(element) {
  return genres.map((genre) =>
    React.cloneElement(element, {
      key: genre,
    })
  );
}

const GenreDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);

  return (
    <div
      className={"melofi__genreDropdown-container "}
      style={
        showDropdown ? { animation: "unround-corners 200ms forwards" } : { borderRadius: "10px" }
      }
    >
      <div className="melofi__genreDropdown-content">
        <IoMusicalNotesSharp size={20} color="white" />
        <p>{selectedGenre.toUpperCase()}</p>
        {showDropdown ? (
          <RxCaretUp
            size={20}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowDropdown((prev) => !prev)}
          />
        ) : (
          <RxCaretDown
            size={20}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowDropdown((prev) => !prev)}
          />
        )}
      </div>

      {showDropdown && (
        <div className="melofi__genreDropdown-list">
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <div
                className="melofi__genreDropdown-list-item"
                key={genre}
                style={isSelected ? { backgroundColor: "var(--color-secondary-opacity)" } : {}}
              >
                <p onClick={() => setSelectedGenre(genre)}>{genre.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
