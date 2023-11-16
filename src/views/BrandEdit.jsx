


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
    <div >
    <div className='inline-flex'>
        <Link to="/brands">  <button  className="inline-flex items-left px-4 py-3 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md mt-4 mb-4">
    BACK
</button>
<div className='mt-4'></div>
    </Link>
       
    </div>
  <h1 className="text-[30px] mb-[10px] mt-[-27px]">EDIT BRAND</h1>
  <form onSubmit={handleSubmit}>
    <label>
      NAME:
      <input className="w-4/3 p-2 rounded border border-gray-300"
        type="text"
        name="name"
        value={brandData.name}
        onChange={handleInputChange}
        placeholder="brand"
      />
    </label><div></div>
    {/* Agrega otros campos del formulario según sea necesario */}
   
    <button type="submit" className="mt-4 inline-flex items-left px-6 py-5 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
    SAVE
</button>
  </form>
    </div>

  );
};

export default BrandEdit;



