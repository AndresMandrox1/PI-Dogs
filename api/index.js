const server = require("./src/app.js");
var { db, Breed, Temperament } = require("./src/models/Dog");
const axios = require("axios");

let obj = {};
db.sync({ force: true }).then(() => {
  axios.get("https://api.thedogapi.com/v1/breeds").then((res) => {
    res.data?.forEach((e) => {
      let tempers = e.temperament?.split(", ");
      tempers?.forEach((t) => {
        Temperament.findOrCreate({ where: { name: t } }).then((t) => {
          if (!obj.hasOwnProperty(e.id)) {
            obj[e.id] = [];
          }
          obj[e.id].push(t[0].id);
        });
      });
    });

    res.data.map((e) =>
      Breed.create({
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
        image: e.image.url,
        apiId: e.id,
      }).then((breeds) => {
        breeds.addTemperament(obj[breeds.dataValues.apiId]);
      })
    );
  });
  server.listen(3001, () => {
    console.log("Server is listening at 3001 port");
  });
});
