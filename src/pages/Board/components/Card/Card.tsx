import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ICard } from '../../../../common/interfaces/ICard';
import resizeTextarea from '../../../../common/function/resizeTextarea';
import useOutsideAlerter from '../../../../common/hooks/useOutsideAlerter';
import { nameHandler } from '../../../../common/function/nameHandler';
import checkLengthText from '../../../../common/function/checkLengthText ';
import { AppDispatch } from '../../../../store/store';
import { editCard, removeCard } from '../../../../store/modules/board/actions';
import './card.scss';

const Card = ({ title, listId, id, position }: ICard) => {
	const dispatch: AppDispatch = useDispatch();
	const { board_id } = useParams();

	const { ref, isShow, setIsShow } = useOutsideAlerter(false);
	const [textCart, setTextCard] = useState('');
	const [textError, setTextError] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		resizeTextarea(textareaRef);
		setTextCard(title);
	}, [isShow, title]);

	const deleteCard = () => {
		setTextCard(title);
		dispatch(removeCard(board_id, id));
		setIsShow(false);
	};

	const editTextCard = () => {
		if (!checkLengthText(textCart, setTextError)) return;
		dispatch(editCard(board_id, listId, id, textCart));
		setTextCard(textCart);
		setIsShow(false);
	};

	return (
		<>
			{isShow ? (
				<div ref={ref}>
					<p className='error-massage-card-edit'> {textError}</p>
					<textarea
						autoFocus
						className='edit-contents-card'
						ref={textareaRef}
						value={textCart}
						onChange={e => nameHandler(e, setTextError, setTextCard)}
					/>
					<div className='block-btn-card'>
						<MdOutlineDone onClick={editTextCard} className='btn-save-contents-card' />
						<RiDeleteBin2Fill onClick={deleteCard} className='btn-delete-card' />
					</div>
				</div>
			) : (
				<p className='card-content'>
					{textCart}
					<BsPencil onClick={() => setIsShow(true)} className='rename-card-btn' />
				</p>
			)}
		</>
	);
};

export default Card;
