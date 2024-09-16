
let movieName = document.getElementById('search-movie')

let movieSearchArray = []

let watchlistArray = []

// buttons based on dataset and id
document.addEventListener('click', (e) => {
  if (e.target.id === 'search-btn') {
    searchMovie(movieName.value)
  }
  if (e.target.dataset.imdbid) {
    addToWatchlist(e.target.dataset.imdbid)
  }
})

document.addEventListener('DOMContentLoaded', () => {

  const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'))

  if(savedWatchlist) {
    watchlistArray = savedWatchlist
  }

  if(document.getElementById('watchlist-container')) {
    console.log('watchlist-container rendered')
    renderWatchlist()
  }
})

function addToWatchlist(imdbID) {
  fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=7dbbf5ff&plot=short`)
  .then(res => res.json())
  .then(movie => {
    console.log(movie)
    watchlistArray.push(movie)

    localStorage.setItem('watchlist', JSON.stringify(watchlistArray))
  })
}

// function removeFromWatchlist(imdbID) {
//   fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=7dbbf5ff&plot=short`)
//   .then(res => res.json())
//   .then(movie => {
//     console.log(movie)
//     watchlistArray.push(movie)
//     console.log(watchlistArray)
//   })
// }

function searchMovie(movieName) {
  fetch(`http://www.omdbapi.com/?apikey=7dbbf5ff&s=${movieName}&plot=short`)
  .then(res => res.json())
  .then(data => {
    movieSearchArray = data.Search
    render()
  })
}

function getWatchlistDetails() {
  console.log(watchlistArray)
  console.log('getting watchlist')
  let promises = watchlistArray.map(movie => {
    return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=7dbbf5ff&plot=short`)
      .then(res => res.json())
      .then(data => {
        return `
          <div class="movie-card">
            <img class="movie-poster" src="${data.Poster}" />
            <div class="movie-details">
              <h1 class="details-one">${data.Title}<span class="imdb-rating"><i class="fa-solid fa-star"></i>${data.imdbRating}</span></h1>
              
              <div class="details-two">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <button
                  class="remove-watchlist-btn"
                  data-watchlistid="${data.imdbID}"
                >
                <i class="fa-solid fa-circle-minus"></i>
                Remove
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

function getMoviesDetails() {
  let promises = movieSearchArray.map(movie => {
    return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=7dbbf5ff&plot=short`)
      .then(res => res.json())
      .then(data => {
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
                  data-imdbid="${data.imdbID}"
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

function render() {
  getMoviesDetails().then(movieHtml => {
    document.getElementById('search-results').innerHTML = movieHtml
  })
  
}

function renderWatchlist() {
  console.log('rendering watchlist')
  getWatchlistDetails().then(movieHtml => {
    document.getElementById('watchlist-container').innerHTML = movieHtml
    console.log('rendering successful')
  })
}