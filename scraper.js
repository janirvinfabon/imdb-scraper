const fetch = require('node-fetch');
const cheerio = require('cheerio');
const config = require('./config.json')

const searchUrl = 'https://www.imdb.com/find/?ref_=nv_sr_sm&s=tt&q=';
const movieUrl = 'https://www.imdb.com/title/';

const headers = new fetch.Headers({
    'User-Agent': config.userAgent
})

const searchMovies = (searchTerm) => {
    
    return fetch(`${searchUrl}${searchTerm}`, { headers })
        .then(response => response.text())
        .then(body => {
            const movies = [];
            const $ = cheerio.load(body);

            $('.find-title-result').each((i, element) => {
                const $element = $(element);
                const $image = $element.find('div div img');
                const $title = $element.find('div div a');
                const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
    
                const movie = {
                    image: $image.attr('src'),
                    title: $title.text(),
                    imdbID
                };
    
                movies.push(movie);
            });

            return movies;
        })
    ;
}

const getMovie = (imdbID) => {
    
    return fetch(`${movieUrl}${imdbID}`, { headers })
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $title = $('h1');
            const $rating = $('span.ipc-rating-star');

            const casts = [];
            $('div[data-testid="title-cast-item"]').each((i, element) => {
                const $element = $(element);
                const $actor = $element.find('a[data-testid="title-cast-item__actor"]');
                const $characterName = $element.find('a[data-testid="cast-item-characters-link"] span');
                const $image = $element.find('.ipc-image');

                if($actor.text() && $characterName.text()){
                    casts.push({
                        name: $actor.text(),
                        characterName: $characterName.text(),
                        image: $image.attr('src') || null
                    })
                }
            });

            return {
                title: $title.text().trim(),
                rating: $rating.text(),
                casts
            };
        })
    ;
}

module.exports = {
    searchMovies,
    getMovie
}