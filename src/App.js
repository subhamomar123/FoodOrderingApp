import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; // Use either this line or the one below
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';  // Choose either minified or non-minified version
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
	return (
		<CartProvider>
			<Router>
				<div className='fs-1' style={{ backgroundColor: '#E9EFB8' }}>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/createuser" element={<Signup />} />
						<Route exact path="/myOrder" element={<MyOrder />} />
					</Routes>
				</div>
			</Router>
		</CartProvider>
	);
}

export default App;
