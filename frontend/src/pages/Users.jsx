import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link, useParams } from 'react-router';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openEducatorIndex, setOpenEducatorIndex] = useState(null);
    const [openLearnerIndex, setOpenLearnerIndex] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await API.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(res.data.users);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const handleEducatorToggle = (index) => {
        setOpenEducatorIndex(openEducatorIndex === index ? null : index);
    };

    const handleLearnerToggle = (index) => {
        setOpenLearnerIndex(openLearnerIndex === index ? null : index);
    };

    // Separate users by role
    const learners = users.filter(user => user.role === 'learner');
    const educators = users.filter(user => user.role === 'educator');

    return (
        <div>
            <h2 className="text-6xl text-center font-bold mb-4">Users</h2>
            <h3 className="text-2xl font-bold px-5">Educators</h3>
            <div className="px-10 py-5 flex flex-wrap gap-5 justify-between">
                {educators.length > 0 ? (
                    educators.map((user, idx) => (
                        <div key={user.id} className="w-1/4 border border-[var(--tri)] bg-[var(--bi)] rounded-xl shadow">
                            <button
                                className="w-full text-left p-5 font-semibold text-lg flex justify-between items-center focus:outline-none"
                                onClick={() => handleEducatorToggle(idx)}
                            >
                                <span>{user.name}</span>
                            </button>
                            {openEducatorIndex === idx && (
                                <div className="px-5 pb-4">
                                    {/* <p>Email: {user._id}</p> */}
                                    <p>Email: {user.email}</p>
                                    <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                    <Link to={`/admin/users/user/${user._id}`}>
                                        <button 
                                        className='bg-[var(--quad)] hover:bg-[var(--quad-dark)] px-3 py-1 font-semibold rounded-md mt-2 text-white'>View User</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No educators found.</div>
                )}
            </div>
            <h3 className="text-2xl font-bold px-5">Learners</h3>
            <div className="px-10 py-5 flex flex-wrap gap-5 justify-between">
                {learners.length > 0 ? (
                    learners.map((user, idx) => (
                        <div key={user.id} className="w-1/4 h-auto border border-[var(--tri)] bg-[var(--bi)] rounded-xl shadow">
                            <button
                                className="w-full text-left p-5 font-semibold text-lg flex justify-between items-center focus:outline-none"
                                onClick={() => handleLearnerToggle(idx)}
                            >
                                <span>{user.name}</span>
                            </button>
                            {openLearnerIndex === idx && (
                                <div className="px-5 pb-4">
                                    <p>Email: {user.email}</p>
                                    <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                    <Link to={`/admin/users/user/${user.id}`}>
                                        <button
                                            className='bg-[var(--quad)] hover:bg-[var(--quad-dark)] px-3 py-1 font-semibold rounded-md mt-2 text-white'
                                        >
                                            View User
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No learners found.</div>
                )}
            </div>
        </div>
    );
};

export default Users;

