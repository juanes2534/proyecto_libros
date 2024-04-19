import axios from 'axios';
import { useEffect, useState } from 'react'
import '../Components/descargas/descargas.css'
const Descargas = () => {
    const [datos, setdatos] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        obtener()
    }, [])
    const obtener = async () => {
        try {
            const respuesta = await axios.get("http://localhost:8000/user/descargas", {
                headers: {
                    Authorization: token
                }
            })
            setdatos(respuesta.data)
        } catch (error) {
            alert(error)
        }
    }
    const libro = async (archivo_pdf) => {
        const respuesta = await axios.get(`http://localhost:8000/user/archivo_pdf/${archivo_pdf}`, {
            responseType: 'blob'
        })
        // Crea un objeto URL a partir del blob
        const url = window.URL.createObjectURL(new Blob([respuesta.data]));

        // Crea un enlace para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${archivo_pdf}`); // Establece el nombre de archivo para la descarga
        document.body.appendChild(link);

        // Simula hacer clic en el enlace para iniciar la descarga
        link.click();

        // Elimina el objeto URL creado
        window.URL.revokeObjectURL(url);
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
    return (
        <div className='descargas'>
            <h1>Todas las descargas</h1>
            <div className='gallery-container'>
                {datos.map((dato) => (
                    <div key={dato.idlibros} className='borde' onClick={() => (libro(dato.archivo_pdf))}>
                        <div className='contenedor-imagen-libros'>
                            <img src={"http://localhost:8000/libros/" + dato.imagen} alt='imagen' height={100} width={100}></img>
                        </div>
                        <div className='container-titulo'>
                            <h2>{dato.titulo}</h2>
                        </div>
                        <h4>{dato.autor}</h4>
                        <div>{precio(dato.precio)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Descargas