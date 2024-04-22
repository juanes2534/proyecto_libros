import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Components/css/Inicio/inicio.css'
import icono from '../Components/assets/right-arrow-svgrepo-com.svg'
import icono1 from '../Components/assets/right-arrow-svgrepo-com(2).svg'
import { useNavigate } from 'react-router-dom'

const Inicio = () => {
  //Estado el cual tiene todos los libros
  const [data, setdata] = useState([])
  //Estado el cual tiene el numero de pagina que va en la paginación
  const [currentPage, setCurrentPage] = useState(1)


  const navegate = useNavigate()
  //Esta variable tiene la cantidad de libros por paginación 
  const itemsPorPagina = 4
  useEffect(() => {
    obtener()
  }, [])
  //Esta función es la que tiene la peticion cliente para obtener los datos de todos los libros
  const obtener = async () => {
    try {
      const respuesta = await axios.get("http://localhost:8000/librosRecientes")
      setdata(respuesta.data)
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
  //Función para poner el precio en localidad del español por ejemplo 100.000,00
  const precio = (precio1) => {
    const precioNumerico = Number(precio1);
    const opciones = {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
    const precio2 = precioNumerico.toLocaleString('es-Es', opciones)
    return (precio2)
  }
  //Función para pasar a la anterior pagina de los libros
  const previo = () => {
    setCurrentPage((prevPagina) => Math.max(prevPagina - 1, 1))
  }
  //Función para pasar a la siguiente pagina de los libros
  const next = async () => {
    // const timer = await setTimeout(()=>{setCurrentPage((prevPagina)=> Math.min(prevPagina+1, Math.ceil(data.length / itemsPorPagina)))},100)
    setCurrentPage((prevPagina) => Math.min(prevPagina + 1, Math.ceil(data.length / itemsPorPagina)))
  }
  //Función para redireccionar al libro seleccionado
  const libro = (titulo) => {
    //La expresión regular que representa cualquier espacio en blanco es (\s+) y /g es para que busque en toda la cadena de texto y sea global la busqueda
    const nombreConGuiones = titulo.replace(/\s+/g, '-');
    navegate(`/libro/${nombreConGuiones}`)
  }
  //Esta variable calcula el indice inicial de la nueva array de datos
  const startindex = (currentPage - 1) * (itemsPorPagina)
  //Esta variable calcula el indice final de la nueva array de datos
  const endindex = startindex + (itemsPorPagina)
  return (
    <div className='main-titulo'>
      <p className='titulo'>Recientes</p>
      <div className='main'>
        <button className='boton-izquierda' onClick={() => { previo() }}>{currentPage === 1 ? <div className='tamaño'></div> : <img src={icono1} alt='icono1'></img>}</button>
        {data.slice(startindex, endindex).map((dato, index) => (
          <div key={dato.titulo} className={`contenido`} onClick={() => (libro(dato.titulo))} >
            <div className={"contenido-imagen"}>
              <img src={dato.imagen ? `http://localhost:8000/libros/${dato.imagen}` : ""} alt='imagen'></img>
            </div>
            <div className='contenido-texto'>
              <div className='contenido-titulo'>
                {dato.titulo.toUpperCase()}
              </div>
              <div className='contenido-autor'>
                {dato.autor.toUpperCase()}
              </div>
              <div className='contenido-precio'>
                ${precio(dato.precio)} USD
              </div>
            </div>
          </div>
        ))}
        <button className='boton-derecha' onClick={() => { next() }}>{endindex >= data.length ? <div className='tamaño'></div> : <img src={icono} alt='icono2'></img>}</button>
      </div>
    </div>
  )
}

export default Inicio