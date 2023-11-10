import { React, useState, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "../components/Create/Create.module.css";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import axios from "axios"
import fetchProducts from "../redux/actions/getProducts";
import  fetchProductById  from '../redux/actions/fetchProductById';
import getIdUsers from "../redux/actions/idUsers";
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

import uploadImage from "../utils/images/Logo/UPLOAD.png"
import backIcon from "../utils/images/BasicIcons/backIcon.png"
import closeImage from "../utils/images/Logo/CLOSE.png"

export default function FormEditProduct() {
  const { id } = useParams();
  const productDetail = useSelector(state => state.detail.detail);
  const userId = useSelector(state=>state.idUser.idUsers);
  const dispatch = useDispatch();
  
//   const marca = useSelector((state) => state.marca);
  const navigate = useNavigate();

  const [file, setFile] = useState(null)
  const [categorias, setCategorias] = useState([])
  const productsNormales = useSelector((state) => state.products.products);

  const imageUrl = userId && userId.image && userId.image.url;
/////////////////////////////////////////////////////////////////////////
const [input, setInput] = useState({
  name: userId.name,
  image: userId.image,
  username: userId.username,
  address: userId.address,
  isAdmin: userId.isAdmin,
  isDisable: userId.isDisable,
});

  const [errorsDos, setErrorsDos] = useState({
    name:"",
    username: "",
    address: "",
    image:"",
    stock:"",
  })



    const validateDos = (state, name) =>{
      if(name === "name"){
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9\s]+$/;
  
        if(state.name === "") setErrorsDos({...errorsDos, name:"The name is required"})
        else if(state.name.length > 25) setErrorsDos({...errorsDos, name:"The name is very long"})
        else if(!regex.test(state.name)) setErrorsDos({...errorsDos, name:"The name must not contain characters other than letters"})
        else setErrorsDos({...errorsDos, name:""})
      }
      if(name === "username"){
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9\s]+$/;
  
        if(state.username === "") setErrorsDos({...errorsDos, username:"The username is required"})
        else if(state.username.length > 25) setErrorsDos({...errorsDos, username:"The username is very long"})
        else if(!regex.test(state.username)) setErrorsDos({...errorsDos, username:"The username must not contain characters other than letters"})
        else setErrorsDos({...errorsDos, username:""})
      }

      if(name === "address"){
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9\s]+$/;
  
        if(state.address === "") setErrorsDos({...errorsDos, address:"The address is required"})
        else if(state.address.length > 25) setErrorsDos({...errorsDos, address:"The address is very long"})
        else if(!regex.test(state.address)) setErrorsDos({...errorsDos, address:"The address must not contain characters other than letters"})
        else setErrorsDos({...errorsDos, address:""})
      }

      
      if(name === "image"){
        if(state.image !== null) setErrorsDos({...errorsDos, image:"The image is required"})
        else setErrorsDos({...errorsDos, image:""})
      }
  

    }
  

  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductById(id))
      dispatch(getIdUsers(id))
      await dispatch(fetchProducts());
    };

    fetchData();
  }, []);

  useEffect(() => {
    setInput({
      name: userId.name,
      image: userId.image,
      username: userId.username,
      address: userId.address,
      isAdmin: userId.isAdmin,
      isDisable: userId.isDisable,
    });
  }, [userId]);


  const category = (e) =>{
    setInput({
      ...input,
      category: e,
    });
  }

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setInput({
        ...input,
        [name]: checked,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }

    validateDos({...input,
      [name]: value,
    }, name)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        

        const formData = new FormData();
            formData.append('image', file);
            formData.append('name', input.name);
            formData.append('username', input.username);
            formData.append('address', input.address);
            formData.append('isAdmin', input.isAdmin);
            formData.append('isDisable', input.isDisable);

        await axios.put(`${VITE_VERCEL_API_URL_BASE}/api/users/update/${id}`, formData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto editado con exito!",
          showConfirmButton: false,
          timer: 2000,
        })
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingrese los valores correctos",
      });
    }
  };

  ///FUNCION NUEVA
  const [selectedImage, setSelectedImage] = useState(null);
  const [checkbox, setCheckbox] = useState(true)
  const [dobleeliminado, setDobleeliminado] = useState(false)
  const [radioCheck, setRadioCheck] = useState(true)
  const [checkboxDos, setCheckboxDos] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      
      setFile(file)
      const reader = new FileReader();
      reader.onload = (event) => {
        
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);

    }
    setErrorsDos({...errorsDos, image:""})
  };

  const eliminarImage = () =>{
    setSelectedImage(null)

    setDobleeliminado(false)
    setErrorsDos({...errorsDos, image:"La imagen es requerida"})
  }
  const buttonDisabled = () =>{
    let disabledAux = true
    for(let errore in errorsDos){
      if(errorsDos[errore] === "") disabledAux = false;
      else{
        disabledAux = true;
        break;
      }
    }
    return disabledAux;
  }

  const botonCheck = (event) =>{
    const valuor = event.target.checked
    setCheckbox(valuor)
    setCheckboxDos(valuor)

    // if(input.discount === 0){
    //   setCheckbox(false)
    // }

    if(valuor === true){
      setInput({
        ...input,
        isDisable: true,
      });
    }

    if(valuor === false){
      setInput({
        ...input,
        isDisable: false,
      });
    }
    validateDos({...input,
      discountCheck: valuor,
    }, "discountCheck")
  }

  const botonRadio = (opcion) =>{
    setInput({
      ...input,
      isAdmin: opcion,
    });
    setRadioCheck(opcion)
  }

  const categoriasUnicas = [...new Set(productsNormales.map(producto => producto.category))];

  const categoria = [
    { value: input.category, label: input.category },
  ];

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="mt-4 sm:mt-28">
        <div className={styles.card_create}>
          <img src={backIcon} alt="back" onClick={goBackHandler} className="w-8 h-8 top-28 absolute ml-2"/>
          <div className="mb-4">
            <h1 className="text-2xl sm:text-5xl font-semibold text-gray-900">
              Edit Users
            </h1>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div className="mb-2">
                  <div className="font-semibold text-left mb-2">Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errorsDos.name && (
                    <div className={styles.error}>{errorsDos.name}</div>
                  )}
                </div>

                <div className="mb-2">
                  <div className="font-semibold text-left mb-2">UserName:</div>
                  <input
                    type="text"
                    value={input.username}
                    name="username"
                    onChange={(e) => handleChange(e)}
                    placeholder="Price"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errorsDos.username && (
                    <div className={styles.error}>{errorsDos.username}</div>
                  )}
                </div>

                <div className="mb-2">
                  <div className="font-semibold text-left mb-2">Address:</div>
                  <input
                    type="text"
                    value={input.address}
                    name="address"
                    onChange={(e) => handleChange(e)}
                    placeholder="Price"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errorsDos.address && (
                    <div className={styles.error}>{errorsDos.address}</div>
                  )}
                </div>



                <div>
                <div className="font-semibold text-left mb-4">is Admin?</div>
                 <div className="flex items-center mb-2 mr-10">
                     <div className="mr-2 mb-2">
                       <input
                         checked={input.isAdmin === true ? true : false}
                         type="radio"
                         name="isAdmin"
                         onChange={() => botonRadio(true)}
                         value={true}
                         className="mr-1"
                       />
                     </div>
                       <div className="font-semibold text-left mb-2 mr-8">Yes</div>
                       <div className="mr-2 mb-2">
                       <input
                        checked={input.isAdmin === false ? true : false}
                         value={false}
                         type="radio"
                         name="available"
                         onChange={() => botonRadio(false)}
                         className="mr-1"
                       />
                     </div>
                       <div className="font-semibold text-left mb-2">No</div>
                      
                   </div>
                </div>


                <div>
                <div className="font-semibold text-left mb-4">is Disable?</div>
                 <div className="flex items-center mb-2 mr-10">
                     <div className="mr-2 mb-2">
                       <input
                         checked={input.isDisable === true ? true : false}
                         type="checkbox"
                         name="isDisable"
                         onChange={botonCheck}
                         value={true}
                         className="mr-1"
                       />
                     </div>
                       <div className="font-semibold text-left mb-2 mr-8">Yes</div>
                   </div>
                </div>


                <div className="flex items-center mb-2 mt-2 font-semibold">Image:
                  
                  <div className="flex items-center mb-4">
                  </div>
                </div> 

      {selectedImage ? (
        <div className="flex justify-between px-0 md:px-8 lg:px-12 xl:px-16" >
        <img
          src={selectedImage}
          alt="Uploaded Image"
          className="w-40 h-40 object-contain absolute" 
        />
        <img onClick={eliminarImage} src={closeImage} alt="close" className="w-6 h-6 relative top-0 left-0" />
        {/* <button onClick={eliminarImage}>x</button> */}
        
          <label htmlFor="image-upload" className="cursor-pointer ">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg flex-col cursor-pointer">
              {/* <span className="text-3xl">+</span> */}
              <img src={uploadImage} alt="upload" className="w-16 h-16 object-contain" />
              <div className="mt-2 font-semibold text-gray-400">Upload</div>
            </div>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            name="image"
          />
        </div>

      ) : (
        <div className="flex justify-between px-0 md:px-8 lg:px-12 xl:px-16" >
        <img
          src={imageUrl ? imageUrl : input.image}
          alt="Uploaded Image"
          className="w-40 h-40 object-contain" 
        />
        
          <label htmlFor="image-upload" className="cursor-pointer ">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg flex-col cursor-pointer">
              {/* <span className="text-3xl">+</span> */}
              <img src={uploadImage} alt="upload" className="w-16 h-16 object-contain" />
              <div className="mt-2 font-semibold text-gray-400">Upload</div>
            </div>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            name="image"
          />
          
        </div>

      )}
      {errorsDos.image && (
            <div className={styles.error}>{errorsDos.image}</div>
          )}
            
                <button
                  id="bt"
                  className={styles.button}
                  disabled={buttonDisabled()}
                  onClick={(e) => handleSubmit(e)}
                  // disabled={Object.keys(errors).length > 0}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
}
