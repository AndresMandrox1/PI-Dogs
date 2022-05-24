import React, { useState, useEffect } from "react";
import S from "./SideBar.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  searchBreed,
  temperamentFilter,
  filterByName,
  filterByWeight,
  filterByOrigin,
} from "../../Redux/Actions";

function SideBar() {
  const dispatch = useDispatch();
  const [breed, setBreed] = useState("");
  const [temperaments, setTemperaments] = useState();
  const [value, setValue] = useState("");
  const [origin, setOrigin] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    axios
      .get("/temperaments")
      .then((r) => r.data)
      .then((e) => setTemperaments(e));
  }, []);

  const search = (e) => {
    e.preventDefault();
    dispatch(searchBreed(breed));
    setBreed("");
  };

  const tempChange = (e) => {
    setTemp(e.target.value);
    setValue("select");
    setOrigin("From everywhere");
    if (e.target.value === "all") {
      dispatch(searchBreed(""));
      return;
    }
    dispatch(temperamentFilter(e.target.value));
  };

  const order = (e) => {
    setValue(e.target.value);
    if (e.target.value === "name") {
      dispatch(filterByName());
    } else if (e.target.value === "weight") {
      dispatch(filterByWeight());
    }
  };

  const originChange = (e) => {
    dispatch(filterByOrigin(e.target.value));
    setOrigin(e.target.value);
    setValue("select");
    setTemp("all");
  };

  return (
    <div className={S.container}>
      <div className={S.search}>
        <label>Search a breed</label>
        <form>
          <input
            type="text"
            placeholder="Breed..."
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            value={breed}
            className={S.breed}
            autoComplete="off"
          />
          <button className={S.button} onClick={search}>
            Search
          </button>
        </form>
      </div>

      <div className={S.filter}>
        <div className={S.sort}>
          <h2>Sort By</h2>
          <select
            name="order"
            onChange={order}
            className={S.comboBox}
            value={value}
          >
            <option hidden value="select">
              select
            </option>
            <option value="name">name</option>
            <option value="weight">weight</option>
          </select>
        </div>
        <div className={S.sort}>
          <h2>Filter</h2>
          <select value={temp} onChange={tempChange} className={S.comboBox}>
            <option hidden>Choose temperaments</option>
            <option value="all">All </option>
            {temperaments?.map((e) => (
              <option name="temperaments" key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <select value={origin} onChange={originChange} className={S.comboBox}>
            <option value="all">From everywhere</option>
            <option value="api">From Api</option>
            <option value="bd">From Data Base</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
