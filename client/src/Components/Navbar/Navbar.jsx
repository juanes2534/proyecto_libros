import './Navbar.css';
import { useState} from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [menu,setmenu]=useState("Inicio")
    return (
      <div>
        <div className='navbar'>
          <Link style={{textDecoration: 'none'}} to={'/'}>
          <div className='nav-logo' onClick={()=>{setmenu('Inicio')}}>
            <i class="fa-solid fa-book fa-2xl" style={{color: "#74C0FC"}}></i>
            <p className='navbar-texto'>BOOKS</p>
          </div>
          </Link>
          <ul className='nav-menu'>
            <li onClick={()=>{setmenu("Inicio")}}><Link style={{textDecoration: 'none'}} to={'/'}>Inicio</Link>{menu==="Inicio" ? <hr></hr> : <></>}</li>
            <li onClick={()=>{setmenu("Categorias")}}><Link style={{textDecoration: 'none'}} to={'/categorias'}>Categorias</Link>{menu==="Categorias" ? <hr></hr> : <></>}</li>
          </ul>
          <div className='nav-login-cart'>
            <Link style={{textDecoration: 'none'}} to={'/login'}><button className='nav-login-boton'>Login</button></Link>
          </div>
        </div>
     </div>
    )
  }

export default Navbar