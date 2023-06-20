import { FaStar, FaRegStar } from 'react-icons/fa';

export const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div>
      {Array(totalStars)
        .fill()
        .map((_, index) => (
          <span key={index}>
            {index < filledStars ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
    </div>
  );
};