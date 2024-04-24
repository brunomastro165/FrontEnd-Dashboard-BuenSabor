export interface IArticuloInsumo{
    id:number,
    denominacion:string,
    precioVenta:number,
    imagenes:[]
    unidadMedida:null
    precioCompra:number,
    stockActual:number,
    stockMaximo:number,
    esParaElaborar:boolean
}
