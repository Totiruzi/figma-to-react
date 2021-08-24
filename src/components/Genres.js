import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'

const Genres = ({ type,
setGenres,
setSelectedGeneres,
genres,
selectedGenres,
setPage}) => {
  const genreAddHandler = (genre) => {
    setSelectedGeneres([...selectedGenres, genre])
    setGenres(genres.filter((g) => g.id !== genre.id))
    setPage(1)
  }

  const genreRemoveHandler = (genre) => {
    setSelectedGeneres(selectedGenres.filter((selected) => (selected.id !== genre.id)))
    setGenres([...genres, genre])
    setPage(1)
  }

  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=658626a5647adb45825342efbbd9f971&language=en-US`)

    setGenres(data.genres)
  }

  useEffect(() => {
    fetchGenres()

    return () => {
      setGenres({}) // unmounting
    }
  // eslint-disable-next-line
  }, [])

  return (
    <div style={{padding: "6px 0"}}>
       {selectedGenres && selectedGenres.map((genre) => (<Chip key={genre.id} label={genre.name} size="small" clickable color="primary" style={{ margin: 2}} onDelete={() => genreRemoveHandler(genre)}/>))}

      {genres && genres.map((genre) => (<Chip key={genre.id} label={genre.name} size= "small" clickable onClick={() => genreAddHandler(genre)} style={{margin: 2}}/>))}
    </div>
  )
}

export default Genres
// `https://api.themoviedb.org/3/genre/${