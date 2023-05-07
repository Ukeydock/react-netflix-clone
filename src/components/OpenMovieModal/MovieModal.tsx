import React, { useRef, useCallback } from "react";
import "./MovieModal.css";
import useOnclickOutside from "../../hooks/useOnclickOutside";
// import useOnClickOutside from "../../hooks/useOnClickOutside";

function MovieModal(props: {
  backdrop_path: any;
  title: any;
  overview: any;
  name: any;
  release_date: any;
  // first_air_date: any;
  vote_average: any;
  setModalOpen: Function;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useOnclickOutside(ref, () => {
    props.setModalOpen(false);
  });

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref ? ref : null}>
          <span
            onClick={() => props.setModalOpen(false)}
            className="modal-close"
          >
            X
          </span>

          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${props.backdrop_path}`}
            alt="modal__poster-img"
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc">100% for you</span>{" "}
              {props.release_date ? props.release_date : "date"}
            </p>

            <h2 className="modal__title">
              {props.title ? props.title : props.name}
            </h2>
            <p className="modal__overview"> 평점: {props.vote_average}</p>
            <p className="modal__overview"> {props.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
