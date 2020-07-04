import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./style.module.css";

const Card = (props) => {
  return (
    <div
      className={styles.card}
      onClick={() => props.selectedMovie(props.data.imdbID)}
    >
      <p className={styles.movie_title}>{props.data.Title}</p>
      <div className={styles.movie_thumb}>
        {!props.data && !props.data.Poster ? (
          <ClipLoader size={75} color={"#123abc"} loading={true} />
        ) : (
          <img
            width="100%"
            height="100%"
            src={props.data.Poster}
            alt={props.data.Title}
          />
        )}
      </div>
      <p className={styles.movie_year}>{props.data.Year}</p>
    </div>
  );
};

export default Card;
