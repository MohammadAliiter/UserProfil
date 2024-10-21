import React, { useState } from 'react';
import { loginUser } from '../../api';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            toast.success(`Login successful! Welcome, ${response.data.name}`);
           
            setTimeout(() => {
                navigate("/profile");
            }, 2000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Login failed.";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="container">
            <ToastContainer/>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
                <button type="submit" className="button">Login</button>
            </form>
            <p className="toggle-link" onClick={() => navigate("/")}>Don't have an account? Sign Up</p>
        </div>
    );
};

export default Login;
