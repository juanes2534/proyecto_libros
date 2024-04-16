import './Navbar.css';
import { useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navegate=useNavigate()
    const [menu,setmenu]=useState('Inicio')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem('token');
    useEffect(()=>{
      setIsAuthenticated(!!token)
    },[token])
    const sacar = ()=>{
      navegate("/login")
    }
    const logout = ()=>{
      localStorage.removeItem('token')
      alert("Sesión cerrada correctamente")
      navegate("/")
    }
    return (
      <div className='fijo'>
        <div className='navbar'>
          <Link style={{textDecoration:"none", color: 'inherit'}} to={'/'}>
          <div className='nav-logo' onClick={()=>{setmenu('Inicio')}}>
            <i className="fa-solid fa-book fa-2xl" style={{color: "#74C0FC"}}></i>
            <p className='navbar-texto'>BOOKS</p>
          </div>
          </Link>
          <ul className='nav-menu'>
            <li onClick={()=>{setmenu("Inicio")}}><Link style={{textDecoration:"none", color: 'inherit'}} to={'/'}>Inicio</Link>{menu==="Inicio" ? <hr></hr> : <></>}</li>
            <li onClick={()=>{setmenu("Categorias")}}><Link style={{textDecoration:"none", color: 'inherit'}} to={'/categorias'}>Categorias</Link>{menu==="Categorias" ? <hr></hr> : <></>}</li>
          </ul>
          <div className='nav-login-cart'>
            {isAuthenticated ? 
            <button className='nav-login-boton' onClick={()=>{logout()}}>Cerrar Sesión</button>: 
            <button className='nav-login-boton'onClick={()=>{sacar()}}>Iniciar Sesión</button>
            }
          </div>
        </div>
     </div>
    )
  }

export default Navbar