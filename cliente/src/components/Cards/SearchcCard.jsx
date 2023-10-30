import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";
import toast, { Toaster } from "react-hot-toast";


const SearchCard = ({ image,id, name, price  }) => {

  const prueba = (e) =>{
    toast.success("Added to cart successfully ");
  }

  const favorite = (e) =>{
    toast.success("Added to favotire successfully ");
  }

  
  return (
    <div className="inline-flex flex-col items-start gap-[10px] relative my-5">
        {/* <div className="w-[160px] h-[160px] relative bg-violet-50 rounded-3xl"> */}
        <div className="relative bg-blue-200 rounded-3xl flex justify-center items-center">
          <Link to={`/${id}`}>
          <img
            className="relative w-auto h-auto object-cover bg-black-500"
            alt="Rectangle"
            src={image}
          />
        {/* <button class="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1">Botón</button> */}
        </Link>
        <img onClick={favorite}
              alt="Home"
              src={
                imagePaths.Favorite.inactive
              }
              className="w-8 h-8 opacity-80 absolute top-1 right-1"
              />
        </div>
      

      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="text-black-800 text-lg font-semibold">
        {name}</div>
      </div>

      <div className="w-full justify-around items-center">
        <div className="justify-between flex text-red-600 text-sm font-semibold font-jakarta-sans leading-[24px] tracking-normal">
        $ {price}
        
        <div className="flex pb-30">
            <img onClick={prueba}
              alt="Home"
              src={
                imagePaths.Add.inactive
              }
              className="w-8 h-8 opacity-40"
              />
        </div>
        </div>

      </div>

      
    </div>
  );
};

export default SearchCard;
