import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Delete from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom';
export default function Cart() {
	let data = useCart();
	let dispatch = useDispatchCart();
	const [showLoginMessage, setShowLoginMessage] = useState(false);
	if (data?.size === 0) {
		return (
			<div>
				<div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
			</div>
		)
	}
	const handleCheckOut = async () => {
		let userEmail = localStorage.getItem("userEmail");
		if (!userEmail) {
			setShowLoginMessage(true);
			return;
		}
		let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orderData`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				order_data: data,
				email: userEmail,
				order_date: new Date().toDateString()
			})
		});
		console.log("JSON RESPONSE:::::", response)
		if (response.status === 200) {
			dispatch({ type: "DROP" })
		}
	}

	const cleartCart = () => {
		dispatch({ type: "DROP" })
	};
	let totalPrice = data?.reduce((total, food) => total + food.price, 0);
	return (
		<div className="cart-scroll-overlay">
			<div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
				<table className='table table-hover '>
					<thead className=' text-success fs-4'>
						<tr>
							<th scope='col' >S.No.</th>
							<th scope='col' >Name</th>
							<th scope='col' >Quantity</th>
							<th scope='col' >Option</th>
							<th scope='col' >Amount</th>
							<th scope='col' onClick={cleartCart}>Remove All</th>
						</tr>
					</thead>
					<tbody>
						{
							data?.map((food, index) => (
								<tr>
									<th scope='row' >{index + 1}</th>
									<td >{food.name}</td>
									<td>{food.qty}</td>
									<td>{food.size}</td>
									<td>{food.price}</td>
									<td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
							))
						}
					</tbody>
				</table>
				<div className="d-flex justify-content-between align-items-center m-4 ">
					<div className="total-price-box">
						<h1 className='fs-2 total-price-text'>Total Price: {totalPrice}/-</h1>
					</div>
					<div>
						<button className='btn btn-success checkout-button' onClick={handleCheckOut}>
							<span className="checkout-text">Check Out</span>
							<Delete className="checkout-icon" />
						</button>
					</div>
				</div>

			</div>
			{
				showLoginMessage && (
					<div className="alert alert-warning mt-3 text-center">
						<strong>Kindly login first in order to place an order.</strong> Thank you.
						<div>
							<Link className="btn btn-success" to="/login" style={{ background: 'linear-gradient(to right, #3ca55c, #4cb67c)' }}>
								Login
							</Link>

						</div>
					</div>

				)
			}

		</div>
	)
}
