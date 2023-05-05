import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./css/Row.css";

interface propsData {
  title: string;
  id: string;
  fetchUrl: string;
  isLarageRow: boolean;
}

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;

  title: string;
  name: string;
  original_name: string;

  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Row(props: propsData) {
  const [movies, setMovies] = useState<MovieData[]>();

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(props.fetchUrl);
    console.log(request.data.results);
    setMovies(request.data.results);
  };

  if (movies) {
    return (
      <section className="row">
        <h2>{props.title}</h2>
        <div className="slider">
          <div className="slider__arrow-left">
            <span className="arrow">{"<"}</span>
          </div>

          <div id={props.id} className="row__posters">
            {movies.map((movie) => (
              <img
                key={movie.id}
                className={`row__poster ${
                  props.isLarageRow && "row__posterLarge"
                }`}
                src={`https://image.tmdb.org/t/p/original/${
                  props.isLarageRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt="영화들 이미지"
              />
            ))}
          </div>
          <div className="slider__arrow-right">
            <span className="arrow"></span>
            {">"}
          </div>
        </div>
      </section>
    );
  } else {
    return <div></div>;
  }
}

export {};
