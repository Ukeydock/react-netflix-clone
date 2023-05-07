import React, { useEffect, useState } from "react";
import requests from "../api/request";
import axios from "../api/axios";
import "./css/Banner.css";
import styled from "styled-components";

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

export default function Banner() {
  const [movie, setMovie] = useState<MovieData>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보를 가져오기
    const request = await axios.get(requests.fetchComedyMovies);
    // console.log(request);

    // 여러 영화 중 영화 하나의 id를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str: string, n: number) => {
    if (!str || str.length === 0) {
      return "netfilx에서 추천하는 영화입니다.";
    }

    if (str.length > 100) {
      return str.substring(0, n - 1) + "...";
    }

    return str;
  };

  if (!isClicked && movie) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie?.original_name}
          </h1>

          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else if (isClicked && movie) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src="https://www.youtube.com/embed/9voN0gkdlS4"
            title="YouTube video player"
            // frameborder="0"
            allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  } else {
    return <div></div>;
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// export {};
