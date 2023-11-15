import createBrands from '../redux/actions/createBrands'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const CreateBrand = () => {
    // Estado local para almacenar los datos del formulario
    const [brandData, setBrandData] = useState({
      name: "",
      // Otros campos de la marca
    });
  
    // Acceso al dispatch de Redux
    const dispatch = useDispatch();
  
    // Función para manejar cambios en el formulario
    const handleInputChange = (e) => {
      setBrandData({
        ...brandData,
        [e.target.name]: e.target.value,
      });
    };
  
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
       
        await dispatch(createBrands(brandData));
              setBrandData({
          name: "",
          // Restablecer otros campos si es necesario
        });
      } catch (error) {
        console.error("Error creating brand:", error);
      }
    };
  
    return (
      <div>
         <div className='inline-flex'>
            <Link to="/brands">  <button  className="inline-flex items-left px-1 py-3 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-1 w-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">
	  
	</svg>
        BACK
  </button>
        </Link>
           
        </div><li/>
        <h1>Create a Brand</h1><li/>
        <form onSubmit={handleSubmit}>
          <label>
             Name:
            <input className='bg-gray-600 h-8'
              type="text"
              name="name"
              value={brandData.name}
              onChange={handleInputChange}
              placeholder='brand'
            />
          </label> 
          <div> <li/><li/>
             <button type="submit" class="inline-flex items-left px-6 py-5 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">
	  	</svg>
CREATE 
  </button>
          </div>
         
        </form>
      </div>
    );
  };
export default CreateBrand;