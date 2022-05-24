import React, { useState, useEffect } from "react";
import axios from "axios";
import S from "./CreateBreed.module.css";
import validate from "../../validate";
function CreateBreed() {
  const [Breed, setBreed] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    img: "",
    temperaments: [],
  });
  const [temperaments, setTemperaments] = useState();
  const [name] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/temperaments")
      .then((r) => r.data)
      .then((e) => setTemperaments(e));
  }, []);

  const handleSelector = (e) => {
    let temp = Breed.temperaments;
    temp.push(e.target.value);
    // eslint-disable-next-line eqeqeq
    let a = temperaments.filter((i) => i.id == e.target.value);
    if(name.includes(a[0].name)){
      return
    }
    name.push(a[0].name);
    setBreed({
      ...Breed,
      [e.target.name]: temp,
    });
  };

  const handleChange = (e) => {
    setErrors(validate(e, Breed, errors))
    setBreed({
      ...Breed,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={S.box}>
      <div className={S.container}>
        <form
          onSubmit={(e) => {
            if (!Breed.temperaments.length) {
              e.preventDefault();
              alert("it is necessary to add at least one temperament");
              return;
            }
            axios.post("http://localhost:3001/dog", {
              name: Breed.name,
              height: `${Breed.min_height} - ${Breed.max_height}`,
              weight: `${Breed.min_weight} - ${Breed.max_weight}`,
              life_span: Breed.life_span + " years",
              image: Breed.img,
              temperaments: Breed.temperaments,
            });
          }}
          className={S.form}
        >
          <input
            required
            name="name"
            type="text"
            placeholder="Name :"
            autoComplete="off"
            onChange={handleChange}
          />
          <div className={S.group}>
            <input
              required
              name="min_weight"
              type="number"
              placeholder="Min Weight :"
              onChange={handleChange}
              min="1"
            />
            <input
              required
              name="max_weight"
              type="number"
              placeholder="Max Weight :"
              onChange={handleChange}
              min="1"
            />
          </div>
          {errors.max_weight && <p className={S.alert}>{errors.max_weight} </p>}
          <div className={S.group}>
            <input
              required
              name="min_height"
              type="number"
              placeholder="Min Height :"
              onChange={handleChange}
              min="1"
            />
            <input
              required
              name="max_height"
              type="number"
              placeholder="Max Height :"
              onChange={handleChange}
              min="1"
            />
          </div>
          {errors.max_height && <p className={S.alert}>{errors.max_height} </p>}
          <input
            required
            name="life_span"
            type="number"
            placeholder="Life span :"
            onChange={handleChange}
            min="1"
          />
          <input
            required
            name="img"
            type="link"
            autoComplete="off"
            placeholder="Image Link/Url :"
            onChange={handleChange}
            min="1"
          />
          {errors.img && <p className={S.alert}>{errors.img} </p>}
          <select
            required
            className={S.temps}
            onChange={handleSelector}
            name="temperament"
          >
            <option hidden>Choose temperaments</option>
            {temperaments?.map((e) => (
              <option name="temperaments" key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <ul className={S.list}>
            {name?.map((e) => (
              <li key={Math.random(1)}>{e}</li>
            ))}
          </ul>
          <input
            type="submit"
            className={S.submit}
            disabled={errors.disable}
          ></input>
        </form>
      </div>
      <div className={S.imgContainer}>
        <div>Your Breed Image Here</div>
        {Breed.img && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            className={S.img}
            src={Breed.img}
            alt="If you see this message, the address of your image is invalid, try another"
          />
        )}
      </div>
    </div>
  );
}

export default CreateBreed;
