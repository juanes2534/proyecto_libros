import axios from 'axios';
import { useForm } from 'react-hook-form'
import '../Components/css/admin/inicio.css'
import { Admin } from './admin';
import { useNavigate, useParams } from 'react-router-dom';
import '../Components/css/admin/crearLibro.css'
import { useEffect, useState } from 'react';

const EditarLibro = () => {
    const navegate = useNavigate();
    const { titulo } = useParams();
    const token = localStorage.getItem("token")
    const [dato, setdato]= useState([])
    const titulo1 = titulo.replace(/-/g, ' ');
    useEffect(()=>{
        obtener()
    },[])
    const obtener= async()=>{
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
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const descripcion = watch('descripcion', ''); // Obtenemos el valor del input 'descripcion' del formulario
    const onsubmit = async (data) => {
        const { archivo_pdf, imagen } = data
        let titulo, autor, descripcion, editorial, categoria, precio
        if (data.titulo===""){
            titulo=dato.titulo
        }else{
            titulo=data.titulo
        }
        if (data.autor===""){
            autor=dato.autor
        }else{
            autor=data.autor
        }
        if (data.descripcion===""){
            descripcion=dato.descripcion
        }else{
            descripcion=data.descripcion
        }
        if (data.editorial===""){
            editorial=dato.editorial
        }else{
            editorial=data.editorial
        }
        if (data.categoria===""){
            categoria=dato.categoria
        }else{
            categoria=data.categoria
        }
        if (data.precio===""){
            precio=dato.precio
        }else{
            precio=data.precio
        }
        // console.log(precio)
        // console.log(archivo_pdf[0])
        // console.log(imagen[0])
        const formData = new FormData();
        formData.append('idlibros',dato.idlibros)
        formData.append('titulo', titulo)
        formData.append('autor', autor)
        formData.append('descripcion', descripcion)
        formData.append('editorial', editorial)
        formData.append('categoria',categoria)
        formData.append('precio', precio)
        formData.append('archivo', archivo_pdf[0])
        formData.append('imagen', imagen[0])
        try {
            const respuesta = await axios.post("http://localhost:8000/admin/editarLibro", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                }
            });
            alert(respuesta.data.message)
            navegate(`/admin/libro/${titulo}`)
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
    const mostrarNumero = ()=>{
        if (descripcion.length===0) {
            if (dato.descripcion){
                return dato.descripcion.length
            }else{
                return ""
            }
        }else{
            return descripcion.length
        }
    }
    return (
        <div className='main-inicio'>
            <Admin />
            <div className='saludo-container'>
                <div className='contenedor-blanco'>
                <div className='main-crear'>
                    <div className='main-registro-libro'>
                        <form className='formulario-registro-libro' onSubmit={handleSubmit(onsubmit)}>
                            <div className='main-registro-cuadro-libro'><p>Editar de un libro</p></div>
                            <div className='formulario-registro-contenido-libro'>
                                <label htmlFor='titulo'>
                                    titulo{errors.titulo && <span className='alerta-registro'>*</span>}
                                </label>
                                <input type="text" name='titulo' {...register("titulo", { required: false })} defaultValue={dato.titulo}/>
                                <label htmlFor='autor'>
                                    Autor{errors.autor && <span className='alerta-registro'>*</span>}
                                </label>
                                <input type="text" name='autor' {...register("autor", { required: false })} defaultValue={dato.autor} />
                                <label htmlFor='descripcion-libro'>
                                    Descripción{errors.descripcion && <span className='alerta-registro'>*</span>}</label>
                                <div className='descripcion-texto-libro'>
                                    <textarea type="text" name='descripcion' className='descripcion-libro' {...register("descripcion", { required: false })} defaultValue={dato.descripcion}/>

                                </div>
                                <div className='etiqueta-main'>
                                    <p className='etiqueta'>{mostrarNumero()}</p>
                                </div>
                                <label htmlFor='editorial' className='editorial'>
                                    Editorial{errors.editorial && <span className='alerta-registro'>*</span>}</label>
                                <input type="text" name='editorial' {...register("editorial", { required: false })} defaultValue={dato.editorial} />
                                <label>Categoria</label>
                                <div className='rol-contenido-registro'>
                                    <select htmlFor='categoria' className='rol-registro' {...register("categoria")} defaultValue={dato.categoria}>
                                        <option value='categoria'>Categoria</option>
                                        <option value="Ficción">Ficción</option>
                                        <option value="Aventura">Aventura</option>
                                        <option value="Suspenso">Suspenso</option>
                                        <option value="Romance">Romance</option>
                                    </select>
                                </div>
                                <label htmlFor='precio'>
                                    Precio{errors.precio && <span className='alerta-registro'>*</span>}
                                </label>
                                <input type={'text'} name='precio' pattern="[0-9]+([.,][0-9]+)?" {...register("precio", { required: false })} defaultValue={dato.precio}/>
                                <label htmlFor='archivo'>
                                    Archivo PDF{errors.archivo_pdf && <span className='alerta-registro'>*</span>}</label>
                                <input type="file" name="file" className='archivo-libro' accept='.pdf' {...register("archivo_pdf", { required: true })} />
                                <label htmlFor='archivo'>
                                    Imagen{errors.imagen && <span className='alerta-registro'>*</span>}</label>
                                <input type="file" name="imagen" className='imagen-libro' accept='image/*' {...register("imagen", { required: true })} />
                                <div className='boton-registro'>
                                    <button type="submit">Editar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditarLibro