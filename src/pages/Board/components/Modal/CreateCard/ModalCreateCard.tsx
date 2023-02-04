import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { AppDispatch } from '../../../../../store/store';
import './modalCreateCard.scss';
import { createCard } from '../../../../../store/modules/board/actions';
import { nameHandler } from '../../../../../common/function/nameHandler';
import { useParams } from 'react-router-dom';
import resizeTextarea from '../../../../../common/function/resizeTextarea';
import checkLengthText from '../../../../../common/function/checkLengthText ';

interface ICreateCard {
	onClose: Dispatch<SetStateAction<boolean>>;
	list_id: number;
	position: number;
}
const ModalCreateCard = ({ onClose, list_id, position }: ICreateCard) => {
	const { board_id } = useParams();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const dispatch: AppDispatch = useDispatch();
	const [nameCard, setNameCard] = useState('');
	const [nameError, setNameError] = useState('');
	const [validForma, setValidForm] = useState(false);

	useEffect(() => {
		nameError ? setValidForm(false) : setValidForm(true);
	}, [nameError]);

	const addNewCard = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!checkLengthText(nameCard, setNameError)) return;
		dispatch(createCard(board_id, list_id, nameCard, position));
		onClose(false);
	};

	return (
		<>
			<div className='error_massage_modal_card'>{nameError}</div>
			<textarea
				autoFocus
				value={nameCard}
				onChange={e => nameHandler(e, setNameError, setNameCard)}
				onKeyDown={() => resizeTextarea(textareaRef)}
				className='card-textarea'
				placeholder='Введите текст...'
				ref={textareaRef}
			></textarea>
			<div className='block-button'>
				<button onClick={e => addNewCard(e)} className='add-new-card' disabled={!validForma}>
					Добавить карточку
				</button>
				<button
					onClick={() => {
						onClose(false);
					}}
					className='close-create-card'
				>
					<GrClose size='12px' />
				</button>
			</div>
		</>
	);
};

export default ModalCreateCard;
