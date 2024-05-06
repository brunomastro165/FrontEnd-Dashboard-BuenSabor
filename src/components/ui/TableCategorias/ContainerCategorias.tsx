import { useEffect, useState } from 'react'
import { BackendClient } from '../../../services/BackendClient'
import { ICategoria } from '../../../types/Categoria';
import CategoriaButton from './Buttons/CategoriaButton';

class CRUDMetods extends BackendClient<any> { }

const ContainerCategorias = () => {

  const backend = new CRUDMetods();

  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    const getCategorias = async () => {
      const res: ICategoria[] = await backend.getAll("http://localhost:8080/categorias");
      setCategorias(res);
    }
    getCategorias();
  }, [])


  return (
    <div className=' mx-auto w-1/2'>
      {categorias.map((categoria) => (
        <>
          <h1 className='font-Roboto text-xl'>{categoria.denominacion}</h1>
          <div className='border rounded  p-5 m-5'>
            <CategoriaButton categoria={categoria} />
          </div>
        </>
      ))}


    </div>
  )
}

export default ContainerCategorias