import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

const LogoutForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <form action='http://localhost:8080/logout' method='Get'>
            <button type="submit">Login</button>
        </form>
    )

};

export default LogoutForm;
