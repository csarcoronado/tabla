import React, { useState } from 'react';
import './estilos.css'

function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos del usuario, por ejemplo, enviarlos a un servidor o almacenarlos en el estado de la aplicación.
    console.log('Datos del usuario:', usuario);
  };

  return (
    <div className='container'>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className='container1'>
          <label htmlFor="nombre">Nombre:</label>
          <input
            className='input'
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
        </div>
        <div className='container1'>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            className='input'
            type="tel"
            id="telefono"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
          />
        </div>
        <div className='container1'>
          <label htmlFor="correo">Correo:</label>
          <input
            className='input'
            type="email"
            id="correo"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
          />
        </div>
        <div className='container1'>
          <label htmlFor="direccion">Dirección:</label>
          <input
            className='input'
            type="text"
            id="direccion"
            name="direccion"
            value={usuario.direccion}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Registro;
