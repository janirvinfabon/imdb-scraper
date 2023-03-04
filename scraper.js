const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchUrl = 'https://www.imdb.com/find/?ref_=nv_sr_sm&s=tt&q=';
const movieUrl = 'https://www.imdb.com/title/';

const searchMovies = (searchTerm) => {
    
    return fetch(`${searchUrl}${searchTerm}`)
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
    
    return fetch(`${movieUrl}${imdbID}`)
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            const $title = $.find('h1');
            const $rating = $.find('span.ipc-rating-star');;

            return {
                title: $title.text().trim(),
                rating: $rating.text()
            };
        })
    ;
}

module.exports = {
    searchMovies,
    getMovie
}