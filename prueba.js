const axios = require('axios');
const {Pokemon,Tipo} = require("./src/db.js")
const fetch = require("node-fetch");
const { response } = require('express');
//funcion async: FETCH

// const getData = async ()=>{
//   try {
//     const api = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=5");
//   const data = await api.json();
//   const results = data["results"].map((ele)=>ele.name)
//    console.log(results);
//    return results;
    
//   } catch (error) {
//     console.log(error);
//   }
 
//   }
// getData()

//AXIOS:
// const getData = async()=>{
//   const api = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=5");
//   const data = await api.data;
//   const results = data["results"].map((ele)=>ele.name);
//   console.log(results)
//   return results
// }
// getData()

// PROMESAS FETCH:
// const getData = ()=>{
//   const api = fetch("https://pokeapi.co/api/v2/pokemon/?limit=5")
//   .then(response=>response.json())
//   .then(data=>data["results"].map((ele)=>ele.name))
//   console.log(api)
//   return api;
// }
// getData()

//AXIOS:
// const getData=()=>{
//   const api = axios.get("https://pokeapi.co/api/v2/pokemon/?limit=5")
//   .then(response=>response.data)
//   .then(data => data["results"].map((ele)=>ele.name));
//   console.log(api);
//   return api;
// }
// getData();


//asyn AXIOS:
// const getData = async()=>{
//   const api = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=5");
//   const data = await Promise.all(api.data["results"].map( async(ele)=>{
//     const responses = await axios.get(ele.url);
//     const results = await responses.data;
//     const pokemon={
//       id: results["id"],
//       name:results["name"],
//       types:results["types"].map((ele)=>ele.type.name)
//     }
//     return pokemon;
//   }));
//   console.log(data)
//   return data;
//   }
// getData();

//FETCH:
const getData = async()=>{
  try {
  const api = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=5");
  const data = await api.json();
  const responses = await Promise.all(data["results"].map(async(ele)=>{
    const results = await fetch(ele.url)
    const info = await results.json();
    const pokemon={
      name: info["name"],
      id:info["id"],
    }
    return pokemon;
  }))
  console.log(responses);
  return responses;
  } catch (error) {
    console.log(error)
  }
};
getData();




//me trae de este endpoint el nombre el pokemon
// const getApiInfo = async () => {
//   let arrayPokemonsApi = [];
//   const apiUrl = await axios
//     .get('https://pokeapi.co/api/v2/pokemon/?limit=5')
//     .then(async (response) => {
//       const arrayResultadosApi = response.data['results'];
//       const promesasArray = [];
//       arrayResultadosApi.map((ele) => promesasArray.push(axios.get(ele.url)));
//       //obtengo la url de cada pokemon

//       await Promise.all(promesasArray)

//         .then((poke) => {
//           arrayPokemonsApi = poke.map((ele) => {
//             return {
//               id: ele.data['id'],
//               name: ele.data['name'],
//               life: ele.data['stats'][0]['base_stat'],
//               attack: ele.data['stats'][1]['base_stat'],
//               defense: ele.data['stats'][2]['base_stat'],
//               speed: ele.data['stats'][5]['base_stat'],
//               weight: ele.data['weight'],
//               height: ele.data['height'],
//               types:ele.data['types'].map((ele) => ele.type.name),
//               img: ele.data['sprites']['other']['official-artwork'][
//                 'front_default'
//               ],
//             };
//           });
//         })
//         .catch((error) => {
//           return error;
//         });
//     })
//     .catch((error)=>{
//       return error;
//     });
//     console.log(arrayPokemonsApi)
//   return arrayPokemonsApi;
// };


const getApiInfo = async()=>{

  let allInfoPokemons=[];
  
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1");
  //console.log(apiUrl.data["results"])
  const infoApi = await Promise.all(apiUrl.data["results"].map(async(ele)=>{
    const apiUrls = await axios.get(ele.url);
    const results = apiUrls.data;
  const pokemon = {
      id:results["id"],
      name:results["name"],
      life:results["stats"][0]["base_stat"],
      attack:results["stats"][1]["base_stat"],
      defense:results["stats"][2]["base_stat"],
      speed:results['stats'][5]['base_stat'],
      img:results["sprites"]["other"]["official-artwork"]["front_default"],
      weight:results["weight"],
      height:results["height"],
      types: results['types'].map((ele) =>ele.type.name),
  }
 return pokemon
  }))
  //console.log(infoApi)
    return infoApi
}
//getApiInfo();

  //trae la info del pokemon segun su id
 let infoPokemon =[];
 const getInfoApiById = async (id) => { 
   const urlApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
   //const apiInfo = await urlApi.data;
   //console.log(apiInfo)
   const results = await urlApi.data;
   //console.log(results)
   const pokemon = {
      id:results["id"],
      name:results["name"],
      life:results["stats"][0]["base_stat"],
      attack:results["stats"][1]["base_stat"],
      defense:results["stats"][2]["base_stat"],
      speed:results['stats'][5]['base_stat'],
      img:results["sprites"]["other"]["official-artwork"]["front_default"],
      weight:results["weight"],
      height:results["height"],
      types: results['types'].map((ele)=>ele.type.name),

   }
    //infoPokemon.push(pokemon)
   console.log(pokemon)
  // console.log(infoPokemon);
   
}
//getInfoApiById(25)

