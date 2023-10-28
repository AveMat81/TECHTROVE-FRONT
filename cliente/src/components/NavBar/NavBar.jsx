import { Link } from "react-router-dom"

function NavBar() { 
  const handleClickScroll = () => {
    ({ top: 1600, behavior: "smooth"});
  };

  
    return (
      <div>
        <Link to={"/"} onClick={handleClickScroll}>
          CATALOGO
        </Link>
      </div>
    )
  }
  
  export default NavBar;