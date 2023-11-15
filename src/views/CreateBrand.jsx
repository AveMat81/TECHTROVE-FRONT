import createBrands from '../redux/actions/createBrands'
import React, { useState } from "react";
import { useDispatch } from "react-redux";


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
        
        <h1>Create a Brand</h1>
        <form onSubmit={handleSubmit}>
          <label>
             Name:
            <input
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


  
//     return (
//       <div>
//         <div className="flex items-center justify-between w-full bg-black">
//       <Link to="/brand">
//         <button
//           type="button"
//           className="flex items-left justify-left px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-500 dark:bg-gray-900 hover:bg-gray-400 dark:text-gray-200 dark:border-gray-700"
//         >
//           <svg
//             className="w-5 h-5 rtl:rotate-180"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="4"
//             stroke="currentColor"
//           >
//             <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
//           </svg>
//         </button>
//       </Link>
//       <h1 className='flex-grow text-center'>  CREATE A BRAND</h1>
//     </div>
    
//         <li/>
//         <form onSubmit={handleSubmit}>
//           <label>
//             NAME:  
//             <input class="bg-gray-300 px-6 py-3"
//               type="text"
//               name="name"
//               value={brandData.name}
//               onChange={handleInputChange}
              
//             />
//           </label>
        
         
//         </form> <div><li/><li/>
        
//         <button type="submit" class="inline-flex items-left px-6 py-5 bg-black hover:bg-purple-700 text-white text-sm font-medium rounded-md">
// 	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="black">
// 	  	</svg>
// CREATE 
//   </button>
      
           
//         </div>
        
//       </div>
//     );
//   };
// export default CreateBrand;