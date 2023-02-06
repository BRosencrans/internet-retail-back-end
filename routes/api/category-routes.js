const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // finds all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(allCats => res.json(allCats))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(catIds => {
      if (!catIds) {
        res.status(404).json({ message: "This id does not exist"}); 
        return; 
      }
      res.json(catIds);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creates a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCat => res.json(newCat))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  //update a catagories name by its `id` value
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(updateCats => {
        if (!updateCats[0]) {
            res.status(404).json({ message: "This id does not exist"});
            return;
        }
        res.json(updateCats);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});

router.delete('/:id', (req, res) => {
  // deletes a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(deleteCat => {
        if (!deleteCat) {
            res.status(404).json({ message: "This id does not exist"});
            return;
        }
        res.json(deleteCat);
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

module.exports = router;
