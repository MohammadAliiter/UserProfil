import React, { useState } from 'react';
import { registerUser } from '../../api';
import './SignUp.css'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState(''); 
    const [address, setAddress] = useState(''); 
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        const Navigate = useNavigate();
        e.preventDefault();
        try {
            
            const response = await registerUser({ 
                name, 
                email, 
                password, 
                mobile, 
                address 
            });
            setMessage(`Registration successful! Welcome, ${response.data.name}`);
        } catch (error) {
            setMessage('Registration failed. ' + error.response.data.message);
        } 
        Navigate("/login") 
        
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister} className="signup-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Mobile Number" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="register-button">Sign Up</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SignUp;
