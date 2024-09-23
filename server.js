
const express = require('express');
const bodyParser = require('body-parser');
const beerRoutes = require('./routes/BeerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/beers', beerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
