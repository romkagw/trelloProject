/* eslint-disable array-callback-return */
import { useEffect, useRef, useState } from 'react';
import { ICard } from '../../../../common/interfaces/ICard';
import './list.scss';
import { HiMenuAlt3, HiPlusSm } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { changeListName, removeList } from '../../../../store/modules/board/actions';
import Modal from '../../../../common/components/Modal/Modal';
import Card from '../Card/Card';
import ModalCreateCard from '../Modal/CreateCard/ModalCreateCard';
import useOutsideAlerter from '../../../../common/hooks/useOutsideAlerter';
import { nameHandler } from '../../../../common/function/nameHandler';
import checkLengthText from '../../../../common/function/checkLengthText ';

interface IList {
	id: number;
	title: string;
	cards: ICard[];
	position: number;
}

function List({ id, title, cards, position }: IList) {
	const dispatch: AppDispatch = useDispatch();
	const { board_id } = useParams();

	const { ref, isShow, setIsShow } = useOutsideAlerter(false);
	const [titleList, setTitleList] = useState('');
	const [editTitle, setEditTitle] = useState(false);
	const [nameError, setNameError] = useState('');

	useEffect(() => {
		setTitleList(title);
	}, [title]);

	const renameListTitle = () => {
		if (!checkLengthText || nameError) return;
		dispatch(changeListName(board_id, titleList, id, position));
		setEditTitle(false);
	};

	const menuRef = useRef<HTMLDivElement>(null);
	const menuBurgerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		document.addEventListener('click', e => {
			if (menuRef.current && menuBurgerRef.current) {
				const clickMenu = e.composedPath().includes(menuRef.current);
				const clickBurger = e.composedPath().includes(menuBurgerRef.current);

				if (clickBurger) {
					menuRef.current.style.cssText = 'display: flex';
				} else if (!clickMenu) {
					menuRef.current.style.cssText = 'display: none';
				}
			}
		});
	}, []);

	const deleteList = () => {
		dispatch(removeList(board_id, id));
		if (menuRef.current) menuRef.current.style.cssText = 'display: none';
	};

	return (
		<>
			<div className='board-list'>
				<div ref={menuRef} className='menu-list'>
					<button onClick={() => deleteList()}> Удалить список </button>
				</div>
				<button ref={menuBurgerRef} className='list-menu-btn'>
					<HiMenuAlt3 />
				</button>

				{editTitle ? (
				<>
				<p className='error-massage-list'> {nameError}</p>
					<input
						type='text'
						onChange={e => nameHandler(e, setNameError, setTitleList)}
						autoFocus
						onBlur={() => renameListTitle()}
						className='edit-name-list'
						value={titleList}
					/>
				</>
					
				) : (
					<h2 onClick={() => setEditTitle(true)} className='list-title'>
						{titleList}
					</h2>
				)}

				{cards.map((card, index) => {
					return <Card title={card.title} listId={id} id={card.id} position={index} key={card.id} />;
				})}

				{isShow ? (
					<div ref={ref}>
						<Modal width='220px' setActive={setIsShow}>
							<ModalCreateCard list_id={id} onClose={setIsShow} position={cards.length} />
						</Modal>
					</div>
				) : (
					<button onClick={() => setIsShow(true)} className='button-add'>
						<HiPlusSm size='30px' />
						Добавить задачу
					</button>
				)}
			</div>
		</>
	);
}

export default List;
