import classes from './Header.module.css'

const Header = () => {
  return (
    <span className={classes.header} onClick={() => window.scroll(0, 0)}>🎬 Entertainment Hub 🎥</span>
  )
}

export default Header