// este endpoint me devuelve  el type:

const getTypeByApi = async()=>{
   const urlApi = await axios.get("https://pokeapi.co/api/v2/type");
   const infoApi = await urlApi.data["results"].map((ele)=>ele["name"]);
  console.log(infoApi)
  

}
//getTypeByApi();

//traerme la info de la base de datos:
// const getDbInfo = async () => {
//    return await Pokemon.findAll({
//      //estoy diciendo traeme este modelo mediante el nombre, que es el nombre del tipo
//      include: {
//        model: Tipo,
//        attributes: ['name'],
//        through: {
//          attributes: [],
//        },
//      },
//    });
//  };

 




 // GET /pokemons/{idPokemon}: me va a devolver el detalle del pokemon traido por id
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log(req.params);
//   try {
//     const pokemons = await getInfoApiById(id);
//     if (pokemons) return res.status(200).send(pokemons);
//   } catch (error) {
//     return res.status(404).send({ error: 'Pokemon not found with that ID' });
//   }
// });


// de este link la defensa y el ataque
// const getInfoApiById = async (id) => {
//    const urlApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//    const apiInfo = await urlApi.data;
//    const results = await apiInfo['stats'].map((ele) => [
//      ele['stat']['name'],
//      ele['base_stat'],
//    ]);
//    console.log(results);
//    return results;
//  };


  //let i =1;
  // while(i<3){
  //     let link = `https://pokeapi.co/api/v2/pokemon/${i}`
  //     let apiUrl = await axios.get(link);
      
  //     console.log(apiUrl.data["stats"].map(ele=>
  //      [ele["stat"]["name"],ele["base_stat"]]));
  //     i++;
  // };


  // let idPokemon = 1;
  // const getApiInfo = async () => {
  //   const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
  //   const apiInfo = await apiUrl.data['results'].map((ele) => {
  //     return {
  //       id: idPokemon++,
  //       name: ele.name,
  //     };
  //   });
  //   return apiInfo;
  // };
 
// encuentra el pokemon por su id en la db:

// const infoDbById = async(pokeId)=>{
//      const findPokeId = await Pokemon.findOne({
//       where:{id: pokeId},
//      include: {
//       model: Tipo,
//       attributes: ['name'],
//       through: {
//         attributes: [],
//       },
//     }
//   });
//   return findPokeId;
//   };

const getInfoApiByType = async () => {
  const urlApi = await axios.get('https://pokeapi.co/api/v2/type');
  const infoApi = await urlApi.data;
  console.log(infoApi)
  return infoApi;
};
//getInfoApiByType()



//seteo en la base de datos de los pokemon que me vienen de la api usando un map y el metodo de sequelice findOrCreate:

// const getApiInfo = async () => {
//   const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10');
//   const infoApi = await Promise.all(
//     apiUrl.data['results'].map(async (ele) => {
//       const apiUrls = await axios.get(ele.url);
//       const results = await apiUrls.data;
//       const pokemon = {
//         id: results['id'],
//         name: results['name'],
//         life: results['stats'][0]['base_stat'],
//         attack: results['stats'][1]['base_stat'],
//         defense: results['stats'][2]['base_stat'],
//         speed: results['stats'][5]['base_stat'],
//         types: results['types'].map((ele) => ele.type.name),
//         weight: results['weight'],
//         height: results['height'],
//         img: results['sprites']['other']['official-artwork']['front_default'],
//       };
//       return pokemon;
//     })
//   );
  
//   infoApi.map(ele=>{
//     Pokemon.findOrCreate({
//       where:{
//         name:ele.name,
//         life:ele.life,
//         attack:ele.attack,
//         defense:ele.defense,
//         speed:ele.speed,
//         weight:ele.weight,
//         height:ele.height,
//         img:ele.img,
//       }
//     });
//   });
//   console.log(infoApi);
//   return infoApi;
// };