import React from "react";
import S from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ name, height, weight, life_span, img, id}) {
  return (
    <div className={S.container}>
      <Link to={`/breed/${id}`}>
        <h4>{name}</h4>
      </Link>
      <div className={S.row}>
        <p>height :</p>
        <p>{height}</p>
        <p> weight :</p>
        <p>{weight}</p>
      </div>
      <p>{`Life Span: ${life_span}`}</p>
      <img src={img} alt="img" className={S.img} />
    </div>
  );
}
export default Card;
