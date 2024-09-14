
let movieName = document.getElementById('search-movie')

let movieSearchArray = []

// buttons based on dataset and id
document.addEventListener('click', (e) => {
  if (e.target.id === 'search-btn') {
    getMovies(movieName.value)
  }
})

async function getMovies(movieName) {
  console.log(movieName)
  const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=7dbbf5ff&s=${movieName}`)
  const data = await res.json()
  console.log(data)
  movieSearchArray = data.Search

  console.log(movieSearchArray)
}


function render() {

}