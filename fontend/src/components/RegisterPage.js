import React, { useState } from 'react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validEmail) {
            setError('Địa chỉ email không hợp lệ.');
            setSuccess(false);
            return; // Dừng xử lý nếu email không hợp lệ
        }

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    passWord,
                }),
            });

            if (response.ok) {
                console.log('Đăng ký thành công!');
                setSuccess(true);
                // Tiến hành xử lý sau khi đăng ký thành công
            } else {
                setError('Tên tài khoản đã tồn tại.');
                setSuccess(false);
                console.log('Đăng ký thất bại:', response.status);
            }
        } catch (error) {
            setError('Đăng ký thất bại.');
            setSuccess(false);
            console.log('Đăng ký thất bại:', error);
            // Xử lý lỗi nếu cần
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setValidEmail(validateEmail(emailValue)); // Kiểm tra email hợp lệ khi thay đổi giá trị
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '100px auto',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '20px',
        },
        title: {
            textAlign: 'center',
            marginBottom: '30px',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Đăng ký</h2>
            {success ? (
                <p style={{ color: 'green' }}>Đăng ký thành công!</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : null}

            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>
                        Tên người dùng:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={styles.input}
                    />
                    {!validEmail && (
                        <p style={{ color: 'red' }}>Địa chỉ email không hợp lệ.</p>
                    )}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="passWord" style={styles.label}>
                        Mật khẩu:
                    </label>
                    <input
                        type="password"
                        id="passWord"
                        name="passWord"
                        value={passWord}
                        onChange={handlePasswordChange}
                        required
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Đăng ký
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;    