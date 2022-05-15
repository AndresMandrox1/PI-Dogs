import React from "react";
import S from "./LandingPage.module.css";
import { Link } from "react-router-dom";

function landingPage() {
  return (
    <div className={S.fondo}>
      <h1 className={S.title}>The Dogs App</h1>
      <Link to="/home">
        <button className={S.button}>Enter</button>
      </Link>
    </div>
  );
}

export default landingPage;
