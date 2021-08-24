import { createTheme, ThemeProvider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const darkTheme = createTheme({
  Palette : {
    type: 'dark',
  },
})

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const pageChangeHandler = (page) => {
    setPage(page)
    window.scroll(0, 0)
  }
  return (
    <div 
      style = {{
        width:"100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10
      }}>
      <ThemeProvider theme={darkTheme} >
        <Pagination 
          count={numberOfPages} 
          onClick={(e) => pageChangeHandler(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination
