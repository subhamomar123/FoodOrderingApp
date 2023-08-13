import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';

export default function Login() {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	let navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password })

		});

		const json = await response.json();
		if (json.success) {
			navigate("/");

		}
		if (json.success) {
			localStorage.setItem('userEmail', credentials.email);
			localStorage.setItem('JSONtoken', json.authToken);
		} else {
			alert("Enter Valid Credentials");
		}


	}

	const onChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<div className='container login-container d-flex justify-content-center align-items-center vh-100'>
			<form className='w-50 m-auto border bg-light border-success rounded p-4' onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
				</div>
				<div className="d-flex justify-content-between justify-content-around mt-5">
					<div className="d-flex align-items-center">
						<button type="submit" className="btn btn-success">Submit</button>
					</div>
					<div className="d-flex justify-content-between">
						<Link to="/createuser" className="btn btn-danger new-user">
							<span className="ms-2">I'm a new User</span>
						</Link>
					</div>
				</div>
				<br/>
				<div style={{ textAlign: 'center', margin: '20px', color: '#333' }}>
    <Typography variant="h6">
        <EmailIcon style={{ fontSize: '1.5em', verticalAlign: 'middle', marginRight: '10px', color: '#FF5733' }} />
        Try email: subhamomar123@gmail.com
        <br />
        <LockIcon style={{ fontSize: '1.5em', verticalAlign: 'middle', marginRight: '10px', color: '#3366CC' }} />
        Password: 123456789
    </Typography>
</div>
			</form>
		</div>
	);
}
