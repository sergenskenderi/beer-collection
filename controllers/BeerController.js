const Beer = require('../models/Beer');

let beers = [];

const addBeer = (req, res) => {
    const { name, type, rating } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    if(!type) {
        return res.status(400).json({ error: 'Type is required' });
    }

    const newBeer = new Beer(name, type, rating);
    beers.push(newBeer);
    res.status(201).json(newBeer);
};


const showBeers = (req, res) => {
    res.json(beers.map(beer => ({
        name: beer.name,
        type: beer.type,
        averageRating: beer.averageRating,
    })));
};

const searchBeers = (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const beersResult = beers.filter(beer => beer.name.toLowerCase().includes(query.toLowerCase()));
    res.json(beersResult.map(beer => ({
        name: beer.name,
        type: beer.type,
        averageRating: beer.averageRating,
    })));
};

const updateBeerRating = (req, res) => {
    const { name } = req.params;
    const { rating } = req.body;

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
    }

    const selectedBeer = beers.find(b => b.name === name);
    if (!selectedBeer) {
        return res.status(404).json({ error: 'Beer not found' });
    }

    selectedBeer.addRating(rating);
    res.json({
        name: selectedBeer.name,
        type: selectedBeer.type,
        averageRating: selectedBeer.averageRating,
    });
};

module.exports = {
    addBeer,
    showBeers,
    searchBeers,
    updateBeerRating,
};
