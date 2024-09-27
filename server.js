
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const beerRoutes = require('./routes/BeerRoutes');
const { swaggerUi, swaggerDocs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', beerRoutes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect('mongodb+srv://admin:!23456@examples.uctx1.mongodb.net/')
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));
