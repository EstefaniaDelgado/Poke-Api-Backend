const axios = require('axios'); //importa a axios para hacer la solicitud a la API, donde le paso el endpoint
const { Pokemon, Tipo } = require('../db.js');

//Llamado al endpoint de la api y me va a traer toda la informacion que voy a necesitar con un limite de 40 pokemons

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=40'
    );
    const infoApi = await Promise.all(
      apiUrl.data['results'].map(async (ele) => {
        const apiUrls = await axios.get(ele.url);
        const results = await apiUrls.data;
        const pokemon = {
          id: results['id'],
          name: results['name'],
          hp: results['stats'][0]['base_stat'],
          attack: results['stats'][1]['base_stat'],
          defense: results['stats'][2]['base_stat'],
          speed: results['stats'][5]['base_stat'],
          /* array de strings */
          types: results['types'].map((ele) => ele.type.name),
          weight: results['weight'],
          height: results['height'],
          img: results['sprites']['other']['dream_world']['front_default'],
        };
        return pokemon;
      })
    );
    // infoApi.forEach(async(pokemon) => {
    //   const keepDb = await Pokemon.findOrCreate({
    //     where: {
    //       name: pokemon.name,
    //       hp: pokemon.hp,
    //       attack:pokemon.attack ,
    //       defense: pokemon.defense,
    //       speed: pokemon.speed,
    //       height: pokemon.height,
    //       weight: pokemon.weight,
    //       img: pokemon.img,
    //      },
    //   });

    // });

    return infoApi;
  } catch (error) {
    console.log(error);
  }
};

//Informacion de la BASE DE DATOS:
const getDbInfo = async () => {
  try {
    const pokemonWithType = await Pokemon.findAll({
      include: {
        model: Tipo,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    const pokemonInDb = pokemonWithType.map((pokemon) => {
      const results = pokemon.toJSON();
      return {
        ...results,
        types: results.Tipos.map((type) => type.name),
      };
    });

    // console.log(pokemonInDb);
    return pokemonInDb;
  } catch (error) {
    console.log(error);
  }
};

//me traiga todo de la API o de DB
const getAllPokemons = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = await apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log(error);
  }
};

//ENDPOINT: me trae toda la informacion detallada de un pokemon determinado por su id

const getInfoApiById = async (id) => {
  try {
    const urlApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const results = await urlApi.data;
    //console.log(results)
    const pokemon = {
      id: results['id'],
      name: results['name'],
      hp: results['stats'][0]['base_stat'],
      attack: results['stats'][1]['base_stat'],
      defense: results['stats'][2]['base_stat'],
      speed: results['stats'][5]['base_stat'],
      weight: results['weight'],
      height: results['height'],
      types: results['types'].map((ele) => ele.type.name),
      img: results['sprites']['other']['dream_world']['front_default'],
    };
    return pokemon;
  } catch (error) {
    console.log(error);
  }
};

//Traemos todos los pokemons por su id de la base de datos:
const getPokemonInDb = async (id) => {
  try {
    const findPokemon = await Pokemon.findOne({
      where: {
        id: id,
      },
      include: {
        model: Tipo,
        attributes: ['name'],
      },
    });
    return findPokemon;
  } catch (error) {
    console.log(error);
  }
};

//ENDPOINT: me trae el tipo
const getInfoApiByType = async () => {
  try {
    const urlApi = await axios.get('https://pokeapi.co/api/v2/type');
    const infoApi = await urlApi.data;
    return infoApi;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getInfoApiById,
  getInfoApiByType,
  getAllPokemons,
  getPokemonInDb,
};
