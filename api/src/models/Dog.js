const { Sequelize, DataTypes } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

var db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false,
});

const Breed = db.define(
  "breed",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const Temperament = db.define(
  "temperament",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Breed.belongsToMany(Temperament, { through: "breed_temp", timestamps: false });
Temperament.belongsToMany(Breed, { through: "breed_temp", timestamps: false });

module.exports = {
  Breed,
  Temperament,
  db,
};
