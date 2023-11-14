
import { useDispatch } from "react-redux";
import { updateRating } from "../redux/slices/productSlice";

const ProductRatingComponent = ({ productId, currentRating }) => {
  const dispatch = useDispatch();
  const [newRating, setNewRating] = useState(currentRating);

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setNewRating(newRating);

  };

  const handleRatingSubmit = async () => {

    dispatch(updateRating(productId, newRating));
  };

  return (
    <div>
      <input type="number" value={currentRating} onChange={handleRatingChange} />
      <button onClick={handleRatingSubmit}>Actualizar Calificación</button>
    </div>
  );
};

export default ProductRatingComponent;
