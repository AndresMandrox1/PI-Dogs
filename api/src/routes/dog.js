require("dotenv").config();
const { Router } = require("express");
const { Breed } = require("../models/Dog");
const dog = Router();

dog.post("/", async (req, res) => {
  const { name, height, weight, life_span, image, temperaments } = req.body;
  if (!temperaments.length) {
    res.sendStatus(500, "Needs at least one temperament");
  }
  try {
    let n = await Breed.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    await n.addTemperament(temperaments);
    res.json(n);
  } catch (err) {
    res.sendStatus(500, err);
  }
});

module.exports = dog;
