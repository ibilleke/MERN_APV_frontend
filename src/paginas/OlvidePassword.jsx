import { useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {
  const [ email, setEmail ] = useState('')
  const [ alerta, setAlerta ] = useState(false)
  
  const handleSubmit = async e => {
    e.preventDefault()

    if(email === '' || email.length < 6) {
      setAlerta({msg: 'El correo electronico es obligatorio', error: true})
    }

    try {
      const { data } = await clienteAxios.post('veterinarios/olvide-password', {email})
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <div className="my-5">
        <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Pierdas {" "} <span className="text-black">tus Pacientes</span> </h1>
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
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="Registra tu email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar correo"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto items-center"
          />
        </form>

        <nav className='mt-2 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-grey-500'
              to="/">¿Ya tiene una cuenta? Inicia sesión </Link>
            <Link
              className='block text-center my-5 text-grey-500'
              to="/registrar">¿No tienes una cuenta? Regístrate </Link>
          </nav>
      </div>
    </>
  )
}

export default OlvidePassword