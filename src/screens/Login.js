import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'


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
		<div>
			<>
				<div className='container'>
					<form className='w-50 m-auto mt-5 border bg-success border-success rounded' onSubmit={handleSubmit}><div className="m-3">
						<label htmlFor="email" className="form-label">Email address</label>
						<input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
					</div>
						<div className="m-3">
							<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
							<input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
						</div>
						<button type="submit" className="m-3 btn btn-success">Submit</button>
						<Link to="/createuser" className="m-3 mx-1 btn btn-danger">I'm a new User</Link>
					</form>
				</div>
			</>
		</div>
	)
}
