import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

export const RatingSelector = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
    onChange(value); // Llamada a la función de devolución de llamada con el valor de la puntuación
  };

  return (
    <div>
      <label className="form-post__label">Selecciona una puntuación:</label>
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className={value <= rating ? 'star active' : 'star'}
          onClick={() => handleStarClick(value)}
        />
      ))}
    </div>
  );
};
