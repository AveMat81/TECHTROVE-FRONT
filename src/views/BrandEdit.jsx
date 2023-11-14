


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import editBrand from '../redux/actions/editBrand';


const BrandEdit = () => {
  const { id } = useParams(); // Obtén el ID de la marca de los parámetros de la URL
  const dispatch = useDispatch();

  const [brandData, setBrandData] = useState({
    name: "",
    // Otros campos de la marca
  });

  // Función para cargar los detalles de la marca cuando el componente se monta
  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/brands/${id}`);
        const brandDetails = response.data;
        setBrandData(brandDetails);
      } catch (error) {
        console.error("Error fetching brand details:", error);
      }
    };

    fetchBrandDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setBrandData({
      ...brandData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(editBrand(id, brandData));
      // Redirige a la página de detalles de la marca u otra ubicación después de la edición
    } catch (error) {
      console.error("Error editing brand:", error);
    }
  };

  return (
    <div>
      <h1>Edit Brand</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Brand Name:
          <input
            type="text"
            name="name"
            value={brandData.name}
            onChange={handleInputChange}
          />
        </label>
        {/* Agrega otros campos del formulario según sea necesario */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default BrandEdit;


// const BrandEdit = () => {
//   const brand = useSelector((state) => state.brands.brands);
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   // Estado local para los campos editables
//   const [editableFields, setEditableFields] = useState({
//     name: brand.name || '',
//     // Ajusta según los campos necesarios
//   });

//   useEffect(() => {
//     // Actualiza el estado local cuando cambia la marca en el estado global
//     setEditableFields({
//       name: brand.name || '',
//       // Actualiza otros campos según sea necesario
//     });
//   }, [brand]);

//   const handleFieldChange = (fieldName, value) => {
//     // Maneja cambios en los campos editables
//     setEditableFields({
//       ...editableFields,
//       [fieldName]: value,
//     });
//   };

//   const handleUpdateBrand = async(e) => {
    
//     // Envia la solicitud de actualización cuando el usuario hace clic en el botón de actualización
//    await axios.put(`http://localhost:3001/api/brands/edit/${e}`)
//  console.log("despues del handle");
//   };

 
//   return (
//     <div>
//       <h1>Edit Brand</h1>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={editableFields.name}
//           onChange={(e) => handleFieldChange('name', e.target.value)}
//         />
//       </label>
//       {/* Agrega más campos de edición aquí según tus necesidades */}
//       <button onClick={handleUpdateBrand}>Update Brand</button>
//     </div>
//   );
// };

// export default BrandEdit;
