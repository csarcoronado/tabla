import React, { useState } from 'react';

export const ImageUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {selectedImage ? (
        <div>
          <img src={selectedImage} alt="Imagen seleccionada" style={{ maxWidth: '300px' }} />
          <p>Contenido de la imagen:</p>
          <pre>{selectedImage}</pre>
        </div>
      ) : (
        <p>Selecciona una imagen</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
