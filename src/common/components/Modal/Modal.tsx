import IModalProps from '../../interfaces/IModalProps';
import './modal.scss';

const Modal = ({ width, height, setActive, children, backDrop = false, backgroundColor = '#ffffff' }: IModalProps) => {
	return (
		<>
			{backDrop && <div className='back-drop' onClick={() => setActive(false)} />}

			<form
				onSubmit={e => e.preventDefault()}
				className={backDrop ? 'modal-content-center' : 'modal-block'}
				style={{ backgroundColor: backgroundColor, width: width, height: height }}
			>
				{children}
			</form>
		</>
	);
};

export default Modal;
