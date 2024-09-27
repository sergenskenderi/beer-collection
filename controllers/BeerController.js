const Beer = require('../models/Beer');

const addBeer = async (req, res) => {
    const { name, type, rating } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }

    const newBeer = new Beer({ name, type, ratings: rating ? [rating] : [] });
    await newBeer.save();
    res.status(201).json(newBeer);
};

const showBeers = async (req, res) => {
    const beers = await Beer.find();
    res.json(beers.map(beer => ({
        name: beer.name,
        type: beer.type,
        averageRating: beer.averageRating(),
    })));
};

const searchBeers = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const beers = await Beer.find({ name: new RegExp(query, 'i') });
    res.json(beers.map(beer => ({
        name: beer.name,
        type: beer.type,
        averageRating: beer.averageRating(),
    })));
};

const updateBeerRating = async (req, res) => {
    const { name } = req.params;
    const { rating } = req.body;

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
    }

    const selectedBeer = await Beer.findOne({ name });
    if (!selectedBeer) {
        return res.status(404).json({ error: 'Beer not found' });
    }

    selectedBeer.addRating(rating);
    await selectedBeer.save();

    res.json({
        name: selectedBeer.name,
        type: selectedBeer.type,
        averageRating: selectedBeer.averageRating(),
    });
};

module.exports = {
    addBeer,
    showBeers,
    searchBeers,
    updateBeerRating,
};
