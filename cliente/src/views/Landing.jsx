import { Link } from "react-router-dom";

import techTrove from "../utils/images/Logo/TECHTROVE.png"

const Landing = ({onStoreImageClick}) => {
  return (
    <div className="bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="text-center">
        <div >
           <Link to="home">
            <img
                src={techTrove}
                alt={techTrove}
                className="w-32 h-32 mx-auto rounded-full shadow-lg"
                onClick={onStoreImageClick}
                style={{ cursor: "pointer" }}
            />
           </Link>
           <h1 className="text-white font-bold tracking-wide text-3xl">TECH TROVE</h1>
        </div>
        <div className="justify-center items-center">
          <h1 className=" text-white"> Unlimited technology, Infitive Discoveries </h1>
        </div>
      </div>
    </div>
  );
};

export default Landing;