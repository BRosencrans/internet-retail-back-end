const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(allTags => res.json(allTags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(tagIds => {
      if (!tagIds) {
        res.status(404).json({ message: "This id does not exist"});
        return;
      }
      res.json(tagIds);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creates a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(newTag => res.json(newTag))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(updateTags => {
        if (!updateTags[0]) {
            res.status(404).json({ message: "This id does not exist"});
            return;
        }
        res.json(updateTags);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  //deletes a tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(deleteTag => {
        if (!deleteTag) {
            res.status(404).json({ message: "This id does not exist"});
            return;
        }
        res.json(deleteTag);
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

module.exports = router;
