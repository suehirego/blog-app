import React, { useState } from 'react';
import './forms.scss';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className='formWrapper'>
            <h1>Login</h1>
            <form>
                <input
                    type="text"
                    placeholder='Username'
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder='Password'
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}

                <div className="register">
                    <span>Don't have an account?</span>
                    <Link
                        to="/register"
                        style={{ textDecoration: 'none', color: "green", }}>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login