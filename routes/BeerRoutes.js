
const express = require('express');
const { registerRoute } = require('../swagger');
const {
    addBeer,
    showBeers,
    searchBeers,
    updateBeerRating,
} = require('../controllers/BeerController');

const router = express.Router();


router.use(registerRoute('/beers', 'post', 'Add a new beer', addBeer, [
    {
      name: 'body',
      in: 'body',
      required: true,
      description: 'Beer object to be added',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Bavaria' },
          type: { type: 'string', example: 'Black' },
          rating: { type: 'number', example: 3 },
        },
        required: ['name', 'type', 'rating'],
      },
    },
  ])
);

router.use(registerRoute('/beers', 'get', 'Retrieve a list of beers', showBeers));

router.use(registerRoute('/beers/search', 'get', 'Search for beers by name', searchBeers, [
    {
      name: 'query',
      in: 'query',
      required: true,
      description: 'Name of the beer to search for',
      type: 'string',
    },
  ])
);

router.use(registerRoute('/beers/:name/rating', 'put', 'Update the rating of a specific beer', updateBeerRating, [
    {
      name: 'name',
      in: 'path',
      required: true,
      description: 'Name of the beer to update rating',
      type: 'string',
    },
    {
      name: 'body',
      in: 'body',
      required: true,
      description: 'New rating to be updated',
      schema: {
        type: 'object',
        properties: {
          rating: { type: 'number' },
        },
        required: ['rating'],
      },
    },
  ])
);

module.exports = router;
