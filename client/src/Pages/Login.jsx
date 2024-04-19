import { useState } from 'react'
import axios from 'axios'
import '../Components/login/login.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navegate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const visibilidad = () => {
    setShowPassword(!showPassword)
  }
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onsubmit = async (data) => {
    console.log(data.usuario)
    const { usuario, contrasena, rol } = data
    try {
      if (rol === "usuario") {
        const respuesta = await axios.post("http://localhost:8000/getuser", {
          usuario: usuario,
          contrasena: contrasena
        })
        const token = respuesta.data.token
        localStorage.setItem("token", token);
        alert(respuesta.data.message)
        navegate("/")
      } else {
        if (rol === "admin") {
          const respuesta = await axios.post("http://localhost:8000/getadmin", {
            usuario: usuario,
            contrasena: contrasena
          })
          const token = respuesta.data.token
          localStorage.setItem("token", token);
          alert(respuesta.data.message)
          navegate("/admin")
        }
      }
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
    <div className='main-login'>
      <form className='formulario' onSubmit={handleSubmit(onsubmit)}>
        <div className='main-login-cuadro'><p>Inicio de sesión</p></div>
        <div className='formulario-contenido'>
          <label htmlFor='usuario'>
            Usuario{errors.usuario && <span className='alerta'>*</span>}
          </label>
          <input type="text" name="usuario" {...register("usuario", { required: true })} />
          <label htmlFor='contrasena'>Contraseña{errors.contrasena && <span className='alerta'>*</span>}</label>
          <div className='contraseña'>
            <input type={showPassword ? 'text' : 'password'} name="contrasena" {...register("contrasena", { required: true })} />
            <div className='ojo' onClick={visibilidad}>{showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</div>
          </div>
          <label>Rol</label>
          <div className='rol-contenido'>
            <select htmlFor='rol' className='rol' {...register("rol")}>
              <option value='rol'>Rol</option>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className='boton-login'>
            <button type="submit">Iniciar sesión</button>
          </div>
        </div>
        <div className='link'><p>¿No tienes cuenta? haz click</p><Link to={"/registro"} style={{ color: '#74C0FC', fontSize: '13px' }}>aquí</Link></div>
      </form>
    </div>
  )
}

export default Login