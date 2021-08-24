import { useEffect, useState } from 'react'
import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

import classes from './Search.module.css'

const Search = () => {
  const [type, setType] = useState(0)
  const [page, setPage] = useState(1)
  const [serachText, setSearchText] = useState('')
  const [content, setContent] = useState()
  const [numberOfPages, setNumberOfPages] = useState()

  const fetchSearchResult = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=658626a5647adb45825342efbbd9f971&page=${page}&language=en-US&query=${serachText}&include_adult=false`)
      setContent(data.results)
      setNumberOfPages(data.total_pages
    )
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSearchResult()
    // eslint-disable-next-line
  }, [page, type])

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      }
    }
  })

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: "flex", margin: "15px 0"}}>
          <TextField
            style={{flex: 1}}
            className={classes.searchBox}
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)} 
          />
          <Button variant="contained" style={{ marginLeft: 10}} onClick={fetchSearchResult}>
            <SearchIcon />
          </Button>
        </div>

        <Tabs 
          value={type} 
          indicatorColor="primary" 
          textColor="primary"
          onChange= {(event, newValue) => {
            setType(newValue)
            setPage(1)
          }}
          style={{ paddingBottom: 5}}
        >
          <Tab style={{width: "50%"}} label="Search Movies" />
          <Tab style={{width: "50%"}} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className={classes.trending}>
        {content && content.map((c) => (
          <SingleContent 
            key={c.id} 
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media={type ? 'tv' : 'movie'}
            vote={c.vote_average} 
            votec={c['vote_count']} 
          />)
        )}
      {serachText &&
        !content &&
        (type ? <h2>No series Found</h2> : <h2>No Movie found</h2>)
      }
      </div>
      <CustomPagination setPage={setPage} numberOfPages={numberOfPages}/>
    </div>
  )
}

export default Search
