import React, { useState, useRef, useEffect } from 'react'
import {  useCart, useDispatchCart } from './ContextReducer'

export default function Card(props) {
    let options = props.options;
    const dispatch = useDispatchCart();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    let priceOptions = Object.keys(options);
    let foodItem = props.foodItem;
    const priceRef = useRef();
    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price:finalPrice, qty: qty, size: size, img: props.ImgSrc })
    }
    
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div className="card m-3" style={{ "width": "20rem", "maxHeight": "500px" }}>
                <img src={foodItem.img} className="card-img-top" alt="..." style={{ "maxHeight": "200px" }} />
                <div className="card-body ">
                    <h5 className="card-title text-start h6">{foodItem.description}</h5>
                    <p className="card-text h3">{foodItem.name}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 h5 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 h5 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'> ₹{finalPrice}/-</div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
