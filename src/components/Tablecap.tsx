import React, { useState } from 'react';
import blog1 from './image/blog1.jpg'

function Tablecap() {
  const [table, setTable] = useState({
    id: '',
    name: '',
    folio: '',
    precio: '',
    cantidad: '',
  });

  const [formDataArray, setFormDataArray] = useState([]);
  const [datos, setDatos] = useState([]);
  const [credentials, setCredentials] = useState({
    name: '',
    folio: '',
    precio: '',
    cantidad: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTable({
      ...table,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (table.id === '' || table.name === '' || table.email === '' || table.phone === '' || table.direccion === '') {
      return;
    }

    const formData = { ...table };
    setFormDataArray([...formDataArray, formData]);
    setTable({
      id: '',
      name: '',
      folio: '',
      precio: '',
      cantidad: '',
    });
  };
 
  const [modalEditar, setModalEditar] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const agregarDato = () => {
    const nuevoDato = {
      id: datos.length + 1,
      name: `${datos.length + 1}`,
      folio: ` ${datos.length + 1}`,
      precio: ` ${datos.length + 1}`,
      cantidad: `${datos.length + 1}`,
    };

    setDatos([...datos, nuevoDato]);
  };



  const mostrarModalEditar = (registro) => {
    setModalEditar(true);
    setEditData(registro);
  };

  const ocultarModalEditar = () => {
    setModalEditar(false);
  };

  const editar = () => {
    if (editData) {
      const updatedDataArray = formDataArray.map((registro) =>
        registro.id === editData.id ? { ...editData } : registro
      );
      setFormDataArray(updatedDataArray);
      setModalEditar(false);
      setEditData(null);
    }
  };

  const eliminar = (id) => {
    var opcion = window.confirm("Realmente desea eliminar el registro " + id);
    if (opcion) {
      const filteredData = datos.filter((registro) => registro.id !== id);
      setDatos(filteredData);
    }
  };


  const saveData = () => {
    localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
  };

  return (
    <div>
      <h1>Datos de envíos realizados</h1>
      <img
        src={blog1}  // Ruta de la imagen (asegúrate de que la imagen esté en la carpeta pública)
        alt="coffe" // Texto alternativo de la imagen
        style={{ maxWidth: '300px' }} // Estilo de la imagen
      />
      <button className="btn btn-success" onClick={agregarDato}>
        Agregar
      </button>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            
            <th>Nombre</th>
            <th>Folio</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((data) => (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.direccion}</td>
              <td>
                <button className="btn btn-danger" onClick={() => eliminar(data.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={modalEditar ? 'modal' : 'modal d-none'}>
        <div className="modal-content">
          <h2>Editar Empleado</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editData ? editData.name : ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={editData ? editData.email : ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editData ? editData.phone : ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={editData ? editData.direccion : ''}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={editar}>
              Guardar Cambios
            </button>
            <button type="button" className="btn btn-danger" onClick={ocultarModalEditar}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Tablecap;
