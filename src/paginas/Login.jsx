import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios';

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alerta, setAlerta ] = useState('')

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
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
        <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus {" "} <span className="text-black"> Pacientes</span> </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'> 
        {msg && <Alerta
            alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 block text-xl font-bold">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />

        </form>

        <nav className='mt-2 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-grey-500'
            to="/registrar">¿No tienes una cuenta? Regístrate </Link>
          <Link
            className='block text-center my-5 text-grey-500'
            to="/olvide-password">¿Has olvidado la contraseña? </Link>
        </nav>
      </div> 
    </>
  );
};

export default Login