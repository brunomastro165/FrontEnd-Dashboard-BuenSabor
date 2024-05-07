import { useEffect, useState } from 'react'
import { BackendClient } from '../../../services/BackendClient'
import { ICategoria } from '../../../types/Categoria';
import CategoriaButton from './Buttons/CategoriaButton';
import CategoriaForm from '../Form/CategoriaForm';

class CRUDMetods extends BackendClient<any> { }

const ContainerCategorias = () => {

  const backend = new CRUDMetods();

  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const getCategorias = async () => {
      const res: ICategoria[] = await backend.getAll("http://localhost:8080/categorias");
      setCategorias(res);
    }
    getCategorias();
  }, [])


  return (
    <>

      <div className=' mx-auto w-1/2'>

        <div className='w-full  flex justify-center  my-4'>
          <button className='text-2xl font-Roboto btn btn-success bg-white text-green-600 hover:text-white  hover:bg-green-600'
            onClick={() => setOpen(true)}
          >Agregar +</button>
        </div>

        {categorias.map((categoria) => (
          <>
            <h1 className='font-Roboto text-xl'>{categoria.denominacion}</h1>
            <div className='border rounded  p-5 m-5'>
              <CategoriaButton categoria={categoria} />
            </div>
          </>
        ))}

      </div>

      {open && (
        <div className="fixed z-50 inset-0 overflow-y-auto w-full">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
              {<CategoriaForm open={open} setOpen={setOpen} />}
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default ContainerCategorias