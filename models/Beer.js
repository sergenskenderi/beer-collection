const mongoose = require('mongoose');

const BeerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    ratings: { type: [Number], default: [] }
});

BeerSchema.methods.averageRating = function() {
    if (this.ratings.length === 0) return 0;
    return (this.ratings.reduce((acc, rating) => acc + rating) / this.ratings.length).toFixed(1);
};

BeerSchema.methods.addRating = function(rating) {
    this.ratings.push(rating);
};

module.exports = mongoose.model('Beer', BeerSchema);
