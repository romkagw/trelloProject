import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Board from './pages/Board/Board';

function App(): ReactElement {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/board/:board_id' element={<Board />} />
		</Routes>
	);
}

export default App;
