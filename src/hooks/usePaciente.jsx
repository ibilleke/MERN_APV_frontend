// UseContext es para extraer los datos
import { useContext } from 'react'
// De aquí debe sacar los datos
import PacientesContext from '../context/PacientesProvider'

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes