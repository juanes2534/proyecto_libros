import { useEffect, useState} from 'react'
import axios from 'axios'
import '../Components/Inicio/inicio.css'
import icono from '../Components/assets/right-arrow-svgrepo-com.svg'
import icono1 from '../Components/assets/right-arrow-svgrepo-com(2).svg'
const Inicio = () => {
    const [data,setdata]=useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [activeIndex, setactiveIndex] = useState(0)
    const itemsPorPagina= 4
    useEffect(()=>{
      obtener()
    },[])
    const obtener = async()=>{
      try {
        const respuesta = await axios.get("http://localhost:8000/libros")
        setdata(respuesta.data)
      } catch (error) {
        alert(error)
      }
    }
    const precio = (precio1)=>{
        const precioNumerico = Number(precio1);
        const opciones = {
            style: 'decimal',
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          };
        const precio2=precioNumerico.toLocaleString('es-Es', opciones)
        return (precio2)
    }
    const previo = ()=>{
      setCurrentPage((prevPagina)=> Math.max(prevPagina-1, 1))
    }
    const next = async()=>{
      // const timer = await setTimeout(()=>{setCurrentPage((prevPagina)=> Math.min(prevPagina+1, Math.ceil(data.length / itemsPorPagina)))},100)
      setCurrentPage((prevPagina)=> Math.min(prevPagina+1, Math.ceil(data.length / itemsPorPagina)))
    }
    // const startindex = (currentPage - 1) * (itemsPorPagina)
    const startindex = (currentPage - 1)
    const endindex = startindex + (itemsPorPagina)
    return (
        <div className='main-titulo'>
          <p className='titulo'>Tendencias</p>
          <div className='main'>
            <button className='boton-izquierda' onClick={()=>{previo()}}>{currentPage===1 ? <div className='tamaño'></div> : <img src={icono1} alt='icono1'></img>}</button>
            {data.slice(startindex, endindex).map((dato, index)=>(
            <div key={dato.idlibros} className={`contenido ${index === activeIndex ? 'active' : ''}`} >
                {console.log(dato.imagen)}
              <div className={"contenido-imagen"}>
                  <img src={"http://localhost:8000/libros/"+dato.imagen} alt='imagen'></img>
              </div>
              <div className='contenido-texto'>
                <div className='contenido-titulo'>
                    {dato.titulo.toUpperCase()}
                </div>
                <div className='contenido-autor'>
                    {dato.autor.toUpperCase()}
                </div>
                <div className='contenido-precio'>
                      ${precio(dato.precio)}
                </div>
              </div>
            </div>
            ))}
            <button className='boton-derecha' onClick={()=>{next()}}>{endindex >= data.length ? <div className='tamaño'></div> : <img src={icono} alt='icono2'></img>}</button>
          </div>
        </div>
    )
  }

export default Inicio