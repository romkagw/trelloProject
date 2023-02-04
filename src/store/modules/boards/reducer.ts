import IBoard from '../../../common/interfaces/IBoard';

const initialState: { boards: IBoard[] } = {
	boards: []
};

export default function boardsReducer(state = initialState, action: { type: string; payload?: any }) {
	switch (action.type) {
		case 'UPDATE_BOARDS':
			return {
				...state,
				...action.payload
			};

		case 'ERROR_ACTION_TYPE':
			return {
				...state,
				a: alert(action.payload)
			};
		default: {
			return { ...state };
		}
	}
}
