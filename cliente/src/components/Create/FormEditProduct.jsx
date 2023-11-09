import { React, useState, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "./Create.module.css";
import Select from "react-select";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import axios from "axios"
import uploadImage from "../../utils/images/Logo/UPLOAD.png"
import fetchProducts from "../../redux/actions/getProducts";
import closeImage from "../../utils/images/Logo/CLOSE.png"
import  fetchProductById  from '../../redux/actions/fetchProductById';
import backIcon from "../../utils/images/BasicIcons/backIcon.png"

export default function FormEditProduct() {
  const { id } = useParams();
  const productDetail = useSelector(state => state.detail.detail);
  const dispatch = useDispatch();
//   const marca = useSelector((state) => state.marca);
  const navigate = useNavigate();
  console.log(productDetail)

  const [file, setFile] = useState(null)
  const [categorias, setCategorias] = useState([])
  const productsNormales = useSelector((state) => state.products.products);

  const imageUrl = productDetail && productDetail.image && productDetail.image.url;
/////////////////////////////////////////////////////////////////////////
const [input, setInput] = useState({
  name: productDetail.name,
  description: productDetail.description,
  image: productDetail.image,
  isAvailible: productDetail.isAvailible,
  price: productDetail.price,
  stock: productDetail.stock,
  category: productDetail.category,
  discount: productDetail.discount,
});

////////////////////////////////////////////////////

  // const [input, setInput] = useState({
  //   name: productDetail.name,
  //   description: productDetail.description,
  //   image: null,
  //   isAvailable: productDetail.isAvailable,
  //   price: productDetail.price,
  //   stock: productDetail.stock,
  //   category: productDetail.category,
  //   discount: productDetail.discount,
  //   // marca: [], //falta realacion / modelo
  // });
  const [errorsDos, setErrorsDos] = useState({
    name:"",
    difficulty: "",
    duration: "",
    season: "",
    countries:"",
    stock:"",
  })

  const validateDos = (state, name) =>{
    if(name === "name"){
      const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9\s]+$/;

      if(state.name === "") setErrorsDos({...errorsDos, name:"El nombre es requerido"})
      else if(state.name.length > 25) setErrorsDos({...errorsDos, name:"El nombre es muy largo"})
      else if(!regex.test(state.name)) setErrorsDos({...errorsDos, name:"El nombre no debe contener otro caracter que no sea letras"})
      else setErrorsDos({...errorsDos, name:""})
    }
    if(name === "price"){
      const price = parseFloat(state.price);

      if (isNaN(price)) {
        setErrorsDos({ ...errorsDos, price: "Por favor ingrese un precio" });
      } else if (price < 0) {
        setErrorsDos({ ...errorsDos, price: "Por favor ingrese un número positivo" });
      } else if (!/^\d+(\.\d{1,2})?$/.test(state.price)) {
        setErrorsDos({ ...errorsDos, price: "El número debe ser un decimal con dos digitos" });
      } else if (price > 99999) {
        setErrorsDos({ ...errorsDos, price: "Por favor ingrese un precio valido" });
      } else {
        setErrorsDos({ ...errorsDos, price: "" });
      }
    }
    if(name === "stock"){
      const entero = parseInt(state.stock)
      const expre = /^[0-9]+$/;
      if(entero > 9999){
        setErrorsDos({...errorsDos, stock:"Porfavor ingrese un stock menor"})
      }else if(state.stock < 0){setErrorsDos({...errorsDos, stock:"Porfavor ingrese un numero posittivo"})}
      else if (!/^\d+$/.test(state.stock )) {
        // La entrada es un número entero válido.
        setErrorsDos({ ...errorsDos, stock: "Porfavor ingrese un stack valido" });
      } 
      //else if(state.stock === 0){setErrorsDos({...errorsDos, stock:"Porfavor ingrese el numero de stock"})}
      //else if(isNaN(parseInt(entero))) setErrorsDos({...errorsDos, stock:"Porfavor ingrese un numero valido"})
      else if(isNaN(parseInt(state.stock))) setErrorsDos({...errorsDos, stock:"Porfavor ingrese un numero valido"})
      else if(!expre.test(entero)) setErrorsDos({...errorsDos, stock:"Porfavor ingrese un numero"})
      else if(/^\d+$/.test())setErrorsDos({...errorsDos, stock:"Porfavor ingrese un numero entero"})
      else setErrorsDos({...errorsDos, stock:""})
    }
    
    if(name === "description"){
      const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9\s.,]+$/;

      if(state.description === "") setErrorsDos({...errorsDos, description:"La descripcion es requerida"})
      else if(state.description.length > 200) setErrorsDos({...errorsDos, description:"La descripcion es muy larga"})
      else if(!regex.test(state.description)) setErrorsDos({...errorsDos, description:"La descripcion no debe contener caracteres raros"})
      else setErrorsDos({...errorsDos, description:""})
    }
    if(name === "image"){
      //console.log("soy imagen" ,state.image)
      if(state.image !== null) setErrorsDos({...errorsDos, image:"La imagen es requerida"})
      else setErrorsDos({...errorsDos, image:""})
    }
    if(name === "discountCheck"){
      if(state.discountCheck === false){setErrorsDos({...errorsDos, discount:""})}
    }
    if(name === "discount"){
      const entero = parseInt(state.discount)
      const expre = /^[0-9]+$/;
      if(entero > 100){
        setErrorsDos({...errorsDos, discount:"Porfavor ingrese un descuento valido (menor a 100)"})
      }else if(state.discount < 0){setErrorsDos({...errorsDos, discount:"Porfavor ingrese un numero posittivo"})}
      else if(isNaN(parseInt(state.discount))) setErrorsDos({...errorsDos, discount:"Porfavor ingrese una descuento valido"})
      else if(!expre.test(state.discount)) setErrorsDos({...errorsDos, discount:"Porfavor ingrese un descuento"})
      else setErrorsDos({...errorsDos, discount:""})
    }
    
  }
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductById(id))
      await dispatch(fetchProducts());
    };

    fetchData();
  }, []);

  useEffect(() => {
    setInput({
      name: productDetail.name,
      description: productDetail.description,
      image: productDetail.image,
      isAvailible: productDetail.isAvailible,
      price: productDetail.price,
      stock: productDetail.stock,
      category: productDetail.category,
      discount: productDetail.discount,
    });
  }, [productDetail]);

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

  function handleCategoryChange(selectedMarca) {
    setInput({
      ...input,
      marca: selectedMarca.map((c) => c.value),
    });
  }

  async function handlePhotoChange(event) {
    const files = event.target.files[0];
    setFile(files);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleImageDelete(index) {
    const updatedImages = [...input.image];
    updatedImages.splice(index, 1);
    setInput({ ...input, image: updatedImages });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        //console.log(input)

        const formData = new FormData();
            // formData.append('image', file);
            for (const file of selectedImage) {
              formData.append('image', file);
            }    
            formData.append('name', input.name);
            formData.append('isAvailible', input.isAvailible);
            formData.append('description', input.description);
            formData.append('price', input.price);
            formData.append('stock', input.stock);
            formData.append('category', input.category);
            formData.append('discount', input.discount);

        await axios.put(`http://localhost:3001/api/products/update/${id}`, formData);
        //dispatch(addProduct(input));
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
  const [selectedImage, setSelectedImage] = useState([]);
  const [checkbox, setCheckbox] = useState(true)
  const [dobleeliminado, setDobleeliminado] = useState(false)
  const [radioCheck, setRadioCheck] = useState(true)
  const [checkboxDos, setCheckboxDos] = useState(false)

  console.log(selectedImage,"ooooooooooooooooooo")

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = []; 
    //console.log(newImages, "soy fileees")
    setFile(files)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        newImages.push(event.target.result);

        // Verifica si se han cargado todas las imágenes antes de actualizar el estado.
        if (newImages.length === files.length) {
          setSelectedImage([...selectedImage, ...newImages]);
        }
      };

      reader.readAsDataURL(file);
    }

    setErrorsDos({...errorsDos, image:""})
  };

  const eliminarImage = (index) =>{
    const newImages = [...selectedImage];
    newImages.splice(index, 1);
    setSelectedImage(newImages);

    setDobleeliminado(false)

    if(selectedImage.length <= 1){
      setErrorsDos({...errorsDos, image:"La imagen es requerida"})

    }
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
        discount: productDetail.discount === 0 ? "" : productDetail.discount,
      });
    }

    if(valuor === false){
      setInput({
        ...input,
        discount: 0,
      });
    }
    validateDos({...input,
      discountCheck: valuor,
    }, "discountCheck")
  }

  const botonRadio = (opcion) =>{
    setInput({
      ...input,
      isAvailible: opcion,
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
              Edit Product
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
                  <div className="font-semibold text-left mb-2">Price:</div>
                  <input
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleChange(e)}
                    placeholder="Price"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errorsDos.price && (
                    <div className={styles.error}>{errorsDos.price}</div>
                  )}
                </div>

        <div className="mb-2">
                  <div className="font-semibold text-left mb-2 mt-2">Category:</div>
                  <Select
                    name="category"
                    options={categoriasUnicas.map((p) =>({
                      value: p,
                      label: p,
                    }))}
                    isMulti={false}
                    onChange={(selectedOption) => {
                      const categoriaSeleccionada = selectedOption.value;
                      category(categoriaSeleccionada)
                    }}
                    value={categoria}
                  />
                  {errors.marca && (
                    <div className={styles.error}>{errors.marca}</div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="font-semibold text-left mb-2">Stock:</div>
                  <input
                    type="number"
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleChange(e)}
                    placeholder="Stock"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errorsDos.stock && (
                    <div className={styles.error}>{errorsDos.stock}</div>
                  )}
                </div>

                <div>
                <div className="flex items-center mb-2 mr-10">
                    <div className="mr-2 mb-2">
                      <input
                        type="checkbox"
                        name="available"
                        onChange={botonCheck}
                        className="mr-1"
                        checked={input.discount === 0 ? checkboxDos : checkbox}
                      />
                    </div>
                    {input.discount > 0 ? <div className="font-semibold text-left mb-2">
                        Discount</div> :
                    checkboxDos === false ? <div className="font-semibold text-gray-400 text-left mb-2">
                        Discount <span className="text-red-300">(Optional)</span>
                      </div> : checkbox === true ? <div className="font-semibold text-left mb-2">
                        Discount</div> : <div className="font-semibold text-gray-400 text-left mb-2">
                        Discount <span className="text-red-300">(Optional)</span>
                      </div>}
                      
                  </div>  
                  <input
                    type="number"
                    value={input.discount}
                    name="discount"
                    onChange={(e) => handleChange(e)}
                    placeholder="Discount"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                    disabled={checkboxDos === true ? false : input.discount === 0 ? true : input.discount > 0 ? false : checkbox === false ? true : false}
                  />
                  {errorsDos.discount && (
                    <div className={styles.error}>{errorsDos.discount}</div>
                  )}

  
                </div>


              </div>


              

              <div className={styles.der}>
                <div className="mb-2">
                  <div className="font-semibold text-left mb-2">Description:</div>
                  <textarea
                    name="description"
                    style={{ resize: "none", height: "150px" }}
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded-lg border border-gray-200 focus:border-blue-300 p-4 text-[12px] "
                  />
                  {errorsDos.description && (
                    <div className={styles.error}>{errorsDos.description}</div>
                  )}
                </div>

                {!productDetail.isAvailible && (

                  <div>
                <div className="font-semibold text-left mb-4">is Availible?</div>
                 <div className="flex items-center mb-2 mr-10">
                     <div className="mr-2 mb-2">
                       <input
                         checked={input.isAvailible === true ? true : false}
                         type="radio"
                         name="available"
                         onChange={() => botonRadio(true)}
                         value={true}
                         className="mr-1"
                       />
                     </div>
                       <div className="font-semibold text-left mb-2 mr-8">Yes</div>
                       <div className="mr-2 mb-2">
                       <input
                        checked={input.isAvailible === false ? true : false}
                         value={false}
                         type="radio"
                         name="available"
                         onChange={() => botonRadio(false)}
                         className="mr-1"
                       />
                     </div>
                       <div className="font-semibold text-left mb-2">No</div>
                      
                   </div>
                </div>  )}

                <div className="flex items-center mb-2 mt-2 font-semibold">Image:
                  
                  <div className="flex items-center mb-4">
                  </div>
                </div> 

      {selectedImage.length > 0 ? (
        <div className="grid grid-cols-2 gap-2" >
         {selectedImage.map((image, index) => (
        <div className="relative">
        <img key={index} src={image} alt={`Image ${index}`} className="w-40 h-40 object-contain" />
        <img onClick={() => eliminarImage(index)} src={closeImage} alt="close" className="w-6 h-6 absolute top-0 left-0" />
        </div>
      ))}
        {/* <button onClick={eliminarImage}>x</button> */}
        
          <label htmlFor="image-upload" className="cursor-pointer ">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg flex-col cursor-pointer">
              {/* <span className="text-3xl">+</span> */}
              <img src={uploadImage} alt="upload" className="w-16 h-16 object-contain" />
              <div className="mt-2 font-semibold text-gray-400">Upload</div>
            </div>
          </label>
          <input
            multiple
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            name="image"
          />
        </div>

      ) : (
        <div className="grid grid-cols-2 gap-2" >
        {/* <img
          src={imageUrl ? imageUrl : input.image}
          alt="Uploaded Image"
          className="w-40 h-40 object-contain" 
        /> */}
        {productDetail.imageCloudinary ? productDetail.imageCloudinary.map((image, index) =>(
          <div>
          <img key={index} src={image.url} alt={`Image ${index}`} className="w-40 h-40 object-contain" />
          </div>
        )) : <img
        src={input.image}
        alt="Uploaded Image"
        className="w-40 h-40 object-contain" 
      />}
        
          <label htmlFor="image-upload" className="cursor-pointer ">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg flex-col cursor-pointer">
              {/* <span className="text-3xl">+</span> */}
              <img src={uploadImage} alt="upload" className="w-16 h-16 object-contain" />
              <div className="mt-2 font-semibold text-gray-400">Upload</div>
            </div>
          </label>
          <input
            multiple
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