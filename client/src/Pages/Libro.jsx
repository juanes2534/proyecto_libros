import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Components/css/libro/libro.css'
import axios from 'axios';
import styled from 'styled-components';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Este componente esteriliza al componente Link de react-router-dom
const StyledLink = styled(Link)`
  text-decoration: none; /* Elimina el subrayado del enlace */
  color: inherit; /* Hereda el color del texto del elemento padre */

  /* Estilos al pasar el ratón sobre el enlace */
  &:hover {
    color: #74C0FC; /* Cambia el color del texto a rojo */
  }
`;

const Libro = () => {
  const { titulo } = useParams();
  const [dato, setdato] = useState([])
  const [sesion, setsesion] = useState(false)
  const [token, setToken] = useState(null)
  // const [compra, setcompra] = useState(false)
  const [verificar1, setverificar1] = useState(false)
  const navegate = useNavigate()
  //Esta variable hace el replazo del string con guion y lo pasa a espacio en blanco
  const titulo1 = titulo.replace(/-/g, ' ');
  useEffect(() => {
    obtener()
  }, [])
  const obtener = async () => {
    try {
      const respuesta = await axios.post("http://localhost:8000/user/libro", { titulo: titulo1 })
      setdato(respuesta.data)
      const token = localStorage.getItem("token")
      setsesion(!!token)
      setToken(token)
      // verificar(respuesta.data)
      const data = respuesta.data
      // console.log(token)
      if (!!token) {
        try {
          const respuesta = await axios.post("http://localhost:8000/user/verificarCompra", { idlibros: data.idlibros }, {
            headers: {
              Authorization: token
            }
          });
          setverificar1(respuesta.data)
          console.log(respuesta.data)
        } catch (error) {
          alert(error)
        }
      } else {
        setverificar1(false)
      }
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
  const descargarArchivo = async () => {
    const respuesta = await axios.get(`http://localhost:8000/user/archivo_pdf/${dato.archivo_pdf}`, {
      responseType: 'blob'
    })
    // Crea un objeto URL a partir del blob
    const url = window.URL.createObjectURL(new Blob([respuesta.data]));

    // Crea un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${dato.archivo_pdf}`); // Establece el nombre de archivo para la descarga
    document.body.appendChild(link);

    // Simula hacer clic en el enlace para iniciar la descarga
    link.click();

    // Elimina el objeto URL creado
    window.URL.revokeObjectURL(url);
    try {
      const respuesta = await axios.post("http://localhost:8000/user/compra", { idlibros: dato.idlibros }, {
        headers: {
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
  const redirigir = () => {
    navegate("/login")
  }
  const precio = () => {
    const precioNumerico = Number(dato.precio);
    const opciones = {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
    // const precio2 = precioNumerico.toLocaleString('es-Es', opciones)
    const precio2 = precioNumerico.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return (precio2)
  }
  const redirigirCompra = () => {
    navegate("/descargas")
  }
  const comprar = () => {
    if (sesion) {
      if (dato.precio === '0.00') {
        if (verificar1) {
          return (<button className='boton-comprar' onClick={() => { redirigirCompra() }}>Comprado</button>)
        } else {
          return (<button className='boton-comprar' onClick={() => { descargarArchivo() }}>Comprar</button>)
        }
      } else {
        if (verificar1) {
          // console.log(verificar1)
          return (<button className='boton-comprar' onClick={() => { redirigirCompra() }}>Comprado</button>)
        } else {
          // console.log(verificar1)
          return (<PayPalScriptProvider options={{ "client-id": "AWXm3X2mwDjAnQJavXR-Z_uVSuHI03gaMOcja-AKdWEUjb9m7fcbSHjPq06PyKmV557jdTRMxe9SZ0LJ" }}>
            <PayPalButtons createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: dato.precio
                  },
                  custom_id: dato.titulo
                }],
                application_context: {
                  brand_name: 'Tienda de libros',
                  landing_page: 'NO_PREFERENCE',
                  user_action: 'PAY_NOW',
                }
              })
            }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                  console.log("Pago exitoso")
                  console.log(details)
                  alert("Pago exitoso se va a descargar el archivo del libro automaticamente")
                  descargarArchivo()
                })
              }}
            />
          </PayPalScriptProvider>
          );
        }
      }
    } else {
      return (<button className='boton-comprar' onClick={() => { redirigir() }}>Comprar</button>)
    }
  }
  return (
    <div className='main-r'>
      <p className='navegacion'><StyledLink to={"/"}>Inicio</StyledLink>{" > "}<StyledLink to={"/categorias"}>Libros</StyledLink>{" > "}{dato.titulo}</p>
      <div className='main-libro'>
        <div className='main-libro_imagen'>
          <img src={dato.imagen ? `http://localhost:8000/user/libro/${dato.imagen}` : ""} alt={'imagen/'} className='imagen'></img>
        </div>
        <div className='main-libro_informacion'>
          <h1 className='main-libro_informacion-texto'>{dato.titulo}</h1>
          <h3 className='main-libro_informacion-texto-autor'><span>Autor: </span>{dato.autor}</h3>
          <hr className='main-libro_informacion-linea'></hr>
          <p className='main-libro_informacion-texto-precio'><span>Precio:</span> {precio()} USD</p>
          <p className='main-libro_informacion-texto-precio'><span className='editorial'>Editorial: </span>{dato.editorial}</p>
          <div className='main-libro_informacion-boton'>
            {comprar()}
          </div>
        </div>
      </div>
      <hr className='linea'></hr>
      <div className='main-r-descripcion'>
        <h5 className='descripcion'>Descripción</h5>
        <p className='descripcion-texto'>{dato.descripcion}</p>
      </div>
    </div>
  )
}

export default Libro