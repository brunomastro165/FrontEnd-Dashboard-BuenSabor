//@ts-nocheck
const handleSelect = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const denominacionSeleccionada = e.target.value;
    const sucursalSeleccionada = sucursales.find(sucursal => sucursal.nombre === denominacionSeleccionada);
    setSucursalSeleccionada(sucursalSeleccionada);
    setValues(prevState => ({
      ...prevState,
      sucursales: sucursalSeleccionada
    }))
  }


  const getUnidades = async () => {
    const res: IUnidadMedida[] = await backend.getAll("http://localhost:8080/unidadesMedidas");
    setUnidadesMedida(res);
    setLoaded(true);
}