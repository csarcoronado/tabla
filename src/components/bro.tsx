import { useState } from 'react';
import blog1 from './image/blog1.jpg';
import { BorraIma } from '../interface/interfaceTabla';
import './estilos.css'

function ImageTable() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState<BorraIma[]>([]);
  const [originalData, setOriginalData] = useState<BorraIma[]>([]);
  const [formData, setFormData] = useState<BorraIma>({name:'', description:'', precio: '', folio: ''});
  const [searchText, setSearchText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<BorraIma>({name:'', description:'', precio: '', folio: ''});

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
    if (formData.name && formData.description && formData.folio && formData.precio) {
      const newData = { ...formData };
      setImageData([...imageData, newData]);
      setOriginalData([...originalData, newData]);
      setFormData({
        name: '',
        description: '',
        precio: '',
        folio: '',
      });
    }
  };

  const handleSearch = () => {
    // Filtrar los datos según el texto de búsqueda
    const filteredData = imageData.filter((data) => {
      const searchTerms = [data.name, data.description, data.folio, data.precio].join(' ').toLowerCase();
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

  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const deleteProduct = (product) => {
    var opcion = window.confirm("Realmente quieres eliminar el producto");
    if(opcion){
    const updatedData = imageData.filter((item) => item !== product);
    setImageData(updatedData);
    setOriginalData(updatedData);
    setSelectedProduct(null);
  }
};
  const deleteProductDetails = (product) => {
    var opcion = window.confirm("Ya no ocupas ver los detalles del producto " );
    if(opcion){
    setSelectedProduct(null);
    }
};

  return (
    <div className='container'>
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
          placeholder='¿Que nombre le quieres poner al producto?'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="description">Descripcion:</label>
        <input
          className='input'
          placeholder='¿Que ingredientes lleva el producto?'
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="precio">Precio:</label>
        <input
          className='input'
          placeholder='¿Cuanto costara tu producto?'
          type="text"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="folio">Folio:</label>
        <input
          className='input'
          placeholder='¿Que folio le pondras para buscarlo?'
          type="text"
          id="folio"
          name="folio"
          value={formData.folio}
          onChange={handleInputChange}
        />
      </div>
      <button className= "button" onClick={addData}>Agregar Datos</button>

      <div>
        <label htmlFor="searchText">Buscar Producto:</label>
        <input
          type="text"
          id="searchText"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="button1" onClick={handleSearch}>Buscar</button>
        <button className="button2" onClick={resetSearch}>Restablecer Búsqueda</button>
      </div>
      
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {imageData.map((data, index) => (
            <tr key={index} onClick={() => showProductDetails(data)}>
              <td>
                <img
                  src={blog1}
                  alt="coffe"
                  style={{ maxWidth: '50px', cursor: 'pointer' }}
                />
              </td>
                <td>{data.name}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteProduct(data)}>Eliminar</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div>
          <h2>Detalles del Producto</h2>
          <p>Descripción: {selectedProduct.description}</p>
          <p>Precio: {selectedProduct.precio}</p>
          <p>Folio: {selectedProduct.folio}</p>
          <td>
                <button className="btn btn-danger" onClick={() => deleteProductDetails(selectedProduct)}>Eliminar</button>
              </td>

        </div>
      )}
    </div>
  );
}

export default ImageTable;
{selectedProduct && (
  <div className='containerc'>
  <div>
    <h2>Detalles del Producto</h2>
    <p>Descripción: {selectedProduct.description}</p>
    <p>Precio: {selectedProduct.precio}</p>
    <p>Folio: {selectedProduct.folio}</p>
    <td>
          <button className="buttone" onClick={() => deleteProduct(selectedProduct)}>Eliminar el producto</button>
        </td>
        <td>
          <button className="buttond" onClick={() => deleteProductDetails(selectedProduct)}>Cerrar los Detalles</button>
        </td>

  </div>
  </div>
)}
 {deletedProduct && (
  <div>
    <h2>Producto eliminado</h2>
    <p>{deletedProduct.name}</p>
    <button className="buttond" onClick={undoDelete}>recolocarlo</button>{(' ')}
    <button className="buttone" onClick={() => deleteProduct(selectedProduct)}>Eliminarlo definitivamente</button>
  </div>
)}

import { useState } from 'react';
import blog1 from './image/blog1.jpg';
import { BorraIma } from '../interface/interfaceTabla';
import './estilos.css'
import { useRef } from 'react';
import {IoEllipsisHorizontalCircle, IoEllipsisVerticalCircle , IoAddCircleSharp, IoRemoveCircleSharp, IoRefreshCircleSharp, IoSearchOutline, IoReorderThreeOutline, IoTrash} from 'react-icons/io5';


function ImageTable() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState<BorraIma[]>([]);
  const [originalData, setOriginalData] = useState<BorraIma[]>([]);
  const [formData, setFormData] = useState<BorraIma>({name:'', description:'', precio: '', folio: '', cantidad: ''});
  const [searchText, setSearchText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<BorraIma | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedAmount, setEditedAmount] = useState<string>('');
  const [sortedDataByCantidad, setSortedDataByCantidad] = useState<BorraIma[]>([]);
  const [sortedDataCantidada, setSortedDataCantidada] = useState<BorraIma[]>([]);
  const [deletedProduct, setDeletedProduct] = useState<BorraIma | null>(null);
  const [showSecondaryButtons, setShowSecondaryButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
   const fetchMoreData = () => {
    // Simula la carga de más datos
    setIsLoading(true);
    setTimeout(() => {
      const newData = [...imageData];
      for (let i = 0; i < 10; i++) {
        newData.push({
          name: `Producto ${newData.length + 1}`,
          description: `Descripción del Producto ${newData.length + 1}`,
          precio: `$${(Math.random() * 100).toFixed(2)}`,
          folio: `Folio-${newData.length + 1}`,
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
    if (formData.name && formData.description && formData.folio && formData.precio) {
      const newData = { ...formData };
      setImageData([...imageData, newData]);
      setOriginalData([...originalData, newData]);
      setFormData({
        name: '',
        description: '',
        precio: '',
        folio: '',
        cantidad: '',
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtrar los datos según el texto de búsqueda
    const filteredData = imageData.filter((data) => {
      const searchTerms = [data.name, data.description, data.folio, data.cantidad, data.precio].join(' ').toLowerCase();
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


  const showProductDetails = (product: BorraIma) => {
    setSelectedProduct(product);
  };

  const deleteProduct = (product) => {
    var opcion = window.confirm("Realmente quieres eliminar el producto");
    if (opcion) {
      // Mover el producto eliminado a los datos eliminados
      setDeletedProduct(product);
  
      const updatedData = imageData.filter((item) => item !== product);
      setImageData(updatedData);
      setOriginalData(updatedData);
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

  const deleteProductDetails = (product) => {
    var opcion = window.confirm("Ya no ocupas ver los detalles del producto " );
    if(opcion){
    setSelectedProduct(null);
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
          placeholder='¿Que nombre le quieres poner al producto?'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="description">Descripcion:</label>
        <input
          className='input'
          placeholder='Describe el producto'
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="precio">Precio:</label>
        <input
          className='input'
          placeholder='¿Cuanto costara tu producto?'
          type="text"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="folio">Folio:</label>
        <input
          className='input'
          placeholder='¿Que folio le pondras para buscarlo?'
          type="text"
          id="folio"
          name="folio"
          value={formData.folio}
          onChange={handleInputChange}
        />
      </div>
      <div className='container1'>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          className='input'
          placeholder='¿Cuantas unidades quieres vender?'
          type="number"
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
        <button className="buttonca" onClick={resetSearch}>Restablecer Búsqueda</button>
      </form>{' '}
      </div>{' '}
     <div className='table' >
      <table className="container table table-dark table-sm ">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Folio</th>
            <th>Cantidad {' '}
            <button className="buttonca" onClick={toggleSecondaryButtons}>
                <IoEllipsisHorizontalCircle/>
              </button>
              {showSecondaryButtons && (
                <span>
            <button className='buttonca' onClick={sortDataByCantidad}> <IoAddCircleSharp/></button>{' '}
            <button className='buttonca' onClick={sortDataByCantidada}><IoRemoveCircleSharp/></button>{' '}
            <button className="buttonca" onClick={resetData}><IoRefreshCircleSharp/></button>
            </span>
              )}
            </th>
          </tr>
        </thead>
        
        <tbody>
        
          {imageData.map((data, index) => (
            <tr key={index} onClick={() => showProductDetails(data)}>
              <td>
                <img
                  src={blog1}
                  alt="coffe"
                  style={{ maxWidth: '50px', cursor: 'pointer' }}
                />
              </td>
                <td>{data.name}</td>
                <td>{data.description}</td>
              <td>{data.precio}</td>
              <td>{data.folio}</td>  
                <td>
                 
                    {isEditing && selectedProduct === data ? (
                  <div>
                    <input className='inputg'
                      type="text"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                    />
                    <button className="buttong" onClick={() => handleSave(data)}>
                      Guardar
                    </button>
                  </div>
                    ) : (
                  <div></div>
                    )}{' '}
                   <button className='buttonca' onClick={()=> handleIncreaseAmount(data)}><IoAddCircleSharp/></button>{' '}
                   {isEditing ? null : (
                  
                   <button className='buttoncas' onClick={() => handleEdit(data)}>
                    {data.cantidad}
                    </button>
                  
                     )}{' '}
                       <button className='buttonca' onClick={()=> handleDecreaseAmount(data)}><IoRemoveCircleSharp/></button>
                       {' '}
                   <button className="buttone" onClick={() => deleteProduct(selectedProduct)}><IoTrash/></button>
   
              </td>
              
            </tr>
          ))}
         
        </tbody>
      </table>
      </div>
      
 
    </div>
  );
}

export default ImageTable;