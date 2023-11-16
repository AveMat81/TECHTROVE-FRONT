import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllUsers from "../redux/actions/allUsers";
import { Link } from "react-router-dom";
import imageee from "../utils/images/incog.jpg"
import Pagination from "@mui/material/Pagination";

const AdminUsers=()=>{

    const usersList = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [usersAdmin, setUsersAdmin] = useState([])
    
    useEffect(()=>{
        dispatch(getAllUsers())
    }, [])

    const imageUrl = usersList.allUsers && usersList.allUsers.image && usersList.allUsers.image.url;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = usersList.allUsers.slice(indexOfFirstItem, indexOfLastItem)
    const usersIsAdmin = usersAdmin.slice(indexOfFirstItem, indexOfLastItem)

    const handlerAllusers = () =>{
      setCurrentPage(1);
      setUsersAdmin([])
    }

    const handlerAdmin = (e) =>{
      //console.log(e.target.value)
      if(e.target.value === "isAdmin"){
        const usersAdmin = usersList.allUsers.filter((u) => u.isAdmin === true)
        setCurrentPage(1);
        return setUsersAdmin(usersAdmin)
      }
      if(e.target.value === "notAdmin"){
        const usersNotAdmin = usersList.allUsers.filter((u) => u.isAdmin === false)
        setCurrentPage(1);
        return setUsersAdmin(usersNotAdmin)
      }
      //console.log(usersAdmin)
    }

    
    return(
      <div>
    <h1 className="text-2xl text-black mt-[22px] mb-[21px]">Users</h1>

    <div className="flex justify-between mr-4 ml-4 mb-4">
    <select onChange={handlerAdmin} className={`w-2/5 p-2 rounded border border-gray-300`}>
        <option value="" disabled selected>Filter</option>
        <option value="isAdmin" >isAdmin</option>
        <option value="notAdmin" >notAdmin</option>
    </select>
    <button onClick={handlerAllusers} className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">All Users</button>
    </div>

    {usersAdmin.length > 0 ? 
      usersIsAdmin?.map((user) => {
        return (
          <div className="bg-white rounded-lg p-4 pl-1 ml-4 mr-4 mb-4 shadow-xl flex items-center">
            <img
              src={user.image===null?imageee:user.image.url?user.image.url:user.image}
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
            />
            <div className="ml-4 text-left flex-grow">
              <p className="text-lg font-semibold truncate w-52">Name: {user.name}</p>
              <p className="text-base truncate w-52">UserName: {user.username}</p>
              <p className="text-base w-48 truncate">Email: {user.email}</p>
            </div>
            <Link to={`/users/${user.id}`} key={user.id}>
              <svg class="w-8 h-8" fill="blue">
                <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
              </svg>
            </Link>
          </div>
        );
      }) :

    
    currentUsers?.map((user) => {
      return (
        <div className="bg-white rounded-lg p-4 pl-1 ml-4 mr-4 mb-4 shadow-xl flex items-center">
          <img
            src={user.image===null?imageee:user.image.url?user.image.url:user.image}
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
          <div className="ml-4 text-left flex-grow">
            <p className="text-lg font-semibold truncate w-52">Name: {user.name}</p>
            <p className="text-base truncate w-52">UserName: {user.username}</p>
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

<div className={`mt-8 flex flex-col justify-center items-center relative`}>
  <Pagination 
     count={usersAdmin.length > 0 ? Math.ceil(usersAdmin.length / itemsPerPage) : Math.ceil(usersList.allUsers.length / itemsPerPage)}
     page={currentPage}
     onChange={(event, page) => setCurrentPage(page)}
     size="large"       
     sx={{
      "& .Mui-selected": {
       backgroundColor: "#D9D9D9",
       fontSize: "20px",
     },
     "& .MuiPaginationItem-root": {
       fontSize: "15px",
      },
      "& .paginationButton": {
       backgroundColor: "#D9D9D9",
      },
    }}
   />
  </div>


  </div>
  )
}

export default AdminUsers;