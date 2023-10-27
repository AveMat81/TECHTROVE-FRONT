import { React, useState, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css";
import Select from "react-select";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import axios from "axios"

function validate(input) {
  const errors = {};
  if (!input.name || input.name.length < 2 || input.name.length > 25) {
    errors.name = "El Nombre debe tener entre 2 y 25 caracteres";
  }
  if (
    isNaN(input.price) ||
    input.price <= 0 ||
    input.price.toString().length > 256
  ) {
    errors.price = "El precio debe ser un número válido mayor que 0";
  }
  if (
    isNaN(input.stock) ||
    input.stock <= 0 ||
    input.price.toString().length > 256
  ) {
    errors.stock = "El stock debe ser un número válido mayor o igual a 0";
  }
  if (input.description.length > 256) {
    errors.description = "La descripción no debe exceder los 256 caracteres.";
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

  const [input, setInput] = useState({
    name: "",
    //category: "",
    //color: "",
    description: "",
    image: null,
    isAvailable: true,
    price: "",
    stock: "",
    category: "Monitors"
    // isTrending: false, //averageRaiting
    //discount: "",
    //deleted: ???
    // marca: [], //falta realacion / modelo
  });

  const [errors, setErrors] = useState({});

//   useEffect(() => {
//     dispatch(getAllMarca());
//   }, [dispatch]);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

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
        console.log(input)

        const formData = new FormData();
            formData.append('image', file);
            formData.append('name', input.name);
            formData.append('isAvailable', input.isAvailable);
            formData.append('description', input.description);
            formData.append('price', input.price);
            formData.append('stock', input.stock);
            formData.append('category', input.category);


        await axios.post("http://localhost:3001/api/products/create", formData);
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

  return (
    <div>
      <div className="mt-5 sm:mt-28">
        <div className={styles.card_create}>
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900">
              Create a new Product
            </h1>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.name && (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                </div>

                <div>
                  <div>Price:</div>
                  <input
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleChange(e)}
                    placeholder="Price"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.price && (
                    <div className={styles.error}>{errors.price}</div>
                  )}
                </div>

                <div>
                  <div>Marca:</div>
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
                </div>

                <div>
                  <div>Stock:</div>
                  <input
                    type="number"
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleChange(e)}
                    placeholder="Stock"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.stock && (
                    <div className={styles.error}>{errors.stock}</div>
                  )}
                </div>
              </div>

              <div className={styles.der}>
                <div>
                  <div>Description:</div>
                  <textarea
                    name="description"
                    style={{ resize: "none", height: "100px" }}
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                    className="w-full rounded-lg border border-gray-200 focus:border-blue-300 p-4 text-[12px] "
                  />
                  {errors.description && (
                    <div className={styles.error}>{errors.description}</div>
                  )}
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mb-4 mr-10">
                    {" "}
                    {/* Utilizamos flex y items-center para alinear los elementos horizontalmente */}
                    <div className="mr-2">
                      {" "}
                      {/* Agregamos un margen derecho entre los checkboxes */}
                      <input
                        type="checkbox"
                        name="available"
                        checked={input.available}
                        onChange={(e) => handleChange(e)}
                        className="mr-1"
                      />
                    </div>
                    <div>Available</div>
                  </div>
                  <div className="flex items-center mb-4">
                    {" "}
                    {/* Repetimos el mismo patrón para el segundo checkbox */}
                    <div className="mr-2">
                      <input
                        type="checkbox"
                        name="isTrending"
                        checked={input.isTrending}
                        onChange={(e) => handleChange(e)}
                        className="mr-1"
                      />
                    </div>
                    <div>Is Trending</div>
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

                <div>
                  <div>Images:</div>
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
                </div>
                <div className={styles.imagePreview}>
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
                </div>

                <button
                  id="bt"
                  className={styles.button}
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