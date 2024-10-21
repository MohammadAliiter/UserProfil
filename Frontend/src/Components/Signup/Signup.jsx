import React, { useState } from 'react';
import { registerUser } from '../../api';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !mobile || !address) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await registerUser({
                name, email, password, mobile, address
            });
            toast.success("Registration successful!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Registration failed.";
        
            toast.error(errorMsg);
        }
    };

    return (
        <div className="container">
            <ToastContainer/>
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister} className="form">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
                <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-input" required />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" required />
                <button type="submit" className="button">Sign Up</button>
            </form>
            <p className="toggle-link" onClick={() => navigate("/login")}>Already have an account? Log In</p>
        </div>
    );
};

export default SignUp;
