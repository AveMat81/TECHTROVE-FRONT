import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "tailwindcss/tailwind.css";
import postUser from "../../redux/actions/postUser";
import { useDispatch } from "react-redux";

export const Profile = () => {
    const dispatch = useDispatch();

    const {user, isAuthenticated, isLoading} = useAuth0();
    if(isLoading) {
        return <div>Loading...</div>
    }

    if (user && isAuthenticated) {
        console.log("entro al if");
        dispatch(postUser(user));
    }
    
    return (
        isAuthenticated && (
            <div className="flex flex-col items-center"> {/* Agrega una clase de flex y centrado vertical */}
            <img
              src={user.picture}
              alt={user.name}
              />
                <h2>{user.name}</h2>
                <h2>{user.nickname}</h2>
                <p>Email: {user.email}</p>
            </div>

        )
    )

}

export default Profile;