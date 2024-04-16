import axios from 'axios';
import { useForm } from 'react-hook-form'
import '../Components/admin/inicio.css'
import { Admin } from './admin';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Components/admin/crearLibro.css'
const CrearLibro = () => {
  const navegate = useNavigate()
  const token = localStorage.getItem("token")
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const descripcion = watch('descripcion', ''); // Obtenemos el valor del input 'descripcion' del formulario
    const onsubmit = async (data) => {
        const {titulo,autor,descripcion,editorial,precio,archivo_pdf,imagen} = data
        console.log(data)
        console.log(archivo_pdf[0])
        console.log(imagen[0])
        const formData = new FormData();
        formData.append('titulo',titulo)
        formData.append('autor',autor)
        formData.append('descripcion',descripcion)
        formData.append('editorial',editorial)
        formData.append('precio',precio)
        formData.append('archivo',archivo_pdf[0])
        formData.append('imagen',imagen[0])
        try {
            const respuesta = await axios.post("http://localhost:8000/admin/postlibro", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
              }
            });
            alert(respuesta.data.message)
            navegate("/admin")
        } catch (error) {
            if (error.response) {
                alert("Hubo un error al crear el libro")
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
        <div className='main-crear'>
                <div className='main-registro-libro'>
                    <form className='formulario-registro-libro' onSubmit={handleSubmit(onsubmit)}>
                        <div className='main-registro-cuadro-libro'><p>Registro de un libro</p></div>
                        <div className='formulario-registro-contenido-libro'>
                            <label htmlFor='titulo'>
                                titulo{errors.titulo && <span className='alerta-registro'>*</span>}
                            </label>
                            <input type="text" name="titulo" {...register("titulo", { required: true })} />
                            {/* <div className='nombres-texto'> */}
                                <label htmlFor='autor'>
                                    Autor{errors.autor && <span className='alerta-registro'>*</span>}
                                </label>
                                <input type="text" name="autor" {...register("autor", { required: true })} />
                            {/* </div> */}
                            {/* <div className='nombres'>
                            </div> */}
                            <label htmlFor='descripcion-libro'>
                                Descripción{errors.descripcion && <span className='alerta-registro'>*</span>}</label>
                            <div className='descripcion-texto-libro'>
                            <textarea type="text" className='descripcion' name="descripcion" {...register("descripcion", { required: true })} />

                            </div>
                            <div className='etiqueta-main'>
                            <p className='etiqueta'>{descripcion.length}</p>
                            </div>
                            <label htmlFor='editorial' className='editorial'>
                                Editorial{errors.editorial && <span className='alerta-registro'>*</span>}</label>
                            <input type="text" name="editorial" {...register("editorial", { required: true })} />
                            <label htmlFor='precio'>
                                Precio{errors.precio && <span className='alerta-registro'>*</span>}
                            </label>
                            <input type={'number'} name="precio" {...register("precio", { required: true })} />
                                {/* <div className="ojo" onClick={visibilidad}>{showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</div> */}
                            <label htmlFor='archivo'>
                            Archivo PDF{errors.archivo_pdf && <span className='alerta-registro'>*</span>}</label>
                            <input type="file" name="file" accept='.pdf' {...register("archivo_pdf", { required: true })} />
                            <label htmlFor='archivo'>
                            Imagen{errors.imagen && <span className='alerta-registro'>*</span>}</label>
                            <input type="file" name="imagen" accept='image/*' {...register("imagen", { required: true })} />
                            <div className='boton-registro'>
                                <button type="submit">Registrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
}
export default CrearLibro