import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../Components/css/admin/admin.css';
import '../Components/Navbar/Navbar.css';
// Este componente esteriliza al componente Link de react-router-dom
const StyledLink = styled(Link)`
  text-decoration: none; /* Elimina el subrayado del enlace */
  color: inherit; /* Hereda el color del texto del elemento padre */

  /* Estilos al pasar el ratón sobre el enlace */
  // &:hover {
  //   color: #74C0FC; /* Cambia el color del texto a rojo */
  // }
`;
export const Admin = ({ dato }) => {
  const navegate = useNavigate()
  const navegar = () => {
    navegate("/admin")
  }
  const salir = () => {
    localStorage.removeItem("token");
    navegate("/")
  }
  return (
    <div className='fijo-menu'>
    <div className='menu-lateral'>
      <div className='nav-logo-admin'>
        <div className='salir' onClick={() => { salir() }}>
          <i className="fa-solid fa-right-from-bracket fa-flip-horizontal fa-xl"></i>
        </div>
        <div className='logo' onClick={() => { navegar() }}>
          <i className="fa-solid fa-book fa-2xl" style={{ color: "#74C0FC" }}></i>
          <p className='navbar-texto-admin'>BOOKS</p>
        </div>
      </div>
      <div className='color'>
        <div className='bienvenida'>Hola administrador(a)</div>
        <div className='bienvenida'>{dato}</div>
      </div>
      <div className='barra'>
        <StyledLink to="/admin/estadisticas"><div className='crear'>Estadisticas</div></StyledLink>
        <StyledLink to="/admin/crearAdmin"><div className='crear'>Crear administrador</div></StyledLink>
        <StyledLink to="/admin/crearLibro"><div className='crear'>Crear libro</div></StyledLink>
        <StyledLink to="/admin/libros"><div className='crear'>Libros</div></StyledLink>
        {/* <StyledLink to="/admin" ><div className='crear'>Crear categorias</div></StyledLink> */}
      </div>
    </div>
    </div>
  )
}