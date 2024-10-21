import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../api';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEditable, setIsEditable] = useState(false); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to view your profile.');
                return;
            }

            try {
                const { data } = await getUserProfile(token); 
                setName(data.name);
                setEmail(data.email);
                setPhone(data.mobile); 
                setAddress(data.address);
            } catch (error) {
                toast.error('Failed to fetch profile. ' + (error.response?.data?.message || ''));
            }
        };

        fetchUserProfile(); 
    }, []);

    
    const handleEdit = () => {
        setIsEditable(true);
        toast.info('You can now edit your profile.');
    };

    
    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to update your profile.');
            return;
        }

        try {
            const response = await updateUserProfile({ name, email, password, phone, address }, token);
            toast.success('Profile updated successfully!', {
                autoClose: 2000, 
            });
            
           
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('phone', response.data.mobile);
            localStorage.setItem('address', response.data.address);

           
            setIsEditable(false);
        } catch (error) {
            toast.error('Update failed. ' + error.response.data.message);
        }
    };

    return (
        <div className="profile-container">
            <ToastContainer
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop={true} 
                closeOnClick
                rtl={false} 
                pauseOnFocusLoss={false} 
                draggable
                pauseOnHover 
            />
          
            <h2>User Profile</h2>
            {message && <p className="message">{message}</p>}

           
            {!isEditable ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
                </div>
            ) : (
                
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
                        placeholder="New Password (optional)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input"
                    />
                    <textarea
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-input"
                    />
                    <button type="submit" className="update-button">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
