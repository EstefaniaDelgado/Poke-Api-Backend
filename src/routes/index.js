const { Router } = require('express');
const pokemonsRouter = require("./pokemonsRouter.js");
const tiposRouter = require("./tiposRouter.js");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// definir los router para cada modelo:
router.use("/pokemons", pokemonsRouter);
router.use("/types", tiposRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;









// router.get('/pokemons', async (req, res) => {
//   const info = await getApiInfo();
//   res.send(info);
// });

//crear registros en la base de datos:

//  router.get('/pokemons', async (req, res) => {
//   try {
//     const pokemons = await Pokemon.findAll(); // metodo para que me traiga todos los usuarios
//     res.status(200).send(pokemons);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// router.post("/pokemons",async(res,req)=>{
//   try {
//     const {name,life,attack,defense,speed,height,weight} = req.body;
//     const newPokemon = await Pokemon.create({name,life,attack,defense,speed,height,weight});
//   res.status(200).send(newPokemon);

//   } catch (error) {
//     res.status(400).send("Pokemon not found")
//   }
// });
