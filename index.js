const express = require('express');
// var cors = require('cors');
const scraper = require('./scraper');

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());

app.get('/', (req, res) => {
    res.json({
        'message': 'Learning web scraping'
    })
});

// /search/star wars
app.get('/search/:title', (req, res) => {
    scraper
        .searchMovies(req.params.title)
        .then(movies => {
            res.json(movies);
        });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});