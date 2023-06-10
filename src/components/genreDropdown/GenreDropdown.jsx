import React, { useState, useEffect, useRef } from "react";
import "./genredropdown.css";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import genres from "../../data/genres";
import { capitalizeFirstLetter } from "../../helpers/strings";

const GenreDropdown = () => {
  const dropdownRef = useRef();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);

  useEffect(() => {
    window.onclick = (event) => {
      if (event.target.contains(dropdownRef.current) && event.target !== dropdownRef.current) {
        setShowDropdown(false);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={"melofi__genreDropdown-container "}
      style={
        showDropdown ? { animation: "unround-corners 200ms forwards" } : { borderRadius: "10px" }
      }
    >
      <div className="melofi__genreDropdown-content">
        <IoMusicalNotesSharp size={20} color="white" />
        <p>{capitalizeFirstLetter(selectedGenre)}</p>
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
                style={isSelected ? { backgroundColor: "rgba(254, 165, 57, 0.88)" } : {}}
              >
                <p onClick={() => setSelectedGenre(genre)}>{capitalizeFirstLetter(genre)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
