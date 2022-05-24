require("dotenv").config();
const { Router } = require("express");
const { Breed, Temperament } = require("../models/Dog");
const { Op } = require("sequelize");
const dogs = Router();
const axios = require("axios");

var api = [];
axios.get("https://api.thedogapi.com/v1/breeds").then((res) => {
  res.data?.forEach((element) => {
    let arr = [];
    let a = element.temperament?.split(", ");
    a?.forEach(e => {
      arr.push({
        name: e
      })
    })
    api.push({
      id: element.id,
      name: element.name,
      height: element.height.metric,
      weight: element.weight.metric,
      life_span: element.life_span,
      image: element.image.url,
      temperaments: arr,
    });
  });
});

async function search(name) {
  return await axios
    .get(` https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    .then((res) => res.data);
}

dogs.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    if (name) {
      let arr = [];
      let s = await search(name);
      let match = await Breed.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      s?.map((e) => {
        arr.push(e.name);
      });
      match?.map((e) => {
        arr.push(e.name);
      });

      if (arr.length) {
        res.json(arr);
      } else {
        res.status(404).json("Not Matches Found :C");
      }
    } else {
      let breeds = await Breed.findAll({
        include: [Temperament],
        order: [["id", "asc"]],
      });

      res.json(breeds.concat(api));
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

dogs.get("/:idBreed", async (req, res) => {
  let { idBreed } = req.params;
  try {
    let dog = [];
    if (idBreed >= 300) {
      console.log("entro");
      let b = await Breed.findByPk(idBreed, {
        include: [Temperament],
      });
      dog.push(b);
    } else {
      dog = api.filter((e) => e.id == idBreed);
    }
    if (dog) {
      console.log(dog);
      res.json(dog);
    } else {
      res.status(404).json("Not found");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = dogs;
