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
          <Link className='mt-4 mb-8' to="/brands">  <button  className="inline-flex items-left px-4 py-3 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
      BACK
</button>
      </Link>
         
      </div>
      <h1 className="text-[30px] mb-[10px] mt-[-27px]">Create a Brand</h1>
      <form onSubmit={handleSubmit}>
        <label className="text-[20px] mb-[10px] mt-[-27px]">
           Name:
          <input
            className="w-4/3 p-2 rounded border border-gray-300"
            type="text"
            name="name"
            value={brandData.name}
            onChange={handleInputChange}
            placeholder='brand'
          />
        </label> 
        <div> 
           <button type="submit" class="mt-8 inline-flex items-left px-6 py-5 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">

CREATE 
</button>
        </div>
       
      </form>
    </div>

    );
  };
export default CreateBrand;

