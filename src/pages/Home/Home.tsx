import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiPlusSm } from 'react-icons/hi';

import './home.scss';
import { AppDispatch, RootState } from '../../store/store';
import { getBoards } from '../../store/modules/boards/actions';
import { CreateBoardForm } from './components/CreateBoardForm/CreateBoardForm';
import BoardHome from './components/BoardHome/BoardHome';
import IBoard from '../../common/interfaces/IBoard';
import Modal from '../../common/components/Modal/Modal';
import Loader from '../../common/components/Loader/loader';

function Home(): JSX.Element {
	const dispatch: AppDispatch = useDispatch();
	const state: { boards: IBoard[] } = useSelector((state: RootState) => state.boards);
	const loadingState = useSelector((state: RootState) => state.loading);
	const [modal, setModal] = useState(false);

	useEffect(() => {
		dispatch(getBoards());
	}, [dispatch]);

	return (
		<>
			<div className='container'>
				<h2 className='title-home'>Мои доски</h2>
				<div className='block-board'>
					{state.boards.map(({ title, id }) => (
						<BoardHome id={id} title={title} key={id} />
					))}
					<button onClick={() => setModal(true)} className='add-new-board'>
						<HiPlusSm size='30px' />
						Добавить новую доску
					</button>
				</div>
			</div>

			{modal && (
				<Modal backDrop={true} width='245px' height='180px' setActive={setModal}>
					<CreateBoardForm onClose={() => setModal(false)} />
				</Modal>
			)}
			{loadingState.loading && <Loader />}
		</>
	);
}

export default Home;
