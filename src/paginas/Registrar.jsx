import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clientesAxios from '../config/axios'

const Registrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [alerta, setAlerta ] = useState('')

    const handleSubmit = async e => {
      e.preventDefault();

      if([nombre, email, password, repetirPassword].includes('')) {
        return setAlerta({msg: 'Hay campos vacíos', error: true})
      }

      if(password !== repetirPassword) {
        return setAlerta({msg: 'Las contraseñas deben de ser iguales', error: true})
      }

      if(password.length < 6) {
        return setAlerta({msg: 'La contraseña debe de contener mínimo 6 caracteres', error: true})
      }

      setAlerta({})

      // Crear el usuario en la api
      try {
        await clientesAxios.post('/veterinarios', { nombre, email, password })
        setAlerta({
          msg: 'Cuenta creada exitosamente',
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    const { msg } = alerta

    return (
      <>
        <div className="my-5">
          <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {" "} <span className="text-black">tus Pacientes</span> </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alerta
            alerta={alerta}
          />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label className="text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre y apellido"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={nombre}
                onChange={ e => setNombre(e.target.value) }
              />
            </div>

            <div className="my-5">
              <label className="text-gray-600 block text-xl font-bold">
              Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Registra tu correo electrónico"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={ e => setEmail(e.target.value) }
              />
            </div>

            <div className="my-5">
              <label className="text-gray-600 block text-xl font-bold">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="La contraseña debe de contener mínimo 6 caracteres"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
            </div>

            <div className="my-5">
              <label className="text-gray-600 block text-xl font-bold">
                Comprobar contraseña
              </label>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={ e => setRepetirPassword(e.target.value) }
              />
            </div>

            <input
              type="submit"
              value="Crear cuenta"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto items-center"
            />
          </form>

          <nav className='mt-2 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-grey-500'
              to="/">¿Ya tiene una cuenta? Inicia sesión </Link>
            <Link
              className='block text-center my-5 text-grey-500'
              to="/olvide-password">¿Has olvidado la contraseña? </Link>
          </nav>
        </div>
      </>
    )
  }
  
  export default Registrar