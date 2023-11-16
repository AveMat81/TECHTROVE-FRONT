


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import editBrand from '../redux/actions/editBrand';
import axios from "axios"
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


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
        const response = await axios.get(`${VITE_VERCEL_API_URL_BASE}/api/brands/${id}`);
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
    <div ><li/>
    <div className='inline-flex'>
        <Link to="/brands">  <button  className="inline-flex items-left px-1 py-3 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
<svg xmlns="http://www.w3.org/2000/svg" class="h-1 w-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">

</svg>
    BACK
</button>
    </Link>
       
    </div><li/><li/>
  <h1>EDIT BRAND</h1>
  <form onSubmit={handleSubmit}>
    <label>
      NAME:
      <input className='bg-gray-500 py-4 '
        type="text"
        name="name"
        value={brandData.name}
        onChange={handleInputChange}
        placeholder="brand"
      />
    </label><li/>
    {/* Agrega otros campos del formulario según sea necesario */}
   
    <button type="submit" className="inline-flex items-left px-1 py-3 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
<svg xmlns="http://www.w3.org/2000/svg" class="items-center h-6 w-9 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">

</svg>
    SAVE
</button>
  </form>
    </div>
  );
};

export default BrandEdit;



