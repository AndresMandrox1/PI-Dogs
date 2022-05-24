require("dotenv").config();
const { Router } = require("express");
const { Breed } = require("../models/Dog");
const dog = Router();
let count = 300;

dog.post("/", async (req, res) => {
  const { name, height, weight, life_span, image, temperaments } = req.body;
  if (!temperaments.length) {
    res.sendStatus(500, "Needs at least one temperament");
  }
  let a = await Breed.findOne({where:{ name: name}})
  if(!a){
    try {
      let n = await Breed.create({
        id:count,
        name,
        height,
        weight,
        life_span,
        image,
      });
      await n.addTemperament(temperaments);
      count++;
      res.json(n);
    } catch (err) {
      res.sendStatus(500, err, 'no hay temps');
    }
  }
});

module.exports = dog;
