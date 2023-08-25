// UseContext es para extraer los datos
import { useContext } from 'react'
// De aquí debe sacar los datos
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth