import { useEffect, useState } from 'react'
import './App.css'

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getMovies(API_URL)
  }, [])

  const getMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setMovies(data.results)
  }

  const getClassByRate = (vote) => {
    if (vote >= 8) return 'green'
    if (vote >= 5) return 'orange'
    return 'red'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      getMovies(SEARCH_API + searchTerm)
      setSearchTerm('')
    }
  }

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </header>
      <main className="main">
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <img src={IMG_PATH + movie.poster_path} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span className={getClassByRate(movie.vote_average)}>
                {movie.vote_average}
              </span>
            </div>
            <div className="overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export default App