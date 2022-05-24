import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBreedDetail } from "../../Redux/Actions";
import S from "./Detail.module.css";
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const breed = useSelector((state) => state.breedDetail);
  let names = ''
  breed.temperaments?.map((e) => (names += ` ${e?.name || e},`));

  useEffect(()=>{
    dispatch(getBreedDetail(id))
  },[dispatch, id])
  return (
    <div className={S.box}>
      <div className={S.container}>
        <h1 className={S.title}>{breed.name}</h1>
        <h2>{`Height : ${breed.height} cm`}</h2>
        <h2>{`Weight : ${breed.weight} kg`}</h2>
        <h2>{`life span : ${breed.life_span}`}</h2>
        <h3>{`temperament : ${names.slice(0,names.length-1)}`}</h3>
        <img className={S.img} src={breed?.image} alt="hola " />
      </div>
    </div>
  );
};

export default Detail;
