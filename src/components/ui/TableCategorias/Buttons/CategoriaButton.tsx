import { FC, useEffect, useState } from 'react'
import { ICategoria } from '../../../../types/Categoria'
import CategoriaForm from '../../Form/CategoriaForm';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import GlobalInitialValues, { setGlobalInitialValues } from '../../../../redux/slices/globalInitialValues';
import { ICategoriaShort } from '../../../../types/ShortDtos/CategoriaShort';
import { IoEyeOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { setCategory } from '../../../../redux/slices/globalCategory';
import { IoEnterOutline } from "react-icons/io5";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { BackendClient, BackendMethods } from '../../../../services/BackendClient';
import { setGlobalUpdated } from '../../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import { eliminarCategoriaError, eliminarCategoriaSuccess } from '../../../toasts/ToastAlerts';


interface ICategoriaButton {
    categoria: ICategoria;
    edicion: boolean
}

const CategoriaButton: FC<ICategoriaButton> = ({ categoria, edicion }) => {

    const { getAccessTokenSilently } = useAuth0()

    const backend = new BackendMethods()

    const [idSucursalesC, setIdSucursales] = useState<number[]>([])

    useEffect(() => {
        async function extraerIdSucursal(categoria: ICategoria) {
            const res: ICategoria = await backend.getById(`${import.meta.env.VITE_LOCAL}categoria/${categoria.id}`, getAccessTokenSilently) as ICategoria;
            const id = res.sucursales.map((sucursal) => sucursal.id)
            setIdSucursales(id)
        }
        extraerIdSucursal(categoria)
    }, [])

    console.log("idsucursas")
    console.log(idSucursalesC)

    const transformData = (categoria: ICategoria): ICategoriaShort => {
        //@ts-ignore
        return {
            id: categoria.id,
            //@ts-ignore
            idSucursales: idSucursalesC,
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
        if (selectedCategoria !== categoria && !categoria?.eliminado) {
            setSelectedCategoria(categoria);
        }
        else {
            setSelectedCategoria(null);
        }
    }

    const eliminarCategoria = async () => {
        try {
            const res = await backend.delete(`${import.meta.env.VITE_LOCAL}categoria/${categoria.id}`, getAccessTokenSilently)
            eliminarCategoriaSuccess()
            dispatch(setGlobalUpdated(true))
        } catch (error: any) {
            if (error.status === 409) {
                eliminarCategoriaError();
            }
            dispatch(setGlobalUpdated(true))
        }
    }

    const rol = useAppSelector((state) => state.GlobalRol.rol)

    return (
        <>

            {categoria.eliminado || (
                <>
                    <>
                        <div className='flex flex-row justify-end '>
                            {(rol === 'ADMIN' || rol === 'SUPERADMIN') &&
                                <>
                                    <button className='flex justify-end  mx-2 items-end'
                                        onClick={() => {
                                            dispatch(setGlobalInitialValues(transformData(categoria))),
                                                setOpen(true)
                                        }}
                                    >
                                        <span className=' text-sm size-13 font-Roboto  '>
                                            <h1 className='text-xl text-white px-2 rounded-md bg-success'>+</h1>
                                        </span>
                                    </button>


                                    <button className='flex justify-end  items-end'
                                        onClick={() => eliminarCategoria()}
                                    >
                                        <span className=' text-sm size-13 font-Roboto btn-error'>
                                            <h1 className='text-xl text-white px-2 rounded-md bg-error'>x</h1>
                                        </span>
                                    </button>
                                </>
                            }
                        </div>
                    </>
                    <div className={` m-5 flex items-start flex-col justify-end  `}>

                        <div className='flex items-center justify-between w-full'>
                            <div className={`flex flex-row items-center justify-start p-4 transitio w-full cursor-pointer hover:bg-slate-100 mx-2 rounded-xl  ${selectedCategoria ? '' : ''}`}
                                onClick={() => handleClick(categoria)} >
                                <h1 onClick={() => handleClick(categoria)} className='font-Roboto text-2xl'>{categoria.denominacion}</h1>
                                {categoria.subCategorias.length !== 0 &&
                                    <>
                                        <div className={`cursor-pointer transition-all border-red-500 text-red-500  rounded font-Roboto p-2 
                        ${selectedCategoria && 'rotate-180'}`}>
                                            <FaRegArrowAltCircleDown />
                                        </div>
                                    </>
                                }
                            </div>


                            <div className='flex flex-col items-center space-x-5'>

                                <>
                                    <Link
                                        onClick={() => dispatch(setCategory({ selected: categoria.denominacion, id: categoria.id }))}
                                        to={`/${idEmpresa}/sucursales/${idSucursales}/${categoria.esInsumo ? 'insumos' : 'manufacturados'}`}
                                        className='text-sm size-13 font-Roboto btn btn-info bg-blue-600 border-blue-600 text-white '>
                                        <IoEnterOutline className='text-2xl ' />
                                    </Link>
                                </>

                            </div>
                        </div>


                        {selectedCategoria && selectedCategoria.subCategorias.length !== 0 &&
                            selectedCategoria.subCategorias.map((subCategoria) => (
                                <>
                                    <div className='w-full'>
                                        <CategoriaButton key={subCategoria.id} categoria={subCategoria} edicion={edicion} />
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
                </>
            )}
        </>

    )
}

export default CategoriaButton