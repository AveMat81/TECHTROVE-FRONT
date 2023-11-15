import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Back from "../utils/images/BasicIcons/backIcon.png";
import LogoutButton from "../components/Auth0/LogoutButton";
import Swal from 'sweetalert2';


export const Account = () => {
  const currentUser = useSelector((state) => state.user);
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(currentUser);
  
  const { logout } = useAuth0();
  const imageUrl = currentUser && currentUser.user && currentUser.user.image && currentUser.user.image.url
  return (
    <div className="mt-6">
      {!user.email_verified ? Swal.fire({
        icon: 'warning',
        title: 'Verify your email',
        text: 'You must verify your email before accessing this page.',
        allowOutsideClick: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      })

      .then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.close || result.dismiss === Swal.DismissReason.backdrop) {
          window.location.href = '/';
        }
      })

       :
       <div>
    <div className="flex flex-col items-center justify-center border border-gray-300 shadow-lg p-4 rounded-lg w-80 ml-8">
    <div className="flex flex-row gap-3 px-4 mb-8 mt-8 font-general-sans">
        <Link to={"/"}>
            <img src={Back} className="w-[30px] h-[30px] absolute left-12" alt="Back" />
        </Link>
        <h1 className="text-[20px] mb-4 absolute">User Account</h1>
    </div>
    {currentUser.user && (
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <div className="w-42 h-[136px] rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
            <img
              src={imageUrl ? imageUrl: currentUser.user.image}
              alt={currentUser.user.name}
              className="w-[full] h-full object-cover"
              />
          </div>
        </div>
        <div className="text-left mb-5 mt-5">
          <h3 className="text-6x3 mb-2">Name: {currentUser.user.name}</h3>
          <h3 className="text-6x3 mb-2">Username: {currentUser.user.username}</h3>
          <h3 className="text-6x3 mb-2">Address: {currentUser.user.address}</h3>
        </div>        
      </div>
    )}
    </div>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg mr-3">
          <Link to="/profile-edit">Edit profile</Link>
        </button>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg mr-3">
            <Link to="/Favorite">Favorite</Link>
        </button>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg mr-3">
        <Link to={`/myorders/${currentUser.user.id}`}>My Orders</Link>
        </button>
        <LogoutButton onClick={LogoutButton } >
          
        </LogoutButton>
        {currentUser?.user?.isAdmin && (
          <Link to="/estadistica">
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg ml-3">
          Dashboard Admin
          </button>
          </Link>
          )}
       </div> }
    </div>
  );
};

export default Account;
