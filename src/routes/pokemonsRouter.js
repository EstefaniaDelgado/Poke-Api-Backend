const { Router } = require('express');
const validatePokemon = require('../middlewares/middleware.js');
const { Pokemon, Tipo } = require('../db.js');
const {
  getAllPokemons,
  getInfoApiById,
  getPokemonInDb,
  getDbInfo,
} = require('../utils/utils.js');

const router = Router();

// GET /pokemons: y GET "/pokemons?name=""
router.get('/', async (req, res) => {
  const { name } = req.query;
  console.log(req.query);
   
  const pokemonsTotal = await getAllPokemons(); 

  try {
   
    if (name) {
      let pokemonsByName = await pokemonsTotal.filter(
        (ele) => ele.name.toLowerCase().includes(name.toLowerCase())  //tomo toda la constante que tiene todo y le hago un filtro.
      );
      //si encontraste algo, el nombre
      if (pokemonsByName.length) return res.status(200).send(pokemonsByName);
      res.status(404).send('Pokemon not found');
    } else {
      //si no hay un query envio toda la lista de pokemons
      return res.status(200).send(pokemonsTotal);
    }
  } catch (error) {
    res.status(404).send(error.message)
  }
});


//trae los pokemons de la db sino no hay nada aun, devuelve un msj
router.get("/filterDb", async(req,res)=>{
  const pokemonDb = await getDbInfo();
  console.log(pokemonDb)
  try {
    if(!pokemonDb.length) return  res.status(400).send({ok:false, message:"There is nothing yet in database"})
    else{
      return res.status(200).send({ok:true, message:"Pokemon found", data:pokemonDb})
    }
    
  } catch (error) {
    res.status(404).send(error.message)
  }
 
})

// GET /pokemons/{idPokemon}: me va a devolver el detalle del pokemon traido por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    if (isNaN(id)) {
      //busca en la db si el id no es un numero
      const pokemonInDb = await getPokemonInDb(id);
      if (pokemonInDb) return res.status(200).send(pokemonInDb);
    } else {
      // si el id si es un numero, busca en la Api
      const pokemonInApi = await getInfoApiById(id);
      if (pokemonInApi) return res.status(200).send(pokemonInApi);
    }
  } catch (error) {
    return res.status(404).send({ error: 'Pokemon not found with that ID' });
  }
});

//RUTA POST/pokemons me crea un pokemon
router.post('/', validatePokemon, async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    img,
    createInDb,
    weight,
    types,
  } = req.body;
  try {
    const createdPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      img,
      createInDb,
      weight,
    });
    const typeDb = await Tipo.findAll({
      where: { name: types },
    });
    createdPokemon.addTipo(typeDb);
    res.status(200).send("Pokemon was successfully created");
    
  } catch (error) {
    res.status(404).send({ error: 'Cannot create Pokemon' });
  }
 
});


//request extra
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, hp, attack } = req.body;
  try {
    const pokemonUpDate = await Pokemon.findByPk(id);
    pokemonUpDate.name = name;
    pokemonUpDate.hp = hp;
    pokemonUpDate.attack = attack;
    await pokemonUpDate.save();
    console.log(pokemonUpDate);
    res.status(200).send(pokemonUpDate);
  } catch (error) {
    res.status(404).send('Cannot update the pokemon');
  }
});

//eliminar un registro de un pokemon en la db:
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const findPokemon = await Pokemon.findByPk(id);
    await findPokemon.destroy();
    res.status(200).send({ok: true, message: "Pokemon successfully deleted "});
  } catch (error) {
    res.status(404).send({ ok:false, message: 'Pokemon not found' });
  }
});

module.exports = router;
