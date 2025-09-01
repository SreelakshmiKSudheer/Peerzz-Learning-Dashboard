import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../api';

const SingleUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

const handleRejectUser = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!window.confirm('Are you sure you want to reject this user?')) return;
        await API.put(`/user/${userId}/reject`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser({ ...user, status: 'rejected' });
    } catch (err) {
        setError('Failed to reject user');
    }
};

const handleDeleteUser = async () => {
    try{
        const token = localStorage.getItem('token');
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        await API.delete(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Optionally, you can redirect the user or show a success message
    } catch (err) {
        setError('Failed to delete user');
    }

}

return (
    <div className="border border-[var(--tri)] bg-[var(--bi)] rounded-lg p-8 m-10 shadow">
        <h2 className="text-2xl font-bold mb-4">{user ? user.name : 'User Profile'}</h2>
        {user ? (
            <div>
                <div className='flex mb-2'>
                    <label className='w-[15%]'>Email: </label>
                    <p>{user.email}</p>
                </div>
                <div className='flex mb-2'>
                    <label className='w-[15%]'>Role: </label>
                    <p>{user.role}</p>
                </div>
                <div className='flex mb-2'>
                    <label className='w-[15%]'>Status: </label>
                    <p>{user.status}</p>
                </div>
                {user.role === 'educator' && (
                    <>
                        <div className='flex mb-2'>
                            <label className='w-[15%]'>Designation: </label>
                            <p>{user.designation}</p>
                        </div>
                        <div className='flex mb-2'>
                            <label className='w-[15%]'>Institution: </label>
                            <p>{user.institution.name}</p>
                        </div>
                    </>
                )}
                <div className='flex mb-2'>
                    <label className='w-[15%]'>Joined: </label>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='flex mb-2'>
                    <label className='w-[15%]'>Last Updated: </label>
                    <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className='flex justify-end gap-5'>
                    <button
                        className='text-white bg-[var(--quad)] hover:bg-[var(--quad-dark)] px-3 py-1 font-semibold rounded-md'
                        onClick={handleRejectUser}
                    >
                        Reject User
                    </button>
                    <button
                        className='text-white bg-[var(--quad)] hover:bg-[var(--quad-dark)] px-3 py-1 font-semibold rounded-md'
                        onClick={handleDeleteUser}
                    >
                        Delete User
                    </button>
                </div>
            </div>
        ) : (
            <div>No user data found.</div>
        )}
    </div>
);
};

export default SingleUser;