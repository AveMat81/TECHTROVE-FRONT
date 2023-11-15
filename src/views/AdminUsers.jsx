import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllUsers from "../redux/actions/allUsers";
import { Link } from "react-router-dom";
import imageee from "../utils/images/incog.jpg"

const AdminUsers=()=>{

    const usersList = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getAllUsers())
    }, [])

    const imageUrl = usersList.allUsers && usersList.allUsers.image && usersList.allUsers.image.url;

    
    return(
      <div>
      <h1 className="text-[36px] text-black mt-[22px] mb-[21px]">Users</h1>
      {usersList.allUsers?.map((user) => {
        return (
          <div className="bg-white rounded-lg p-4 pl-1 ml-4 mr-4 mb-4 shadow-xl flex items-center">
            <img
              src={user.image===null?imageee:user.image.url?user.image.url:user.image}
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
            />
            <div className="ml-4 text-left flex-grow">
              <p className="text-lg font-semibold w-48 truncate">Name: {user.name}</p>
              <p className="text-base truncate">UserName: {user.username}</p>
              <p className="text-base w-48 truncate">Email: {user.email}</p>
            </div>
            <Link to={`/users/${user.id}`} key={user.id}>
              <svg class="w-8 h-8" fill="blue">
                <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
              </svg>
            </Link>
          </div>
        );
      })}

      
    </div>
    )
}

export default AdminUsers;