import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ShoppingCart, MonetizationOn } from '@mui/icons-material';

export default function MyOrder() {

    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/myOrderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {
                        orderData !== {} ? Array(orderData).map(data => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (
                                            item.map((arrayData) => {
                                                return (
                                                    <div  >
                                                        {
                                                            arrayData.Order_date ?
                                                                <div className='m-auto mt-5 h6'>
                                                                    {data = arrayData.Order_date}
                                                                    <hr />
                                                                </div> :
                                                                <div className="col-12 col-md-6 col-lg-3">
                                                                <div className="card mt-3 bg-info text-white" style={{ maxWidth: "22rem", maxHeight: "360px" }}>
                                                                    <div className="card-body">
                                                                        <h5 className="card-title text-primary">{arrayData.name}</h5>
                                                                        <div className="container-fluid p-0" style={{ height: "38px" }}>
                                                                            <div className="d-flex h5">
                                                                                <div className="m-1 flex-grow-1 text-success"><ShoppingCart /> Qty : {arrayData.qty}</div>
                                                                                <div className="m-1 flex-grow-1 text-warning"> Size : {arrayData.size}</div>
                                                                                <div className="m-1 flex-grow-1 "> Price : <span className="text-danger"><MonetizationOn /> ₹{arrayData.price}/-</span></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            

                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                    }) : ""
                            )
                        }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}