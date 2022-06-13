import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import AddItems from "./components/AddItems";
import AddPlaces from "./components/AddPlaces";
import PlaceState from "./components/context/place/PlaceState";
import Error from "./components/Error";

import Header from "./components/Header";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Place from "./components/Place";
import SignUp from "./components/SignUp";

function App() {
	return (
		<PlaceState>
			<div className='App'>
				<Router>
					<Header />
					<Routes>
						<Route exact path={"/"} element={<Home />} />
						<Route exact path='/add-places' element={<AddPlaces />} />
						<Route exact path='/add-items' element={<AddItems />} />
						<Route exact path='/sign-up' element={<SignUp />} />
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/me' element={<Account />} />
						<Route exact path='/place/:id' element={<Place />} />
						<Route exact path='*' element={<Error />} />
					</Routes>
				</Router>
			</div>
		</PlaceState>
	);
}

export default App;
