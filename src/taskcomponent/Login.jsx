import { useState } from "react";
import { checkUserCrediantals } from "../service/loginService";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const [formData, setFormData] = useState({
        username: "", 
        password: ""
    });

    const [error, setError] = useState({
        username: "",
        password: ""
    })

    async function handleCrediantals() {
        try {
            const response = await checkUserCrediantals(formData);
            console.log(response);
            if(response.status == 200) {
                localStorage.setItem("authId", "ok")
                navigate("/home")
            }
        } catch(error) {
            setStatus("Username or password must be wrong")
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const isValid =validateForm();
        console.log(isValid)
        if(isValid) {
            console.log("form-submitted")
            handleCrediantals();
        }
        
        console.log(formData);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      function validateForm() {
        const error = {}
        if(formData.username == "") {
            error.username = "username must not be empty"
            console.log("empty usename")
        }
        if(formData.password == "") {
            error.password = "password must not be empty"
        }
        
        setError(error);
        return Object.keys(error).length === 0;
      }

    return (
        <div className="p-3">
            <h3 className="text-center text-xl font-bold">Login Form</h3>
            {
                status && <div className="text-red-500 bg-red-50 p-3 my-2">{status}</div>
            }
            <form onSubmit={handleSubmit} className="border border-dark p-3">
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="border border-dark form-control" placeholder="Enter Username" />
                </div>
                {error.username && <div className="text-red-700">{error.username}</div>}
                <div className="form-group">
                    <label>Password</label>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} className="border border-dark form-control" placeholder="Enter Username" />
                </div>
                {error.password && <div className="text-red-700">{error.password}</div>}
                <div>
                    <button type="submit" className="bg-blue-600 rounded-xl px-3 py-2 text-white">Login</button>
                </div>
            </form>
        </div>
    );
}