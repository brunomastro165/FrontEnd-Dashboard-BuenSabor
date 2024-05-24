import { useEffect, useState } from 'react'
import { BackendClient } from '../../../services/BackendClient'
import { ICategoria } from '../../../types/Categoria';
import CategoriaButton from './Buttons/CategoriaButton';
import CategoriaForm from '../Form/CategoriaForm';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPencil } from "react-icons/bs";
import GenericWaiter from '../Waiters/GenericWaiter';


class CRUDMetods extends BackendClient<any> { }

const ContainerCategorias = () => {

  const backend = new CRUDMetods();

  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const [edicion, setEdicion] = useState<boolean>(true);

  //ROUTER

  const { idSucursales } = useParams();

  const [open, setOpen] = useState<boolean>(false);

  //REDUX 

  const updated = useAppSelector((state) => state.GlobalUpdated.updated)

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCategorias = async () => {
      const res: ICategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${idSucursales}`);

      const categoriasPadre: ICategoria[] = res.filter((categoria) => categoria.esPadre === true)

      const categoriasExistentes: ICategoria[] = categoriasPadre.filter((categoria) => categoria.eliminado === false)

      const categoriasOrdenadas: ICategoria[] = categoriasExistentes
        .filter((categoria) => categoria.eliminado === false)
        .sort((a, b) => a.denominacion.localeCompare(b.denominacion));

      setCategorias(categoriasOrdenadas);
    }
    getCategorias();

    dispatch(setGlobalInitialValues({
      id: 0,
      denominacion: '',
      idSucursales: [],
      eliminado: false,
      esPadre: 'true',
    }))

    dispatch(setGlobalUpdated(false))
  }, [updated])


  return (
    <>
      <div className='w-full  flex justify-end'>
        <button className='text-2xl font-Roboto btn btn-success my-4 bg-white text-green-600 hover:text-white mr-10 hover:bg-green-600'
          onClick={() => setOpen(true)}
        >Agregar +</button>

        <button className='text-2xl font-Roboto btn bg-white border-blue-600 my-4 bg-blue text-blue-600 hover:text-white mr-10 hover:bg-blue-600'
          onClick={() => setEdicion(!edicion)}
        >Editar <BsPencil /></button>
      </div>

      {categorias.length >= 1 ? (
        <>
          <AnimatePresence>
            <div className=' mx-auto w-full  '>
              {categorias.map((categoria) => (
                <>
                  <div className='flex  justify-center items-center'>
                    <div className='shadow-md rounded-xl w-2/3  p-5 m-5'>
                      <h1 className={`font-Roboto  w-max px-4 py-1 rounded-md text-white ${categoria.esInsumo ? 'bg-blue-600' : 'bg-red-600'}`}>{categoria.esInsumo ? 'Insumo' : 'Manufacturado'}</h1>
                      <CategoriaButton categoria={categoria} edicion={edicion} />
                    </div>
                  </div>
                </>
              ))}
            </div>
          </AnimatePresence>
        </>
      ) : (
        <GenericWaiter text='Parece que no has agregado nada...' url='search.svg' />
      )}


      {open && (
        <div className="fixed z-50 inset-0 overflow-y-auto w-full">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
              {<CategoriaForm open={open} setOpen={setOpen} method='POST' />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ContainerCategorias