import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MovieData } from "../../components/Row";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<MovieData[]>();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm ? searchTerm : "", 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchTerm(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  async function fetchSearchTerm(searchTerm: string) {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request.data);
      setSearchResults(request.data.results);
      console.log(searchResults);
    } catch (err) {
      console.log(err);
    }
  }

  const renderSearchResults = () => {
    return searchResults ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster">
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie_poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <div>
        <p>찾고 계신 영화가 없습니다.</p>
      </div>
    );
  };

  return renderSearchResults();
}
