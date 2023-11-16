import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Back from "../utils/images/BasicIcons/backIcon.png";
import LogoutButton from "../components/Auth0/LogoutButton";
import Swal from 'sweetalert2';

export const Account = () => {
  const currentUser = useSelector((state) => state.user);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  const imageUrl = currentUser && currentUser.user && currentUser.user.image && currentUser.user.image.url;

  const renderUserProfile = () => (
    <div className="text-center">
      <div className="flex justify-center mb-2">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
          <img
            src={imageUrl ? imageUrl : currentUser.user.image}
            alt={currentUser.user.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold mb-1">{currentUser.user.email}</h3>
        <h3 className="text-base font-medium mb-1">Name: {currentUser.user.name}</h3>
        <h3 className="text-base font-medium mb-1">Username: {currentUser.user.username}</h3>
        <h3 className="text-base font-medium mb-1">Address: {currentUser.user.address}</h3>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {!user.email_verified ? (
        Swal.fire({
          icon: 'warning',
          title: 'Verify your email',
          text: 'You must verify your email before accessing this page.',
          allowOutsideClick: true,
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.close ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            window.location.href = '/';
          }
        })
      ) : (
        <div className="flex flex-col items-center mt-2 mr-2">
          
          <div className="border border-gray-300 shadow-lg p-4 rounded-lg w-80 ml-2 text-md">
            <Link to={"/"}>
              <img src={Back} className="w-[30px] h-[30px]" alt="Back" />
            </Link>
            <h1 className="text-2xl mb-4">User Account</h1>
            {currentUser.user && renderUserProfile()}
            <div className="mt-2 space-y-2">
            <button className="w-full px-2 py-2 bg-purple-500 text-white rounded-full border-2 border-purple-700 text-lg">
              <Link to="/profile-edit">Edit profile</Link>
            </button>
            <button className="w-full px-2 py-2 bg-purple-500 text-white rounded-full border-2 border-purple-700 text-lg">
              <Link to="/Favorite">Favorite</Link>
            </button>
            <button className="w-full px-2 py-2 bg-purple-500 text-white rounded-full border-2 border-purple-700 text-lg">
              <Link to={`/myorders/${currentUser.user.id}`}>My Orders</Link>
            </button>
            <div>
            {currentUser?.user?.isAdmin && (
              <Link to="/estadistica">
                <button className="w-full px-2 py-2 bg-purple-500 text-white rounded-full border-2 border-purple-700 text-lg">
                  Dashboard Admin
                </button>
              </Link>
            )}
            </div>
            <LogoutButton onClick={logout} className="w-full rounded-lg border-2 border-purple-700">
              Logout
            </LogoutButton>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Account;