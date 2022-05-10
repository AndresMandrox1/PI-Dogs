const { Router } = require("express");
const { Breed, Temperament } = require("../models/Dog");
const { Op } = require("sequelize");
const dogs = Router();

dogs.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    if (name) {
      let match = await Breed.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [Temperament],
      });
      if (match.length > 0) {
        res.json(match);
      } else {
        res.status(404).json("Not Matches Found");
      }
    } else {
      let temperaments = await Breed.findAll({
        include: [Temperament],
      });
      res.json(temperaments);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

dogs.get("/:idBreed", async (req, res) => {
  let { idBreed } = req.params;

  try {
    let dog = await Breed.findByPk(idBreed, {
      include: [Temperament],
    });
    if (dog) {
      res.json(dog);
    } else {
      res.status(404).json("Not found");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = dogs;
