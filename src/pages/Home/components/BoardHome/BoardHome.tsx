import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBoard } from '../../../../store/modules/boards/actions';
import { AppDispatch } from '../../../../store/store';
import './boardHome.scss';

const BoardHome = (props: { id: number; title: string }) => {
	const dispatch: AppDispatch = useDispatch();

	const ref = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const redirect = () => {
		ref.current?.classList.toggle('board-animation');
		setTimeout(() => {
			navigate(`/board/${props.id}`);
		}, 700);
	};

	return (
		<div onClick={redirect} className='board-cart' ref={ref}>
			<h2 className='board_title'>{props.title}</h2>
			<button
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					dispatch(deleteBoard(props.id));
				}}
			>
				Удалить
			</button>
		</div>
	);
};

export default BoardHome;
