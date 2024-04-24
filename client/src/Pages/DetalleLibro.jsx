import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Components/css/categorias/categorias.css'
import '../Components/css/admin/libroAdmin.css'
import '../Components/css/admin/detalleLibro.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Admin } from './admin'
const DetalleLibro = () => {
    const { titulo } = useParams();
    const [dato, setdato] = useState([])
    const [sesion, setsesion] = useState(false)
    const [compra, setcompra] = useState(false)
    const [verificar1, setverificar1] = useState(false)
    // const [loading, setLoading] = useState(false);
    // const [orderId, setOrderId] = useState(false);
    const navegate = useNavigate()
    //Esta variable hace el replazo del string con guion y lo pasa a espacio en blanco
    const titulo1 = titulo.replace(/-/g, ' ');
    const token = localStorage.getItem("token")
    useEffect(() => {
        obtener()
    }, [])
    const obtener = async () => {
        try {
            const respuesta = await axios.post("http://localhost:8000/admin/libro", { titulo: titulo1 }, {
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
    const eliminar = async()=>{
        try {
            const respuesta = await axios.post("http://localhost:8000/admin/eliminarLibro",{
                idlibros:dato.idlibros,
                imagen:dato.imagen,
                archivo_pdf:dato.archivo_pdf
            },{
                headers:{
                    Authorization:token
                }
            })
            alert(respuesta.data.message)
            navegate("/admin/libros")
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
    const editar = async()=>{
        const nombreConGuiones = dato.titulo.replace(/\s+/g, '-');
        navegate(`/admin/editar/${nombreConGuiones}`)
    }
    return (
        <div className='main-libro-admin'>
            <Admin />
            <div className='libro-container'>
                <div className='libro-conteiner-main'>
                    <div className='centrar-libro-main'>
                        <div className='centrar-libro'>
                            <div className='imagen-contenedor-libro'>
                                <img src={dato.imagen ? `http://localhost:8000/libros/${dato.imagen}` : ''} alt='imagen'></img>
                            </div>
                            <div className='titulo-libro'>{dato.titulo}</div>
                            <div className='precio-libro'>$ {dato.precio} USD</div>
                            <div className='descripcion-libro-detalle'>{dato.descripcion}</div>
                        </div>
                        <div className='contenedor-botones'>
                            <button onClick={()=>{editar()}}>Editar</button>
                            <button onClick={()=>{eliminar()}}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleLibro