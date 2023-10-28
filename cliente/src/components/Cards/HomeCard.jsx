import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";

const HomeCard = ({ image,id, name, price  }) => {

  const prueba = (e) =>{
    console.log("holaaaa")
  }

  
  return (
    <div className="inline-flex flex-col items-start gap-[8px] relative">
      <Link to={`/${id}`}>
        <div className="w-[160px] h-[160px] relative bg-violet-50 rounded-3xl">
          <img
            className="relative w-auto h-auto object-cover"
            alt="Rectangle"
            src={image}
          />
        </div>
      </Link>

      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">
        {name}</div>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-between text-red-600 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">
        $ {price}
        
        <div className="flex pb-30">
            <img onClick={prueba}
              alt="Home"
              src={
                imagePaths.Add.inactive
              }
              className="w-6 h-6"
              />
        </div>
        </div>

      </div>

      
    </div>
  );
};

export default HomeCard;
