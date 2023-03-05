import React, { useEffect, useState } from 'react'
import UserList from "../userslist";
import LoadingSpinner from '../../shared/loadingspinner';
import ErrorModal from '../../shared/ErrorModal';

function Users() {
    const [loadedUsers, setLoadedUsers] = useState();
    const [loading, setloading] = useState(false);
    const [error, setError] = useState();


    useEffect(() => {
        async function fetchUsers() {
            try {

                setloading(true);
                const response = await fetch(`https://worried-amount-production.up.railway.app/api/users`);
                const responsedata = await response.json();
                setLoadedUsers(responsedata.allUsers);
                setloading(false);
            } catch (err) {
                setloading(false);
                setError(err.message || "couldn't fetch Users");
                throw err;
            }
        }
        fetchUsers();
    }, []);


    function DeleteUser(userid) {
        setLoadedUsers(prevUser => {
            return prevUser.filter(p => p.id !== userid)
        });
    }
    const clearError = () => {
        setError(null);
    }
    return    <React.Fragment >
       <div className='user-image'>
            <ErrorModal error={error} onClear={clearError} />
            {loading && <LoadingSpinner asOverlay />}
            {loadedUsers && <UserList items={loadedUsers} deleteUSER={DeleteUser} />}
            </div>
        </React.Fragment>


}

export default Users;