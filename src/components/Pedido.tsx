import React, { useState } from 'react';

function Pedido() {
  const [pedido, setPedido] = useState({
    articulo: '',
    precio: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPedido((prevPedido) => ({
      ...prevPedido,
      [name]: name === 'precio' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del pedido, como almacenarlo en el estado de la aplicación o enviarlo a un servidor.
    console.log('Pedido:', pedido);
  };

  return (
    <div>
      <h1>Formulario de Pedido</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="articulo">Artículo:</label>
          <input
            type="text"
            id="articulo"
            name="articulo"
            value={pedido.articulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={pedido.precio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Realizar Pedido</button>
      </form>
    </div>
  );
}

export default Pedido;
