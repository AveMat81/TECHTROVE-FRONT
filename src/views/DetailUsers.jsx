import { useDispatch, useSelector } from "react-redux";
import getIdUsers from "../redux/actions/idUsers";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import imageee from "../utils/images/incog.jpg"
import Back from "../utils/images/BasicIcons/backIcon.png";

const DetailUsers=()=>{
    const { id } = useParams();
    const usersId = useSelector((state) => state.idUser);
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(getIdUsers(id))
    }, [])


    const imageUrl = usersId.idUsers && usersId.idUsers.image && usersId.idUsers.image.url;

    const defaultImageUrl = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.emojipng.com%2F346%2F10131346.jpg&tbnid=tu_GQ9S87UJIUM&vet=12ahUKEwiZ8JjtjrGCAxWEcDABHQCpD-8QMygEegQIARBS..i&imgrefurl=https%3A%2F%2Fwww.emojipng.com%2Fpreview%2F10131346&docid=bIGsMx7zCWLWIM&w=900&h=593&q=imagen%20perfil%20sin%20imagen%20png&hl=es-419&ved=2ahUKEwiZ8JjtjrGCAxWEcDABHQCpD-8QMygEegQIARBS';

    return(

        <div className="mt-10 pr-4 pl-4 w-96 mx-auto ">
          <div className="flex flex-row gap-3 px-2 mb-6 mt-8 font-general-sans">
        <Link to={"/adminusers"}>
          <img src={Back} className="w-[30px] h-[30px]" alt="Back" />
        </Link>
        <p className="font-general-sans text-[22px] absolute left-16 top-[123px]">Back</p>
        </div>
        <div className="bg-blue-400 rounded-t-lg p-2 flex flex-col items-center ">
          <img
            src={imageUrl ? imageUrl : usersId.idUsers.image === null ? imageee : usersId.idUsers.image}
            className="w-36 h-36 rounded-full border-4 border-white object-cover mt-2 mb-0"
          />
          <h1 className="text-[22px] font-semibold text-white">{usersId.idUsers.name}</h1>
        </div>
        <div className="bg-white rounded-b-lg p-4 border border-4 border-gray ">
          <p className="text-[16.7px] mt-1">Email: {usersId.idUsers.email}</p>
          <p className="text-[16.7px] mt-1">Address: {usersId.idUsers.address}</p>
          <p className="text-[16.7px] mt-1">UserName: {usersId.idUsers.username}</p>
          <p className="text-[16.7px] mt-2 mb-2">
                Administrador: {usersId.idUsers.isAdmin === false ? <span className="bg-red-500 p-1 rounded-lg">Is not administrator</span> : <span className="bg-green-500 p-1 rounded-lg">Is administrator</span>}
          </p>
        </div>
        <div className="mt-4">
          <Link to={`/update/${id}`}>
            <button className="w-44 mt-4 py-4 bg-blue-500 border font-bold border-2  rounded-full text-center text-white text-[22px] transition-all hover:bg-blue-400">
              Edit user data
            </button>
          </Link>
        </div>
      </div>
    )
}


export default DetailUsers;