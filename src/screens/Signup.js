import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";
import { CheckCircleOutline, ArrowRightAlt } from "@mui/icons-material";

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })

        });

        const json = await response.json();
        if (!json.success) {
            alert("Enter Valid Credentials");
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className='container signup-continer'>
            <form className='w-50 m-auto mt-5 border bg-light border-success rounded p-4' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <PersonIcon />
                        </span>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <EmailIcon />
                        </span>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <LockIcon />
                        </span>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <LocationOnIcon />
                        </span>
                        <input type="text" className="form-control" name='location' placeholder='Please type address here' value={credentials.location} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="dflexalign">
                    <Button type="submit" variant="contained" className="btn btn-success">
                        Submit <CheckCircleOutline />
                    </Button>
                    <Link to="/login" className="btn btn-outline-danger">
                        Already a user <ArrowRightAlt />
                    </Link>
                </div>
            </form>
        </div>
    );
}
