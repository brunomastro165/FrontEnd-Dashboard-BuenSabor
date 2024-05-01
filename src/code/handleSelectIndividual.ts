const handleSelect = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const denominacionSeleccionada = e.target.value;
    const sucursalSeleccionada = sucursales.find(sucursal => sucursal.nombre === denominacionSeleccionada);
    setSucursalSeleccionada(sucursalSeleccionada);
    setValues(prevState => ({
      ...prevState,
      sucursales: sucursalSeleccionada
    }))
  }