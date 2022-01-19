import React, { useState, useContext } from "react";
import "./Search.css";
import { SearchContext } from "../Context/SearchContext";
import { SEARCH_PHOTO_VIDEO } from "../Context/action.types";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const { dispatch } = useContext(SearchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchString.trim() === 0) {
      return alert("Please enter a valid string!!");
    }
    dispatch({
      type: SEARCH_PHOTO_VIDEO,
      payload: searchString,
    });
    setSearchString("");
  };
  return (
    <form className="custom-search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="custom-search-input"
        placeholder="Search photos,videos,artists"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button
        className="custom-search-botton"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
