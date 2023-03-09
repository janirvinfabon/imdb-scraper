# imdb-scraper
 A simple node application that scrape a website and extract title and other infromation within that site.

# todos
- [x] Create a scraper file
- [x] Use node-fetch to create a http or ajax request
- [x] Use cheerio to a manipulate html markup
- [x] Create a express js app
- [x] Import scraper.searchMovies
- [x] Display all movies
- [ ] Display movie information

# endpoints
## GET {IP}:3000/search/:title
```
[
    {
        "image": "https://images.url/image1.jpg",
        "title": "Star Wars: The Bad Batch",
        "imdbID": "tt12708542"
    },
    {
        "image": "https://images.url/image1.jpg",
        "title": "Star Wars",
        "imdbID": "tt0076759"
    }
]
```

## GET {IP}:3000/movie/:imdbID
```
{
    "title": "Star Wars: The Bad Batch",
    "rating": "8.48",
    "casts": [
        {
            "name": "Actor Name 1",
            "characterName": "Character 1",
            "image": "https://https://images.url/image1.jpg"
        },
        {
            "name": "Actor Name 2",
            "characterName": "Character 2",
            "image": "https://https://images.url/image2.jpg"
        }
    ]
}
```

# node modules
- npm init -y
- npm install node-fetch@^2.0.0
- npm install cheerio@^1.0.0-rc.2
- npm install express@^4.16.2
- npm install nodemon@^1.15.1
- npm install cors@^2.8.5
