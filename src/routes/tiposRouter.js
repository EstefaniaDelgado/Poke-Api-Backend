const { Router } = require('express');
const { Tipo } = require('../db');
const { getInfoApiByType } = require('../utils/utils.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const infoApiByType = await getInfoApiByType();
    const types = infoApiByType['results'].map((t) => t.name); 
   // console.log(types);
   
    types.forEach((elem) => {
      Tipo.findOrCreate({
        // seteo los tipos en la base de datos, cuando llamo a la ruta me los guarda en base de datos
        where: { name: elem },
      });
    });

    const allTypes = await Tipo.findAll();
    return res.status(200).send(allTypes);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Ruta DELETE:
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const type = await Tipo.findOne({
      where: { id },
    });
    await type.destroy();
    res.status(200).send(type);
  } catch (error) {
    res.status(400).send('type was not delete');
  }
});

// Ruta put :

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name } = req.body;
  try {
    const upDateType = await Tipo.findByPk(id);
    upDateType.name = name;
    await upDateType.save();
    res.status(200).send(upDateType);
  } catch (error) {
    res.status(404).send('Cannot update the Type');
  }
});

module.exports = router;
