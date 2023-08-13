import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Modal from '../Modal';
import { useCart } from './ContextReducer';

import {
    Link
} from "react-router-dom";
import Cart from '../screens/Cart';

export default function Navbar() {
    let navigate = useNavigate();
    const [cartView, setCartView] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('JSONtoken');
        localStorage.removeItem('userEmail');
        navigate("/")
    }
    const data = useCart();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success h4 m-0">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">
                        GoFood
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {(localStorage.getItem("JSONtoken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder" >My Orders</Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("JSONtoken")) ?
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </div> :
                            <div>
                                <div className="btn bg-white text-danger" onClick={handleLogout} >Logout</div>
                            </div>
                        }
                        <div>
                        <div className="btn bg-white text-success m-1" onClick={() => {
                                    setCartView(true)
                                }} >
                                    My Cart {" "}
                                    <Badge pill bg="danger">{data?.length}
                                    </Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
