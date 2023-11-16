import { useDispatch, useSelector } from 'react-redux';
import { validation } from '../utils/Validations/validation.js';
import updateUserOnServer from '../redux/actions/putUsers.js'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FormEdit = () => {

    const { id } = useParams();

    const usersUpdate = useSelector((state) => state.putser);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(updateUserOnServer(id, input))
    }, [id])

    const [input, setInput] = useState({
        name: "",
        username: "",
        address: "",
        admin: [], 
    });

    const [errors, setErrors] = useState({
        name: "",
        username: "",
        address: "",
        admin: "", 
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name==="admin"){
            setInput({
                ...input,
                admin: [...input.admin, value]});
        }
        else {
            setInput((prevInput) => ({
              ...prevInput,
              [name]: value,
            }));    
        }

        validation(event.target, setErrors);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !input.name ||
            !input.username ||
            !input.address ||
            !input.admin
        ) {
            alert("Please complete all required fields.");
            return;
        }

        if (!errors.name && !errors.username && !errors.address && !errors.admin) {
            useDispatch(postGames(input))
        } else {
        alert("errors were found")
    }}

    return(
        <div className="text-lg">
            <h1 className="mb-[37px] mt-[16px]">Edit User</h1>
            
            <form>
                <div className="mb-[12px]">
                    <label>Name:</label>
                    <input name="name" type='text' value={input.name} onChange={handleChange}/>
                    {errors.name?(<p>{errors.name}</p>): ""}
                </div>

                <div className="mb-[12px]">
                    <label>UserName:</label>
                    <input name="username" type='text' value={input.username} onChange={handleChange}/>
                    {errors.username?(<p>{errors.username}</p>): ""}
                </div>

                <div className="mb-[12px]">
                    <label>Address:</label>
                    <input name="address" type='text' value={input.address} onChange={handleChange}/>
                    {errors.address?(<p>{errors.address}</p>): ""}
                </div>

                <div className="mb-[12px]">
                    <label>Admin/not admin: </label>
                        <select name="admin" value={input.admin} onChange={handleChange}>
                            <option value="Admin">Admin</option>
                            <option value="not admin">x Admin</option>
                        </select>
                        {errors.admin?(<p>{errors.admin}</p>): ""}
                </div>

                <div className="mt-[42px]">
                    <button type='submit'>Change</button>
                </div>
            </form>
        </div>
    )
}

export default FormEdit;