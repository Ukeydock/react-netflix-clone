import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./css/Row.css";
import MovieModal from "./OpenMovieModal/MovieModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface propsData {
  title: string;
  id: string;
  fetchUrl: string;
  isLarageRow: boolean;
}

export interface MovieData {
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

  media_type: string;
}

export default function Row(props: propsData) {
  const [movies, setMovies] = useState<MovieData[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<MovieData>();
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(props.fetchUrl);
    setMovies(request.data.results);
  };

  function handleSliderClick(e: any) {
    // console.log("체크");
    // console.log(e.target.scrollLeft, window.innerWidth);
    e.target.scrollLeft -= window.innerWidth + 80;
  }

  function handleClick(movie: MovieData) {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  if (movies) {
    return (
      <section className="row">
        <h2>{props.title}</h2>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true} // loop 기능을 사용할 것인지
          breakpoints={{
            1378: {
              slidesPerView: 6, // 한번에 보이는 슬라이드 개수
              slidesPerGroup: 6, // 몇개씩 슬라이드 할지
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          navigation // arrow 버튼 사용 유무
          pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        >
          <div id={props.id} className="row__posters">
            {movies.map((movie: MovieData) => (
              <SwiperSlide key={movie.id}>
                <img
                  key={movie.id}
                  style={{ padding: "25px 0" }}
                  className={`row__poster ${
                    props.isLarageRow && "row__posterLarge"
                  }`}
                  src={`https://image.tmdb.org/t/p/original/${
                    props.isLarageRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt="영화들 이미지"
                  onClick={() => {
                    handleClick(movie);
                  }}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        {modalOpen && movieSelected && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )}
      </section>
    );
  } else {
    return <div></div>;
  }
}

export {};
