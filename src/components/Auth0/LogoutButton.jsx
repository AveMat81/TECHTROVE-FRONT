import { useAuth0 } from "@auth0/auth0-react";
import {clearWishlist,} from "../../redux/slices/WishlistSlice"
import { useSelector, useDispatch } from "react-redux";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const { logout } = useAuth0();
    
    
    const handlerClear = () => {
        
        dispatch(clearWishlist())
        logout({ returnTo: window.location.origin });
        
    }

    return <button onClick={handlerClear}className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
    >Logout</button>
};

export default LogoutButton;