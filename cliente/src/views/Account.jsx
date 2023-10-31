import { LoginButton } from "../components/Auth0/LoginButton";
import { LogoutButton } from "../components/Auth0/LogoutButton";
import { Profile } from "../components/Profile/Profile"
import { useAuth0 } from "@auth0/auth0-react";


const Account = () => {

    const { isAuthenticated } = useAuth0();

    
    return (

        <div>
            {isAuthenticated ? <>
                <Profile/>
                <LogoutButton/>            
            </>          
           : <LoginButton/>
           }
            </div>
            )
}

export default  Account