import React, {} from 'react';
import {} from 'react-router-dom';

const LogoutForm = () => {

    return (
        <form action='http://localhost:8080/logout' method='Get'>
            <button type="submit">Login</button>
        </form>
    )

};

export default LogoutForm;
