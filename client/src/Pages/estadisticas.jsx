import { useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import '../Components/admin/inicio.css'
import { Admin } from './admin';
// Este componente esteriliza al componente Link de react-router-dom
const StyledLink = styled(Link)`
  text-decoration: none; /* Elimina el subrayado del enlace */
  color: inherit; /* Hereda el color del texto del elemento padre */

  /* Estilos al pasar el ratón sobre el enlace */
  &:hover {
    color: #74C0FC; /* Cambia el color del texto a rojo */
  }
`;
const Estadisticas = () => {
  const [dato,setdato]=useState([])
  const token=localStorage.getItem("token")
  useEffect(()=>{
    obtener()
  },[])
  const obtener=async()=>{
    try {
      const respuesta=await axios.get("http://localhost:8000/admin/getadmin",{
        headers: {
          Authorization: token
        }
      })
      setdato(respuesta.data)
    } catch (error) {
      if (error.response) {
        alert(error.message)
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        alert(error.message)
      }
    }
  }
    return (
      <div className='main-inicio'>
        <Admin/>
        <div className='saludo-container'>
            <div className='saludo'>Hola administrador(a) {dato.nombres}</div>
        </div>
      </div>
    )
}
export default Estadisticas