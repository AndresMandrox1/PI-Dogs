const server = require("./src/app.js");
var { db, Temperament } = require("./src/models/Dog");
const axios = require("axios");
const {PORT} = process.env

db.sync({ force: true }).then(() => {
  axios.get("https://api.thedogapi.com/v1/breeds").then((res) => {
    res.data?.forEach((e) => {
      let tempers = e.temperament?.split(", ");
      tempers?.forEach((t) => {
        Temperament.findOrCreate({ where: { name: t } });
      });
    });
  });
  server.listen(PORT, () => {
    console.log("Server is listening at 3001 port");
  });
});
