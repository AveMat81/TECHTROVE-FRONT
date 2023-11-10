import React from 'react'
import deleteImage from '../../utils/images/Logo/DELTE.png'
import editImage from '../../utils/images/Logo/EDIT.png'
import {Link} from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios"
import notAvailibleImage from "../../utils/images/Logo/NotAvailible.png"

const DashborAdminCard = ({image, name, price, id, isAvailible, imageCloudinary}) => {


  const deleteProduct = () =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      
      
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/api/products/${id}`);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
          
        ).then(() => {
          window.location.reload(); // Recargar la página después de eliminar el producto
        });
      }
    })
  }

  return (
    <div>
      {isAvailible === false ? (
        <div>
          <img
              src={imageCloudinary ? imageCloudinary[0].url : image}
              alt="Imagen"
              className="relative w-auto h-auto object-cover"
            />
          <img src={notAvailibleImage} alt="not availible" className="relative w-30 h-12 relative pl-2 top-0"/>
            <div className="p-2">
                <h2 className="text-left text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">{name}</h2>
                <p className="justify-between flex text-blue-600 text-lg font-semibold font-jakarta-sans leading-[28px] tracking-normal text-[20px]">${price}</p>
              <div className="items-center mt-2">
                <Link to={`/edit/${id}`}>
                <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg">
                  <img src={editImage} alt="Icono 1" className="w-6 h-6 mr-1" />
                  <span className="mr-2 mt-2 mb-2">Edit</span>
                </div>
                </Link>
                <div></div>
              </div>
            </div>       
        </div>

      ) : (<div> 

            <img
              src={imageCloudinary ? imageCloudinary[0].url : image}
              alt="Imagen"
              className="relative w-auto h-auto object-cover"
            />
            <div className="p-2">
                <h2 className="text-left text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">{name}</h2>
                <p className="justify-between flex text-blue-600 text-lg font-semibold font-jakarta-sans leading-[28px] tracking-normal text-[20px]">${price}</p>
              <div className="flex justify-between items-center mt-2">
                <Link to={`/edit/${id}`}>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <img src={editImage} alt="Icono 1" className="w-6 h-6 mr-1" />
                  <span className="mr-2 mt-2 mb-2">Edit</span>
                </div>
                </Link>
                <div></div>
                <div className="flex items-center border-2 border-gray-300 rounded-lg" onClick={deleteProduct}>
                  <img src={deleteImage} alt="Icono 2" className="w-6 h-6 mx-1" />
                  <span className="mr-2 mt-2 mb-2">Delete</span>
                </div>
              </div>
            </div>

      </div>)}
    </div>
  )
}

export default DashborAdminCard