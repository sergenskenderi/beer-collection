
const express = require('express');

const {
    addBeer,
    showBeers,
    searchBeers,
    updateBeerRating,
} = require('../controllers/BeerController');

const router = express.Router();

router.post('/', addBeer);
router.get('/', showBeers);
router.get('/search', searchBeers);
router.put('/:name/rating', updateBeerRating);

module.exports = router;
