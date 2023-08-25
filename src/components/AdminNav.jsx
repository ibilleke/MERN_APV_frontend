import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <nav className='flex gap-3'>
        <Link
            to="/admin/perfil"
            className='font-bold text-gray-500'
        >Perfil</Link>

        <Link
            to="/admin/cambiar-password"
            className='font-bold text-gray-500'
        >Cambiar Contraseña</Link>
    </nav>
  )
}

export default AdminNav