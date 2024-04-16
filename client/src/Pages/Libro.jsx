import { useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Components/libro/libro.css'
import axios from 'axios';
import styled from 'styled-components';

// Este componente esteriliza al componente Link de react-router-dom
const StyledLink = styled(Link)`
  text-decoration: none; /* Elimina el subrayado del enlace */
  color: inherit; /* Hereda el color del texto del elemento padre */

  /* Estilos al pasar el ratón sobre el enlace */
  &:hover {
    color: #74C0FC; /* Cambia el color del texto a rojo */
  }
`;

export const Libro = () => {
  const { titulo } = useParams();
  const [data,setdata] = useState([])
  const [sesion,setsesion] = useState(false)
  const [token, setToken] = useState(null)
  const navegate = useNavigate()
  //Esta variable hace el replazo del string con guion y lo pasa a espacio en blanco
  const titulo1 = titulo.replace(/-/g, ' ');
  useEffect(()=>{
    obtener()
  },[]) 
  const obtener = async()=>{
    try {
      const respuesta = await axios.post("http://localhost:8000/user/libro",{titulo:titulo1})
      setdata(respuesta.data)
      const token = localStorage.getItem("token")
      setsesion(!!token)
      setToken(token)
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
  const descargarArchivo = async()=>{
    const respuesta = await axios.get(`http://localhost:8000/user/archivo_pdf/${data.archivo_pdf}`,{
      responseType: 'blob'
    })
    // Crea un objeto URL a partir del blob
    const url = window.URL.createObjectURL(new Blob([respuesta.data]));

    // Crea un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.archivo_pdf}`); // Establece el nombre de archivo para la descarga
    document.body.appendChild(link);
    
    // Simula hacer clic en el enlace para iniciar la descarga
    link.click();

    // Elimina el objeto URL creado
    window.URL.revokeObjectURL(url);
    try {
      const respuesta = await axios.post("http://localhost:8000/user/compra",{idlibros: data.idlibros},{
        headers:{
          Authorization: token
        }
      })
      alert(respuesta.data.message)
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
  const redirigir = ()=>{
    navegate("/login")
  }
  const precio = ()=>{
    const precioNumerico = Number(data.precio);
    const opciones = {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };
    const precio2=precioNumerico.toLocaleString('es-Es', opciones)
    return (precio2)
}
    return (
      <div className='main-r'>
        <p className='navegacion'><StyledLink to={"/"}>Inicio</StyledLink>{" > "}<StyledLink to={"/categorias"}>Libros</StyledLink>{" > "}{data.titulo}</p>
        <div className='main-libro'>
          <div className='main-libro_imagen'>
            <img src={data.imagen ? `http://localhost:8000/user/libro/${data.imagen}` : ""} alt={'imagen/'} className='imagen'></img>
          </div>
          <div className='main-libro_informacion'>
            <h1 className='main-libro_informacion-texto'>{data.titulo}</h1>
            <h3 className='main-libro_informacion-texto-autor'><span>Autor: </span>{data.autor}</h3>
            <hr className='main-libro_informacion-linea'></hr>
            <p className='main-libro_informacion-texto-precio'><span>Precio:</span> {precio()}</p>
            <p className='main-libro_informacion-texto-precio'><span className='editorial'>Editorial: </span>{data.editorial}</p>
            <div className='main-libro_informacion-boton'>
            {sesion ? <button className='boton-comprar' onClick={()=>{descargarArchivo()}}>Comprar</button> 
            : <button className='boton-comprar' onClick={()=>{redirigir()}}>Comprar</button>
            }
            </div>
          </div>
          </div>
          <hr className='linea'></hr>
          <div className='main-r-descripcion'>
          <h5 className='descripcion'>Descripción</h5>
          <p className='descripcion-texto'>{data.descripcion}</p>
          {/* <p className='descripcion'>Ficha tecnica</p> */}
          </div>
          </div>
    )
  }