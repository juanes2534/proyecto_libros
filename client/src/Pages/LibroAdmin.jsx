import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Components/css/categorias/categorias.css'
import '../Components/css/admin/libroAdmin.css'
import { useNavigate } from 'react-router-dom'
import { Admin } from './admin'
const LibroAdmin = () => {
  const [data, setdata] = useState([])
  const [filtro, setfiltro] = useState([])
  const navegate = useNavigate()
  useEffect(() => {
    obtener()
  }, [])
  const obtener = async () => {
    try {
      const respuesta = await axios.get("http://localhost:8000/libros")
      setdata(respuesta.data)
      setfiltro(respuesta.data)
    } catch (error) {
      alert(error)
    }
  }
  const libro = (titulo) => {
    const nombreConGuiones = titulo.replace(/\s+/g, '-');
    navegate(`/admin/libro/${nombreConGuiones}`)
  }
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
  const buscar = (letra) => {
    if (letra.trim() === '') {
      // Si el término de búsqueda está vacío, mostrar todos los datos
      setfiltro(data)
    } else {
      // Filtrar los datos según el término de búsqueda
      const letra1 = letra.toLowerCase()
      const filtro1 = data.filter(item => item.titulo.toLowerCase().startsWith(letra1) || item.autor.toLowerCase().startsWith(letra1))
      setfiltro(filtro1);
    }
  }
  const categoria = async (categoria) => {
    try {
      const respuesta = await axios.post("http://localhost:8000/user/categorias", {
        categoria: categoria
      })
      setfiltro(respuesta.data)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className='main-libro-admin'>
      <Admin />
      <div className='libro-container'>
        <div className='libro-conteiner-main'>
        <div className='main-buscador-libro'>
          <h1>Libros</h1>
          <div className='container-buscar-libro'>
            <input type='text' placeholder='Buscar' className='buscar-libro' onChange={(e) => { buscar(e.target.value) }}></input>
          </div>
        </div>
        <div className='centrar'>
          <div className='gallery-container-libro'>
            {filtro.map((dato) => (
              <div key={dato.idlibros} className='contenedor-libro' onClick={() => (libro(dato.titulo))}>
                {/* <div className='señalar'> */}
                <div className='contenedor-imagen-libros-admin'>
                  <img src={"http://localhost:8000/libros/" + dato.imagen} alt='imagen'></img>
                </div>
                <div className='container-titulo-libro'>
                  <h2>{dato.titulo}</h2>
                </div>
                <h4>{dato.autor}</h4>
                <div>{precio(dato.precio)} USD</div>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LibroAdmin