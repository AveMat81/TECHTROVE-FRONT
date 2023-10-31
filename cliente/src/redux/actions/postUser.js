import axios from "axios";

const postUser = (user) => {
    console.log("en la action", user);
    const endpoint = "http://localhost:3001/api/users/signUp"
    return async (dispatch) => {
        try {
            const response = await axios.post(endpoint, user)
        } catch (error) {
            console.log(error)
        };
    };
};

export default postUser;