import React, { useState } from 'react';

function Tablecap() {
  const [formDataArray, setFormDataArray] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '123-456-7890',
      direccion: '123 Calle Principal',
    },
    {
      id: 2,
      name: 'María Rodríguez',
      email: 'maria@example.com',
      phone: '987-654-3210',
      direccion: '456 Calle Secundaria',
    },
    {
      id: 3,
      name: 'Pedro Gómez',
      email: 'pedro@example.com',
      phone: '555-555-5555',
      direccion: '789 Calle Terciaria',
    },
  ]);

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    phone: '',
    direccion: '',
  });

  const [modalInsertar, setModalInsertar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [editData, setEditData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const ocultarModalInsertar = () => {
    setModalInsertar(false);
  };

  const mostrarModalEditar = (registro) => {
    setModalEditar(true);
    setEditData(registro);
  };

  const ocultarModalEditar = () => {
    setModalEditar(false);
    setEditData(null);
  };

  const insertar = () => {
    const nuevoRegistro = { ...credentials, id: formDataArray.length + 1 };
    setFormDataArray([...formDataArray, nuevoRegistro]);
    setModalInsertar(false);
    setCredentials({
      name: '',
      email: '',
      phone: '',
      direccion: '',
    });
  };

  const editar = () => {
    if (editData) {
      const newDataArray = formDataArray.map((registro) =>
        registro.id === editData.id ? { ...editData } : registro
      );
      setFormDataArray(newDataArray);
      setModalEditar(false);
      setEditData(null);
    }
  };

  const eliminar = (dato) => {
    const opcion = window.confirm("Realmente desea eliminar el registro " + dato.id);
    if (opcion) {
      const filteredData = formDataArray.filter((registro) => registro.id !== dato.id);
      setFormDataArray(filteredData);
    }
  };

  return (
    <div>
      <h1>Tabla de Empleados</h1>
      <button className="btn btn-success" onClick={mostrarModalInsertar}>
        Insertar nuevos datos
      </button>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {formDataArray.map((data) => (
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.direccion}</td>
              <td>
                <button className="btn btn-primary" onClick={() => mostrarModalEditar(data)}>
                  Editar
                </button>{" "}
                <button className="btn btn-danger" onClick={() => eliminar(data)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={modalInsertar ? 'modal' : 'modal d-none'}>
        {/* Modal for Insert */}
      </div>
      <div className={modalEditar ? 'modal' : 'modal d-none'}>
        {/* Modal for Edit */}
      </div>
    </div>
  );
}

export default Tablecap;
