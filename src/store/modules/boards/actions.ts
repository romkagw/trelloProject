import instance from '../../../api/request';
import { api } from '../../../common/constants';
import { AppDispatch } from '../../store';

export const getBoards = () => async (dispatch: AppDispatch) => {
	try {
		const response = await instance.get(api.baseURL + '/board');
		dispatch({ type: 'UPDATE_BOARDS', payload: response });
	} catch (e: any) {
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const addBoards = (props: string) => async (dispatch: AppDispatch) => {
	try {
		await instance.post(api.baseURL + '/board', { title: props });
		dispatch(getBoards());
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};

export const deleteBoard = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await instance.delete(api.baseURL + '/board/' + id);
		dispatch(getBoards());
	} catch (e) {
		console.log(e);
		dispatch({ type: 'ERROR_ACTION_TYPE' });
	}
};
