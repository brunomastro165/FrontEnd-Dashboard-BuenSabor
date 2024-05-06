import { FC, useState } from 'react'
import { ICategoria } from '../../../../types/Categoria'

interface ICategoriaButton {
    categoria: ICategoria;
}

const CategoriaButton: FC<ICategoriaButton> = ({ categoria }) => {
    const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(null);

    const handleClick = (categoria: ICategoria | null) => {
        setSelectedCategoria(categoria);
    }

    return (
        <div className=' m-5  '>
            <div className='flex flex-row items-center justify-start p-2 '>
                <h1 onClick={() => handleClick(categoria)}>-{categoria.denominacion}</h1>
                {categoria.subCategorias.length !== 0 &&
                    <>
                        <div onClick={() => handleClick(categoria)} className='cursor-pointer border border-red-500 text-red-500 rounded font-Roboto  '>V</div>
                        {selectedCategoria && <div className='text-red-600 font-bold px-2 cursor-pointer   ' onClick={() => handleClick(null)}>X</div>}
                    </>
                }
            </div>


            {selectedCategoria && selectedCategoria.subCategorias.length !== 0 &&
                selectedCategoria.subCategorias.map((subCategoria) => (
                    <CategoriaButton key={subCategoria.id} categoria={subCategoria} />
                ))
            }
        </div>
    )
}

export default CategoriaButton