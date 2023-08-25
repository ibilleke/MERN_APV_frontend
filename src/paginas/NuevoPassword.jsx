import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const NuevoPassword = () => {
    const [ password, setPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})
    const [ tokenValido, setTokenValido ] = useState(false)
    const [ passwordModificado, setPasswordModificado ] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect( () => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu nueva contraseña'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( password.length < 6 ){
            setAlerta({
                msg: 'La contraseña debe de contener mínimo de 6 caracteres',
                error: true
            })
            return
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, {password})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
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
                <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Contraseña y no Pierdas Acceso a {" "} <span className="text-black">tus Pacientes</span> </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta
                    alerta={alerta}
                />}

                { tokenValido && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label className="text-gray-600 block text-xl font-bold">
                                    Contraseña
                                </label>
                                <input
                                    type="contraseña"
                                    placeholder="La contraseña debe de contener mínimo 6 caracteres"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={password}
                                    onChange={ e => setPassword(e.target.value) }
                                />
                            </div>

                            <input
                                type="submit"
                                value="Confirmar"
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto items-center"
                            />
                        </form>
                    </>
                )}

                {passwordModificado &&
                    <Link
                    className='block text-center my-5 text-grey-500'
                    to="/">Iniciar Sesión</Link> 
                }
            </div>
        </>
    )
}

export default NuevoPassword;