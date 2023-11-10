import { React, useState, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css";
import Select from "react-select";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import axios from "axios"
import uploadImage from "../../utils/images/Logo/UPLOAD.png"
import fetchProducts from "../../redux/actions/getProducts";
import closeImage from "../../utils/images/Logo/CLOSE.png"
import backIcon from "../../utils/images/BasicIcons/backIcon.png"
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

function validate(input) {
  const errors = {};
  if (!input.name || input.name.length < 2 || input.name.length > 25) {
    errors.name = "The name must be between 2 and 25 characters";
  }
  if (
    isNaN(input.price) ||
    input.price <= 0 ||
    input.price.toString().length > 256
  ) {
    errors.price = "Price must be a valid number greater than 0";
  }
  if (
    isNaN(input.stock) ||
    input.stock <= 0 ||
    input.price.toString().length > 256
  ) {
    errors.stock = "Stock must be a valid number greater than or equal to 0";
  }
  if (input.description.length > 256) {
    errors.description = "Description must not exceed 256 characters";
  }
  // if (input.image.length > 5 || input.image.length < 1) {
  //   errors.image = "Puedes seleccionar un máximo de 5 imágenes y un mínimo de 1";
  // }
  // if (input.marca.length === 0) {
  //   errors.marca = "Debes seleccionar al menos una marca";
  // }

  return errors;
}


export default function FormCreateProduct() {
  
  const dispatch = useDispatch();
//   const marca = useSelector((state) => state.marca);
  const navigate = useNavigate();

  const [file, setFile] = useState(null)
  const [categorias, setCategorias] = useState([])
  const productsNormales = useSelector((state) => state.products.products);

  const [input, setInput] = useState({
    name: "",
    //category: "",
    //color: "",
    description: "",
    image: [],
    isAvailable: true,
    price: "",
    stock: "",
    category: "",
    // isTrending: false, //averageRaiting
    discount: 0,
    //deleted: ???
    // marca: [], //falta realacion / modelo
  });

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

//   useEffect(() => {
//     dispatch(getAllMarca());
//   }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };

    fetchData();
    setErrors(validate(input));
  }, [input]);

  const category = (e) =>{
    //console.log(e)
    setInput({
      ...input,
      category: e,
    });
  }

  function handleChange(e) {
    //console.log("eeee",e.target.name)
    //console.log(category)
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

    // const updatedPhotos = [...input.images];

    // for (let i = 0; i < files.length; i++) {
    //   try {
    //     const base64 = await convertBase64(files[i]);
    //     updatedPhotos.push(base64);
    //   } catch (error) {
    //     console.error("Error loading image:", error);
    //   }
    // }

    //setInput({ ...input, images: updatedPhotos });

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
        for (const file of selectedImage) {
          formData.append('image', file);
        }

            //formData.append('image', selectedImage);
            formData.append('name', input.name);
            formData.append('isAvailable', input.isAvailable);
            formData.append('description', input.description);
            formData.append('price', input.price);
            formData.append('stock', input.stock);
            formData.append('category', input.category);
            formData.append('discount', input.discount);

        await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/products/create`, formData);
        //dispatch(addProduct(input));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto creado con exito!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setInput({
            name: "",
            price: "",
            stock: "",
            description: "",
            available: true,
            isTrending: false,
            Marca: [],
            image: [],
          });
        });
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
  const [checkbox, setCheckbox] = useState(false)
  const [dobleeliminado, setDobleeliminado] = useState(false)
  //console.log(dobleeliminado)
  //console.log("PRUEBA ERRORES 2",selectedImage)

  console.log("imageeen", selectedImage)

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

    // validateDos({
    //   imageCheck: dobleeliminado,
    // }, "imageCheck")
    
    // validateDos({
    //   image: selectedImage,
    // }, "image")
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
  console.log(input)
  const botonCheck = (event) =>{
    const valuor = event.target.checked
    setCheckbox(valuor)
    if(valuor === true){
      setInput({
        ...input,
        discount: "",
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

  const goBackHandler = () => {
    navigate(-1);
  };

  const categoriasUnicas = [...new Set(productsNormales.map(producto => producto.category))];
  //console.log("categoriii",categoriasUnicas)

  return (
    <div>
      <div className="mt-4 sm:mt-28">
        <div className={styles.card_create}>
          <img src={backIcon} onClick={goBackHandler} alt="back" className="w-8 h-8 top-28 absolute ml-2"/>
          <div className="mb-4">
            <h1 className="text-2xl sm:text-5xl font-semibold text-gray-900">
              Create a new Product
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

                {/* <div>
                  <div className="font-semibold text-left mb-2">Brand:</div>
                  <Select
                    // options={marca.map((cate) => ({
                    //   value: cate.id,
                    //   label: cate.name,
                    // }))}
                    isMulti
                    onChange={(selectedOptions) =>
                      handleCategoryChange(selectedOptions)
                    }
                    className={styles.select}
                  />
                  {errors.marca && (
                    <div className={styles.error}>{errors.marca}</div>
                  )}
                </div> */}

        <div className="mb-2">
                  <div className="font-semibold text-left mb-2 mt-2">Category:</div>
                  <Select
                    // options={marca.map((cate) => ({
                    //   value: cate.id,
                    //   label: cate.name,
                    // }))}
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


                    // onChange={(selectedOptions) =>
                    //   handleCategoryChange(selectedOptions)
                    // }
                    // className={styles.select}
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
                    {" "}
                    {/* Utilizamos flex y items-center para alinear los elementos horizontalmente */}
                    <div className="mr-2 mb-2">
                      {" "}
                      {/* Agregamos un margen derecho entre los checkboxes */}
                      <input
                        type="checkbox"
                        name="available"
                        // checked={input.available}
                        onChange={botonCheck}
                        className="mr-1"
                      />
                    </div>
                    {/* <div className="font-semibold text-gray-400 text-left mb-2">Discount (Opcional)</div> */}
                    {checkbox === true ? <div className="font-semibold text-left mb-2">
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
                    disabled={checkbox === false ? true : false}
                  />
                  {errorsDos.discount && (
                    <div className={styles.error}>{errorsDos.discount}</div>
                  )}

  
                </div>


              </div>


              

              <div className={styles.der}>
                <div>
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

                <div className="flex items-center mb-2 mt-2 font-semibold">Image:
                  
                  <div className="flex items-center mb-4">
                    {" "}
                    {/* Repetimos el mismo patrón para el segundo checkbox */}
                    {/* <div className="mr-2">
                      <input
                        type="checkbox"
                        name="isTrending"
                        checked={input.isTrending}
                        onChange={(e) => handleChange(e)}
                        className="mr-1"
                      />
                    </div>
                    <div>Is Trending</div> */}
                  </div>
                </div>

                {/* <div>
                  <div>Available:</div>
                  <input
                    type="checkbox"
                    name="available"
                    checked={input.available}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <div>Is Trending:</div>
                  <input
                    type="checkbox"
                    name="isTrending"
                    checked={input.isTrending}
                    onChange={(e) => handleChange(e)}
                  />
                </div> */}

                {/* <div>
                  <div className="font-semibold text-left mb-2">Images:</div>
                  <input
                    type="file"
                    //name="photo"
                    onChange={handlePhotoChange}
                    //multiple
                    //className="pt-4"
                  />
                  {errors.image && (
                    <div className={styles.error}>{errors.image}</div>
                  )}
                </div> */}


                {/* <div className={styles.imagePreview}> */}

                
                
      {selectedImage ? (
        <div className="grid grid-cols-2 gap-2" >
        {selectedImage.map((image, index) => (
        <div className="relative">
        <img key={index} src={image} alt={`Image ${index}`} className="w-40 h-40 object-contain" />
        <img onClick={() => eliminarImage(index)} src={closeImage} alt="close" className="w-6 h-6 absolute top-0 left-0" />
        </div>
      ))}
        {/* <img onClick={eliminarImage} src={closeImage} alt="close" className="w-6 h-6 relative top-0 left-0" /> */}
        
          <label htmlFor="image-upload" className="cursor-pointer ">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg flex-col cursor-pointer">
              {/* <span className="text-3xl">+</span> */}
              <img src={uploadImage} alt="upload" className="w-16 h-16 object-contain" />
              <div className="mt-2 font-semibold text-gray-400">Upload</div>
            </div>
          </label>
          <input multiple 
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            name="image"
          />
        </div>

      ) : (
        <div className="mt-2 mb-2 w-40 h-40" >
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-lg flex-col cursor-pointer">
              {/* <span className="text-3xl">+</span> */}
              <img src={uploadImage} alt="upload" className="w-16 h-16 object-contain" />
              <div className="mt-2 font-semibold text-gray-400">Upload</div>
            </div>
          </label>
          <input multiple 
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
    






                  {/* {input.image.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className={`${styles.previewImage} ${styles.imageHoverEffect}`}
                        onClick={() => handleImageDelete(index)}
                      />
                    </div>
                  ))} */}
                  
                {/* </div> */}
            
                <button
                  id="bt"
                  className={styles.button}
                  disabled={buttonDisabled()}
                  onClick={(e) => handleSubmit(e)}
                  // disabled={Object.keys(errors).length > 0}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
}