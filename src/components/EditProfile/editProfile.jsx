
import { Link } from "react-router-dom";
import Back from "../../utils/images/BasicIcons/backIcon.png";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

import axios from "axios";
//groso
export default function EditProfile() {
  const currentUser = useSelector(state => state.user); // Importa el usuario actual desde el estado de Redux
  const dispatch = useDispatch();
  // Define un estado local para los campos de edición de perfil
  const [profileData, setProfileData] = useState({
    username: currentUser.user.username,
    name: currentUser.user.name,
    profileImage: currentUser.user.profileImage,
  });


  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [initialProfileData, setInitialProfileData] = useState({}); // Estado para almacenar los datos iniciales del perfil

  const [errors, setErrors] = useState({
    username: "",
    name: "",
    address: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  // Función para validar los campos del perfil
  const validateProfile = (data, name) => {
    // Implementa la lógica de validación aquí
    const errorsCopy = { ...errors };

    if (name === "username") {
        const nicknameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!nicknameRegex.test(data.username)) {
        errorsCopy.username = "El nickname debe contener solo letras, números y guiones bajos (_). Debe tener entre 3 y 20 caracteres.";
        } else {
        errorsCopy.username = "";
        }
    }

    if (name === "name") {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        if (!nameRegex.test(data.name)) {
        errorsCopy.name = "El nombre debe contener solo letras y espacios. Debe tener entre 2 y 50 caracteres.";
        } else {
        errorsCopy.name = "";
        }
    }

    if (name === "password") {
        // Establece tus propias reglas de validación para la contraseña
        // Por ejemplo, una contraseña segura podría requerir al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(data.password)) {
        errorsCopy.password = "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
        } else {
        errorsCopy.password = "";
        }
    }

    if (name === "confirmPassword") {
        if (data.confirmPassword !== data.password) {
        errorsCopy.confirmPassword = "Las contraseñas no coinciden.";
        } else {
        errorsCopy.confirmPassword = "";
        }
    }

    setErrors(errorsCopy);
  };

  useEffect(() => {
    // Al cargar el componente, copia los datos iniciales del usuario en el estado local
    setInitialProfileData({
      username: currentUser.user.username,
      name: currentUser.user.name,
      profileImage: currentUser.user.profileImage, // También puedes inicializarlo con null u otro valor predeterminado
    });
  }, []);

  useEffect(() => {
    // Carga los datos del usuario actual al inicio del componente
    // Cuando cambien los datos iniciales, actualiza el estado local de edición
    setProfileData({
        ...initialProfileData,
        profileImage: null, // Restablece la imagen si se ha cambiado
      });
    }, [initialProfileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
    validateProfile({ ...profileData, [name]: value }, name);
  };

  const handleImageChange = (e) => {
    // Maneja la selección de una nueva imagen de perfil
    const file = e.target.files[0];

    if (file) {
      
      setFile(file)
      const reader = new FileReader();
      reader.onload = (event) => {
        
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);

    }
    // setErrorsDos({...errorsDos, image:""})
    
    // setProfileData({
    //     ...profileData,
    //     profileImage: e.target.files[0],
    //   });
    };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
        // Realiza la lógica de actualización del perfil aquí, utilizando Axios o la biblioteca que prefieras
        try {
            const formData = new FormData();
                formData.append('image', file);
                formData.append('name', profileData.name);
                formData.append('username', profileData.username);
                formData.append('address', profileData.address);
          
            // Enviar una solicitud al servidor para actualizar el perfil
          await axios.put(`${VITE_VERCEL_API_URL_BASE}/api/users/update/${currentUser.user.id}`, formData);
          
          toast.success("User edit successful");

        } catch (error) {
          // Manejar errores en la actualización del perfil
          console.error("Error en la actualización del perfil:", error);
          // Mostrar un mensaje de error
            toast.success("Error when editing  user");
        }
    
  };

  console.log(profileData);

  return (
    <div>
        <div>
            <Link to={"/Account"}>
                <img src={Back} className="w-[30px] h-[30px]" alt="Back" />
            </Link>
            <h1>Edit Profile</h1>
        </div>
            
      <form>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            className="w-full md:w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            onChange={handleInputChange}
          />
          {errors.username && <div className="text-red-500 text-xs mt-1">{errors.username}</div>}
        </div>
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Address:
            </label>
            <input
                className="w-full md:w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="address"
                onChange={handleInputChange}
            />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:<p value={profileData.name}></p>
          </label>
          <input
            className="w-full md:w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="w-full md:w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password:</label>
          <input
            className="w-full md:w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="confirmPassword"
            value={profileData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            className="w-full md:w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.profileImage && <div>{errors.profileImage}</div>}
        </div>
        <button onClick={handleUpdateProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update Profile</button>
      </form>
    </div>
  );
}