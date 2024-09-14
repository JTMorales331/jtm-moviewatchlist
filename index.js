
let movieName = document.getElementById('search-movie')

let movieSearchArray = []

// buttons based on dataset and id
document.addEventListener('click', (e) => {
  if (e.target.id === 'search-btn') {
    searchMovie(movieName.value)
  }
})

function searchMovie(movieName) {
  console.log(movieName)
  fetch(`http://www.omdbapi.com/?apikey=7dbbf5ff&s=${movieName}&plot=short`)
  .then(res => res.json())
  .then(data => {
    movieSearchArray = data.Search
    getMoviesDetails().then(movieHtml => {
      render(movieHtml)
    })
  })
  
  
}

function getMoviesDetails() {
  let promises = movieSearchArray.map(movie => {
    return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=7dbbf5ff&plot=short`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        return `
          <div class="movie-card">
            <img class="movie-poster" src="${movie.Poster}" />
            <div class="movie-details">
              <h1 class="details-one">${data.Title}<span class="imdb-rating"><i class="fa-solid fa-star"></i>${data.imdbRating}</span></h1>
              
              <div class="details-two">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <button
                  class="add-watchlist-btn"
                  data-id="${data.imdbID}"
                >
                <i class="fa-solid fa-circle-plus"></i>
                Watchlist
                </button>
              </div>

              <p class="movie-plot">${data.Plot}</p>
            </div>
          </div>
        `
      })
  })
  return Promise.all(promises).then(results => {
    return results.join('')
  })
}

function render(renderHtml) {
  document.getElementById('search-results').innerHTML = renderHtml
}