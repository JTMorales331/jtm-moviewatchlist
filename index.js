const movieName = 'Star Wars'
const type = "movie"

const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=7dbbf5ff&s=${movieName}&type=${type}`)
const data = await res.json()
console.log(data)