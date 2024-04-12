import {useEffect, useState} from 'react'
import axios from 'axios'
import '../Components/Inicio/inicio.css'
const Login = () => {
    const [data,setdata]=useState([])
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
    return (
        <div>
            {data.map((dato)=>(
            <div key={dato.idlibros} className='contenido'>
                <img src={"http://localhost:8000/libros/"+dato.imagen} alt='imagen' height={100} width={100}></img>
                <h2>{dato.titulo}</h2>
                <h4>{dato.autor}</h4>
                <p>{dato.descripcion}</p>
                <h2>{dato.precio}</h2>
            </div>
            ))}
        </div>
    )
  }

export default Login