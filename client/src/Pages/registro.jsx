import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Components/css/login/registro.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Registro = () => {
  const navegate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)

  const visibilidad = () => {
    setShowPassword(!showPassword)
  }
  const visibilidad1 = () => {
    setShowPassword1(!showPassword1)
  }
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const onsubmit = async (data) => {
    console.log(data)
    const { cedula, nombres, apellidos, usuario, email, contrasena } = data
    try {
      const respuesta = await axios.post("http://localhost:8000/postuser", {
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        usuario: usuario,
        email: email,
        contrasena: contrasena
      })
      alert(respuesta.data.message)
      navegate("/login")
    } catch (error) {
      if (error.response) {
        alert("Revisa tu usuario o contraseña")
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor');
      } else {
        alert(error.message)
      }
    }
  }
  return (
    <div className='main-registro'>
      <form className='formulario-registro' onSubmit={handleSubmit(onsubmit)}>
        <div className='main-registro-cuadro'><p>Registro</p></div>
        <div className='formulario-registro-contenido'>
          <label htmlFor='cedula'>
            Cedula{errors.cedula && <span className='alerta-registro'>*</span>}
          </label>
          <input type="number" name="cedula" {...register("cedula", { required: true })} />
          <div className='nombres-texto'>
            <label htmlFor='nombres'>
              Nombres{errors.nombres && <span className='alerta-registro'>*</span>}
            </label>
            <label htmlFor='apellidos'>
              Apellidos{errors.apellidos && <span className='alerta-registro'>*</span>}
            </label>
          </div>
          <div className='nombres'>
            <input type="text" name="nombres" {...register("nombres", { required: true })} />
            <input type="text" name="apellidos" {...register("apellidos", { required: true })} />
          </div>
          <label htmlFor='usuario'>
            Usuario{errors.usuario && <span className='alerta-registro'>*</span>}
          </label>
          <input type="text" name="usuario" {...register("usuario", { required: true })} />
          <label htmlFor='email'>
            Email{errors.email && <span className='alerta-registro'>*</span>}</label>
          <input type="email" name="email" {...register("email", { required: true })} />
          <label htmlFor='contrasena'>
            Contraseña{errors.contrasena && <span className='alerta-registro'>*</span>}</label>
          <div className='contraseña'>
            <input type={showPassword ? 'text' : 'password'} name="contrasena" {...register("contrasena", { required: true })} />
            <div className="ojo" onClick={visibilidad}>{showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</div>
          </div>
          <label htmlFor='confirmarContrasena'>
            Confirmar contraseña{errors.confirmarContrasena && <span className='alerta-registro'>*</span>}</label>
          <div className='contraseña'>
            <input type={showPassword1 ? 'text' : 'password'} name="confirmarContrasena" {...register("confirmarContrasena", {
              required: { value: true },
              validate: (value) => {
                if (value === watch("contrasena")) {
                  return true;
                } else {
                  return "Las contraseñas no coinciden";
                }
              }
            })}
            ></input>
            <div className="ojo" onClick={visibilidad1}>{showPassword1 ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</div>
          </div>
          <div className='boton-registro'>
            <button type="submit">Registrar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Registro