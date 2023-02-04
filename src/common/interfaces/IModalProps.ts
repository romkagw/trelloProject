import { ReactNode } from 'react';

export default interface IModalProps {
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
	backDrop?: boolean;
	backgroundColor?: string;
	width?: string;
	height?: string;
}
