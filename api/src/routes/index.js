const { Router } = require('express');
// Importar todos los routers;
const temperament = require('./temperament')
const dogs = require("./dogs.js");
const dog = require('./dog')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// router.get("/", (req, res) => {
  // res.status(200).send("index");
// });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs',dogs)
router.use('/dog',dog)
router.use('/temperaments',temperament)
module.exports = router;
