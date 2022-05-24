const { Sequelize, DataTypes } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST , DB_NAME} = process.env;

let db =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
        { logging: false, native: false }
      );

// var db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
//   logging: false,
// });

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
