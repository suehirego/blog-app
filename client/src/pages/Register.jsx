import React, { useState, useRef } from 'react';
import './forms.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();

    const [file, setFile] = useState(null);

    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
            setError(err.response.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imgUrl = await upload();
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            img: imgUrl,
        };

        try {
            await axios.post("/auth/register", user);
            //redirect user to login page
            navigate("/login");

        } catch (err) {
            console.log(err);
            setError(err.response.data);
        }

    };

    return (
        <div className='formWrapper'>
            <h1>Register</h1>
            <form>
                <input
                    type="text"
                    placeholder='Username'
                    name="username"
                    ref={username}
                />
                <input
                    type="text"
                    placeholder='Email'
                    name="email"
                    ref={email}
                />
                <input
                    type="password"
                    placeholder='Password'
                    name="password"
                    ref={password}
                />
                <input
                    type="file"
                    id="file"
                    className="custom-file-input"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}

                <div className="register">
                    <span>Already have an account?</span>
                    <Link to="/login" style={{ textDecoration: 'none', color: "green" }}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register