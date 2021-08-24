import { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'

import classes from './Trending.module.css'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres'


const Trending = () => {
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [selectedGenres, setSelectedGeneres] = useState([])
  const [genres, setGenres] = useState([])

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=658626a5647adb45825342efbbd9f971&language=en-US&page=${page}`
      )
      console.log(data)
      setContent(data.results)
  }

  useEffect(() => {
    fetchTrending()
    // eslint-disable-next-line
  }, [page])
  return (
    <div>
      <span className={classes.pageTitle}>Am Trending</span>
      <Genres 
        type='movie' 
        setGenres={setGenres} 
        setSelectedGeneres={setSelectedGeneres} 
        genres={genres} 
        selectedGenres= {selectedGenres}
        setPage={setPage}
      />
      <div className={classes.trending}>
        {content && content.map((c) => (
          <SingleContent 
            key={c.id} 
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media={c.media_type}
            vote={c.vote_average} 
            votec={c['vote_count']} 
          />)
        )}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending