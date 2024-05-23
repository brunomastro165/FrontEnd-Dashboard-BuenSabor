import { FC, useState } from 'react'
import { ICategoria } from '../../../../types/Categoria'
import CategoriaForm from '../../Form/CategoriaForm';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import GlobalInitialValues, { setGlobalInitialValues } from '../../../../redux/slices/globalInitialValues';
import { ICategoriaShort } from '../../../../types/ShortDtos/CategoriaShort';
import { IoEyeOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { setCategory } from '../../../../redux/slices/globalCategory';

interface ICategoriaButton {
    categoria: ICategoria;
}


const CategoriaButton: FC<ICategoriaButton> = ({ categoria }) => {

    const transformData = (categoria: ICategoria): ICategoriaShort => {
        //@ts-ignore
        return {
            id: categoria.id,
            //@ts-ignore
            idSucursales: [],
            eliminado: false,
            esInsumo: categoria.esInsumo,
            esPadre: false,
            denominacion: ''
        };
    }

    //REDUX
    const dispatch = useAppDispatch();

    const categoriaSeleccionada = useAppSelector((state) => state.GlobalCategory.selected)

    const [open, setOpen] = useState<boolean>(false);

    const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(null);


    const { idEmpresa, idSucursales } = useParams();

    const handleClick = (categoria: ICategoria | null) => {
        setSelectedCategoria(categoria);
    }

    return (
        <div className={` m-5 flex items-start flex-col justify-start  `}>
            <div className='flex items-center justify-between w-full'>
                <div className={`flex flex-row items-center justify-start p-2 ${selectedCategoria ? '' : ''}`}>
                    <h1 onClick={() => handleClick(categoria)} className='font-Roboto text-2xl'>{categoria.denominacion}</h1>
                    {categoria.subCategorias.length !== 0 &&
                        <>
                            <div onClick={() => handleClick(categoria)} className={`cursor-pointer transition-all border-red-500 text-red-500 rounded font-Roboto p-2 
                        ${selectedCategoria && 'rotate-180'}`}>
                                V
                            </div>
                            {selectedCategoria && <div className='text-red-600 font-bold px-2 cursor-pointer   ' onClick={() => handleClick(null)}>X</div>}
                        </>
                    }
                </div>

                <div className='flex flex-row items-center'>

                    <Link
                        onClick={() => dispatch(setCategory(categoria.denominacion))}
                        to={`/${idEmpresa}/sucursales/${idSucursales}/${categoria.esInsumo ? 'insumos' : 'manufacturados'}`} className='text-sm size-13 font-Roboto btn btn-success  bg-white text-blue-600 border-blue-600 hover:text-white mr-10 hover:bg-blue-600 hover:border-blue-600 '>
                        <IoEyeOutline className='text-2xl ' />
                    </Link>

                    <button className='text-sm size-13 font-Roboto btn btn-success my-4 bg-white text-green-600 hover:text-white mr-10 hover:bg-green-600'
                        onClick={() => { setOpen(true), dispatch(setGlobalInitialValues(transformData(categoria))) }}
                    >
                        <span className='text-2xl'>+</span>
                    </button>

                </div>

            </div>


            {selectedCategoria && selectedCategoria.subCategorias.length !== 0 &&
                selectedCategoria.subCategorias.map((subCategoria) => (
                    <>
                        <div className='w-full'>
                            <CategoriaButton key={subCategoria.id} categoria={subCategoria} />
                        </div>
                    </>
                ))
            }


            {open && (
                <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            {<CategoriaForm open={open} setOpen={setOpen} method='SUBPUT' />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoriaButton