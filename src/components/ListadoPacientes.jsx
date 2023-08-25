import usePacientes from "../hooks/usePaciente"
import Paciente from "./Paciente"

const ListadoPacientes = () => {
  const { pacientes } = usePacientes()

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administa tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {pacientes.map( paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comienza agregando tus {''} <span className="text-indigo-600 font-bold">Primeros Pacientes</span></p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes