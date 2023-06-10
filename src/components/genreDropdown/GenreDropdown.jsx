import React, { useState, useEffect, useRef } from "react";
import "./genredropdown.css";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import genres from "../../data/genres";
import { capitalizeFirstLetter } from "../../helpers/strings";

const GenreDropdown = () => {
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className={"melofi__genreDropdown-container "}
      style={
        showDropdown
          ? {
              animation: "unround-corners 200ms forwards",
              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
            }
          : { borderRadius: "10px" }
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
        <div ref={dropdownRef} className="melofi__genreDropdown-list">
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
