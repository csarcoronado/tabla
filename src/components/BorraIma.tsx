import { useState } from 'react';
import blog1 from './image/blog1.jpg';
import { BorraIma, BorraImag } from '../interface/interfaceTabla';
import './estilos.css'
import { useRef } from 'react';
import {IoEllipsisHorizontalCircle, IoAddCircleSharp, IoRemoveCircleSharp, IoRemoveCircleOutline, IoRefreshCircleSharp, IoSearchOutline, IoTrash} from 'react-icons/io5';
import {AiOutlinePlusCircle, AiOutlineMinus} from "react-icons/ai"
import { useEffect } from 'react';
import {BsCashCoin} from "react-icons/bs"


function ImageTable() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState<BorraIma[]>([]);
  const [originalData, setOriginalData] = useState<BorraIma[]>([]);
  const [formData, setFormData] = useState<BorraIma>({name:'', precio: '', cantidad: ''});
  const [formDatas, setFormDatas] = useState<BorraImag>({otrosCs:'', iva: '', subTotal: '', total: '', totalDeArticulos: '',});
  const [searchText, setSearchText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<BorraIma | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedAmount, setEditedAmount] = useState<string>('');
  const [sortedDataByCantidad, setSortedDataByCantidad] = useState<BorraIma[]>([]);
  const [sortedDataCantidada, setSortedDataCantidada] = useState<BorraIma[]>([]);
  const [deletedProduct, setDeletedProduct] = useState<BorraIma | null>(null);
  const [showSecondaryButtons, setShowSecondaryButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [totalSubtotal, setTotalSubtotal] = useState<number>(0);


  const totalDeArticulos = imageData.length;
  const iva = 0.16;

  const calcularMontoIVA = () => {
    if (imageData.length > 0) {
      const totalSubtotal = imageData.reduce((total, data) => {
        return total + Number(data.precio) * Number(data.cantidad);
      }, 0);
  
      const montoIVA = iva * totalSubtotal;
      return montoIVA.toFixed(2); // Redondear el resultado a dos decimales
    } else {
      return '0.00';
    }
  };

  useEffect(() => {
    // Calcula el subtotal total cuando cambia el estado imageData
    const newTotalSubtotal = imageData.reduce((total, data) => {
      return total + Number(data.precio) * Number(data.cantidad);
    }, 0);
    setTotalSubtotal(newTotalSubtotal);
  }, [imageData]);

  
   const fetchMoreData = () => {
    // Simula la carga de más datos
    setIsLoading(true);
    setTimeout(() => {
      const newData = [...imageData];
      for (let i = 0; i < 10; i++) {
        newData.push({
          name: `Producto ${newData.length + 1}`,
          precio: `$${(Math.random() * 100).toFixed(2)}`,
          cantidad: Math.floor(Math.random() * 100),
        });
      }
      setImageData(newData);
      setIsLoading(false);
    }, 1000);
  };


  const resetData = () => {
    // Restablecer los datos a los originales
    setImageData([...originalData]);
  };

  const searchInputRef = useRef(null);

  const toggleSecondaryButtons = () => {
    setShowSecondaryButtons(!showSecondaryButtons);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sortDataByCantidad = () => {
    const sortedData = [...imageData];
    sortedData.sort((a, b) => b.cantidad - a.cantidad);
    setImageData(sortedData);
  };

  const sortDataByCantidada = () => {
    const sortedData = [...imageData];
    sortedData.sort((a, b) => a.cantidad - b.cantidad);
    setImageData(sortedData);
  };

  const handleEdit = (product: BorraIma) => {
    setEditedAmount(product.cantidad);
    setIsEditing(true);
  };


  const handleSave = (product: BorraIma) => {
    // Realiza la lógica para guardar la cantidad editada en tu lista o base de datos
    // Asegúrate de validar y guardar los cambios en la base de datos
    // Aquí, asumiremos que se ha actualizado en el estado local imageData
    const updatedData = imageData.map((item) => {
      if (item === product) {
        return {
          ...item,
          cantidad: editedAmount,
        };
      }
      return item;
    });
    setImageData(updatedData);
    setIsEditing(false);
  };

  const handleIncreaseAmount = (product: BorraIma) => {
    const updatedData = imageData.map((item) => {
      if (item === product) {
        return {
          ...item,
          cantidad: String(parseInt(item.cantidad) + 1), // Incrementa la cantidad
        };
      }
      return item;
    });
    setImageData(updatedData);
  };

  const handleInputChanges = (e, product) => {
    const newValue = e.target.value;
    // Realiza la lógica para actualizar el valor en tu lista o base de datos
    // Asegúrate de validar y guardar los cambios en la base de datos
    // Aquí, asumiremos que se ha actualizado en el estado local imageData
    const updatedData = imageData.map((item) => {
      if (item === product) {
        return {
          ...item,
          cantidad: newValue,
        };
      }
      return item;
    });
    setImageData(updatedData);
  };
  const handleDecreaseAmount = (product: BorraIma) => {
    const updatedData = imageData.map((item) => {
      if (item === product) {
        const newAmount = parseInt(item.cantidad) - 1;
        return {
          ...item,
          cantidad: newAmount >= 0 ? String(newAmount) : item.cantidad, // Decrementa la cantidad si es mayor o igual a cero
        };
      }
      return item;
    });
    setImageData(updatedData);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addData = () => {
    if (formData.name && formData.cantidad && formData.precio) {
      const newData = { ...formData };
      setImageData([...imageData, newData]);
      setOriginalData([...originalData, newData]);
      setFormData({
        name: '',
        precio: '',
        cantidad: '',
      });
    }
  };
  const addDatas = () => {
    if (formDatas.otrosCs && formDatas.iva && formDatas.subTotal && formDatas.total && formDatas.totalDeArticulos) {
      const newData = { ...formData };
      setImageData([...imageData, newData]);
      setOriginalData([...originalData, newData]);
      setFormDatas({
        otrosCs: '',
        iva: '',
        subTotal: '',
        total: '',
        totalDeArticulos: '',
      });
    }
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtrar los datos según el texto de búsqueda
    const filteredData = imageData.filter((data) => {
      const searchTerms = [data.name, data.cantidad, data.precio].join(' ').toLowerCase();
      return searchTerms.includes(searchText.toLowerCase());
    });
    // Actualizar los datos visibles en la tabla
    setImageData(filteredData);
  };

  const resetSearch = () => {
    // Restablecer la lista de productos a su estado original
    setImageData(originalData);
    setSearchText('');
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectProduct = (product) => {
    const updatedSelectedProducts = new Set(selectedProducts);

    if (updatedSelectedProducts.has(product)) {
      updatedSelectedProducts.delete(product); // Deseleccionar el producto
    } else {
      updatedSelectedProducts.add(product); // Seleccionar el producto
    }

    setSelectedProducts(updatedSelectedProducts);
  };


  const handleDeleteSelected = () => {
    // Elimina los productos seleccionados
    const updatedData = imageData.filter((data) => !selectedProducts.has(data));
    setImageData(updatedData);

    // Deselecciona todos los productos
    setSelectedProducts(new Set());
  };


  const showProductDetails = (product: BorraIma) => {
    setSelectedProduct(product);
  };

  const deleteProduct = (product) => {
    var opcion = window.confirm("Realmente quieres eliminar el producto");
    if (opcion) {
      // Mover el producto eliminado a los datos eliminados
     
  
      const updatedData = imageData.filter((item) => item !== product);
      setImageData(updatedData);

      setSelectedProduct(null);
    }
  };

const undoDelete = () => {
  if (deletedProduct) {
    // Restaura el producto eliminado
    setImageData([...imageData, deletedProduct]);
    setOriginalData([...originalData, deletedProduct]);

    // Limpia el producto eliminado temporal
    setDeletedProduct(null);
  }
};

  return (
    <div className='container'>
      <h1>Espacio para capturar tus datos</h1>
      <h2>Selecciona el producto y agregale los datos necesarios</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className='container1'>
        <label htmlFor="name">Nombre:</label>
        <input
          className='input'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="precio">Precio:</label>
        <input
          className='input'
          type="text"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          className='input'
          type="text"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleInputChange}
        />
      </div>
      <button className= "button" onClick={addData}>Agregar Datos</button>

      <div>
        <form onSubmit={handleSearch}>
        <label htmlFor="searchText">Buscar Producto:</label>
        <input
          type="text"
          id="searchText"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          ref={searchInputRef}
        />
        <button className="buttonca" type='submit'>Buscar<IoSearchOutline/></button>
        <button className="buttonca" onClick={resetSearch}>Restablecer lo anterior</button>
      </form>{' '}
      </div>{' '}
      <table>
      <div className='table table-responsive' >
        <thead className=" table table-dark align-middle">
          <tr>
            <th className='th'>Nombre</th>
            <th className='th'>Precio</th>
            <th className='th'>Subtotal</th>
            <th className='th'>Cantidad 
            {/* <button className="buttonca" onClick={toggleSecondaryButtons}>
                <IoEllipsisHorizontalCircle/>
              </button>
              {showSecondaryButtons && (
                <span>
            <button className='buttonca' onClick={sortDataByCantidad}> <IoAddCircleSharp/></button>{' '}
            <button className='buttonca' onClick={sortDataByCantidada}><IoRemoveCircleSharp/></button>{' '}
            <button className="buttonca" onClick={resetData}><IoRefreshCircleSharp/></button>
            </span>
              )} */}
            </th> 
            <th className='th'><button className="btn" onClick={handleDeleteSelected}><IoTrash className='icon3'/></button></th>
            
          </tr>
        </thead>
        
        <tbody>
        
          {imageData.map((data, index) => (
            <tr className= 'align-middle' key={index} onClick={() => showProductDetails(data)}>
              <td>{data.name}</td>
              <td>{data.precio}</td>
              <td>
                ${Number(data.precio) * Number(data.cantidad)}
               <div className="fixed"></div></td>
                <td>
                   <button className='btn' onClick={()=> handleIncreaseAmount(data)}><AiOutlinePlusCircle className='icon1'/></button>
                   <input className='inputg'
                   type='text'
                   value= {data.cantidad}
                   onChange={(e) => handleInputChanges(e,data)}>
                    </input>
                       <button className='btn' onClick={()=> handleDecreaseAmount(data)}><IoRemoveCircleOutline className='icon1'/></button>
                   <button className="btn" onClick={() => deleteProduct(data)}><IoTrash className='icon2'/></button>
                </td>  
              <td><input
                  type='checkbox'
                  checked={selectedProducts.has(data)}
                  onChange={() => handleSelectProduct(data)}
                />
              </td>
            </tr>
            
          ))}
 
        </tbody>
        
       

  
        </div>
        
      </table>
      <table>
        <div className='table table'>
      <thead className=' table1 table-dark alig-middle'>
          <tr>
            <th className='th' >Otros costos</th>
            <th className='th'>Iva</th>
            <th className='th'>Subtotal</th>
            <th className='th'>Total <BsCashCoin className= 'color'/> </th>
            <th className='th'>Total de articulos</th>
            <th className='th'></th>
            </tr>
            </thead>
            <tbody>
        
         <tr>
              <td>0</td>
              <td>${calcularMontoIVA()}</td>
              <td>${totalSubtotal.toFixed(2)}</td>
              <td>${(parseFloat(calcularMontoIVA()) + parseFloat(totalSubtotal)).toFixed(2)}</td>
              <td>{totalDeArticulos}</td>
            </tr>


      </tbody>
            </div>
      </table>
    </div>
    
  );
}
export default ImageTable;