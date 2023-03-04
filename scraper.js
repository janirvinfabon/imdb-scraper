const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = process.env.WEB_URL || 'https://www.imdb.com/find/?ref_=nv_sr_sm&s=tt&q=';

const searchMovies = (searchTerm) => {
    
    return fetch(`${url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const movies = [];
            const $ = cheerio.load(body);

            $('.find-title-result').each((i, element) => {
                const $element = $(element);
                const $image = $element.find('div div img');
                const $title = $element.find('div div a');
                // const $year = $element.find('div div ul li label:first');
    
                const movie = {
                    image: $image.attr('src'),
                    title: $title.text()
                };
    
                movies.push(movie);
            });

            return movies;
        });
}

module.exports = {
    searchMovies
}