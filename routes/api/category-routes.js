const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
//  Category.findAll({
//    include: [Product],
//  })
//  .then((categories) => res.json(categories))
//  .catch((err) => console.log(err));
//});

//Both the route above and the one below find routes

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Products
    indclude: [Product],
  })
  .then((category) => res.json(category))
  .catch((err) => console.log(err))
  
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
