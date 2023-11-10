export interface PosContextGlobal {
    indice: string
    setIndice: React.Dispatch<React.SetStateAction<string>>
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement>) => void
    cartItems: {[key: string]: CartItem[];}
     setCartItems: React.Dispatch<React.SetStateAction<{[key: string]: CartItem[];}>>
     crearNewProducto: RegistrarNewProducts[]
     setCrearNewProducto: React.Dispatch<React.SetStateAction<RegistrarNewProducts[]>>
     openSideBar: boolean | null
     setOpenSideBar: React.Dispatch<React.SetStateAction<boolean | null>>
     descuentos: {  [key: number]: number;}
     setDescuentos: React.Dispatch<React.SetStateAction<{[key: number]: number;}>>
     totalDescuentoSum: {[key: number]: number;}
     setTotalDescuentoSum: React.Dispatch<React.SetStateAction<{[key: number]: number;}>>
     inputsCompras: { count: string; transferencia: string; tarjeta: string;
     countUSD: string; transferenciaUSD: string; tarjetaUSD: string; }
     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
     ventas: VentaProps[]
     setVentas: React.Dispatch<React.SetStateAction<VentaProps[]>>
     nuevoCliente: NuevoClienteProps[]
     setNuevoCliente: React.Dispatch<React.SetStateAction<NuevoClienteProps[]>>
     usersByIndex: {[key: string]: Users[];}
     setUsersByIndex: React.Dispatch<React.SetStateAction<{[key: string]: Users[];}>>
     montosSalida: montos[]
     setmontosSalida: React.Dispatch<React.SetStateAction<montos[]>>
     modal: boolean
     handleModal: (getModal: boolean) => void
     rolCreated: Rol[]
     setRolCreated: React.Dispatch<React.SetStateAction<Rol[]>>
     nuevoEmpleado: NuevoEmpleadoProps[]
     setNuevoEmpleado: React.Dispatch<React.SetStateAction<NuevoEmpleadoProps[]>>
     categoriaCreated: CategoryProps[]
     setCategoriaCreated: React.Dispatch<React.SetStateAction<CategoryProps[]>>
     categoryNew: string
     setCategoryNew: React.Dispatch<React.SetStateAction<string>> 
     getName: string
     setGetName: React.Dispatch<React.SetStateAction<string>>  
     nuevoProvedor: NuevoProvedorProps[]
     setNuevoProvedor: React.Dispatch<React.SetStateAction<NuevoProvedorProps[]>>
     modalEditar: boolean
     setModalEditar: React.Dispatch<React.SetStateAction<boolean>>
     validMontoInicial: boolean
     setValidMontoInicial: React.Dispatch<React.SetStateAction<boolean>>
     cierresDeCajas: CierresDeCajas[]
     setCierresDeCajas: React.Dispatch<React.SetStateAction<CierresDeCajas[]>>
     showTeclado: boolean
     setShowTeclado: React.Dispatch<React.SetStateAction<boolean>>
     modalOpen: string
     setModalOpen: React.Dispatch<React.SetStateAction<string>>
     handleModalOpen: (nombre: string) => () => void
}

export interface children {
    children: React.ReactNode
}

export interface Sidebar {
    openSideBar: boolean | null
    setOpenSideBar?: React.Dispatch<React.SetStateAction<boolean | null>>
    filteredData: RegistrarNewProducts[]
    previewPage: () => void
    nextPage: () => void
 setinputTeclado: React.Dispatch<React.SetStateAction<string>>
 inputTeclado:string
}

export interface CartItem {
    id: number,
    quantity: number
}

export interface ProductoByItem {
    id:number
    name: string,
    precio: string,
    img: any
}
export interface RegistrarNewProducts {
    name: string
    quantity: string
    precio: string
    id:number
    img: any
    codigoDeBarra: string,
    identify: string
   
   }
   export interface NuevoClienteProps {
    id:number
    name: string,
    email: string,
    address: string,
    telefono: string,
    city: string,
    state: string,
    codigoPostal: string,
    rfc:string
   }
   export interface NuevoEmpleadoProps {
    id: number
    name: string,
    email: string,
    telefono: string,
    rfc:string,
    rol:string,
    city: string,
    address: string,
    codigoPostal: string
   }
   export interface NuevoProvedorProps {
    id:number
    name: string,
    email: string,
    address: string,
    telefono: string,
    city: string,
    state: string,
    codigoPostal: string,
    rfc:string
   }
   export interface VentaProps {
    id: number ,
    nameEmpleado: string
    name: string
    idUser:number | undefined,
    subTotalProductoIva: number,
    totalArticulos: number,
    currentCartItems: CartItem[] ,
    folio: number,
    formato:any
    puntos: number
    metodoDePago:string | null
  
  }

  export interface Users {
    id:number
    name: string,
    email: string,
    address: string,
    telefono: string,
    city: string,
    state: string,
    codigoPostal: string,
    rfc:string

  }
  export interface puntosID {
    id:number
    puntos: number
    name: string
    quantity: number
  }
  export interface PosConfiguracionGlobal {
    puntos: puntos
    setpuntos: React.Dispatch<React.SetStateAction<puntos>>
    puntosValues: number | null
    setpuntosValues: React.Dispatch<React.SetStateAction<number | null>>
    formSubmitted: string | null
    setFormSubmitted: React.Dispatch<React.SetStateAction<string | null>>
    buttons: string
    setbuttons: React.Dispatch<React.SetStateAction<string>>
    disablePuntos: string
    setDisablePuntos: React.Dispatch<React.SetStateAction<string>>
    categoria: string
    setCategoria: React.Dispatch<React.SetStateAction<string>>
    AllPuntosProductosById: puntosID[]
    setAllPuntosProductosById: React.Dispatch<React.SetStateAction<puntosID[]>>
    tools: Tools[]
    setTools: React.Dispatch<React.SetStateAction<Tools[]>>
    toolsMonedas: Tools[]
    setToolsMonedas: React.Dispatch<React.SetStateAction<Tools[]>>
    puntosValor: number
    setpuntosValor: React.Dispatch<React.SetStateAction<number>>
  }
 export interface puntos {
    puntosTotal: number
    puntosCategoria: number
    puntosProducto: number
  }

  export type ProductsItems = {
    name: string; quantity: string; precio: string; id: number; img: string; codigoDeBarra: string,
  }
  export interface montos {
     id: number | undefined;
    salidas: number,
    name: string
  }

  export interface Rol {
    rol:string,
    toggle: {[key: string]: boolean;}
  }
  export interface Tools {
    label: string,
    icon: any,
    boolean: boolean,
  }
  export interface CategoryProps {
    nombreCategoria:string,
    categoriasFiltradas: RegistrarNewProducts[]
  }
  export interface CategoryFiltradaProps {
    
  }
  export interface CierresDeCajas {
    id: number
    name: string
    amountMXNEfectivoPlus: number
    amountMXNDollarPlus: number
    amountMXNPlus:number
    formato: any
  }

  export interface FormularioProps {
      nombre: string;
      email: string;
      rfc: string;
      telefono: string;
      rol: string;
      address: string;
      codigoPostal: string;
      city: string;
  }
  