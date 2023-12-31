import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'

export default function Home() {

	const [foodCat, setFoodCat] = useState([]);
	const [foodItems, setFoodItems] = useState([]);
	const [search, setSearch] = useState('');

	const loadFoodItems = async () => {
		let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/foodData`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}

		});
		response = await response.json();
		setFoodItems(response[0]);
		setFoodCat(response[1]);
	}

	useEffect(() => {
		loadFoodItems()
	}, [])

	return (
		<div>
			<Navbar />
			<div>

				<div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

					<div className="carousel-inner " id='carousel'>
						<div className=" carousel-caption  " style={{ zIndex: "2" }}>
							<div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
								<input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}/>
							</div>
						</div>
						<div className="carousel-item active" >
							<img src="https://source.unsplash.com/random/900x700/?food" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
						</div>
						<div className="carousel-item">
							<img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
						</div>
						<div className="carousel-item">
							<img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>


			</div>
			<div className='m-3 container justify-content-center'>
				{
					foodCat !== [] ? foodCat.map((data) => (
						<div className='row mb-3'>
							<div key={data._id} className='fs-3 m-3'>
								{data.CategoryName}
							</div>
							<hr />
							{foodItems !== [] ? foodItems.filter(
								(items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
								.map((filterItems) => {
									return (
										<div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
											<Card foodItem={filterItems} options={filterItems.options[0]}  ></Card>
										</div>
									)
								}) : <div> No Such Data </div>}
						</div>
					)
					)
						: ""
				}
			</div>
			<Footer />
		</div>

	)
}
