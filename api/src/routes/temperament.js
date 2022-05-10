require("dotenv").config();
const { Router } = require("express");
const { Temperament } = require("../models/Dog");
const temperament = Router();

temperament.get("/", async (req, res) => {
  try {
    let temps = await Temperament.findAll({
      order: [["name", "asc"]],
    });
    if (temps) res.json(temps);
    else res.json("Not Results Found");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = temperament;
