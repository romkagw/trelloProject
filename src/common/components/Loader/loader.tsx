import { RotatingLines } from 'react-loader-spinner';
import './loader.scss';

export default function Loader() {
	return (
		<div className='loader-block'>
			<RotatingLines strokeWidth='3' animationDuration='0.5' />
			<h2>Loading</h2>
		</div>
	);
}
