import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../api';
import './Profile.css'; 
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        Navigate("/profile")
        if (!token) {
            setMessage('Please log in to update your profile.');
            return;
        }

        try {
            const response = await updateUserProfile({ name, email, password }, token);
            setMessage('Profile updated successfully!');
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('email', response.data.email);
        } catch (error) {
            setMessage('Update failed. ' + error.response.data.message);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <form onSubmit={handleUpdate} className="profile-form">
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
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="update-button">Update Profile</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Profile;
