
class Beer {
    constructor(name, type, rating = null) {
        this.name = name;
        this.type = type;
        this.ratings = rating ? [rating] : [];
    }

    get averageRating() {
        if (this.ratings.length === 0) return 0;
        const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
        return Math.round(sum / this.ratings.length);
    }

    addRating(rating) {
        this.ratings.push(rating);
    }
}

module.exports = Beer;
