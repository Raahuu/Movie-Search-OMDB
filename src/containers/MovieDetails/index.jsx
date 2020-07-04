import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./style.module.css";

const MovieDetails = () => {
  const movieData = useSelector((state) => state.Movie.data);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!Object.keys(movieData).length) {
      dispatch({
        type: "SELECT_MOVIE",
        payload: { id: history.location.pathname.split("/")[2], history },
      });
    }
  }, []);

  return (
    <div className={styles.main_screen}>
      <div className={`${styles.movie_details} ${styles.neumophic}`}>
        <p className={styles.title}>{movieData.title}</p>
        <p className={styles.plot}>{movieData.plot}</p>
        <div className={styles.poster}>
          <img
            width="100%"
            height="100%"
            src={movieData.poster}
            alt={movieData.title}
          />
        </div>
        <p className={styles.year}>Year : {movieData.year}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
