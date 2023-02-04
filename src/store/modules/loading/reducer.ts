const initialState = {
	loading: false
};

export default function reducer(state = initialState, action: { type: string; payload?: any }) {
	switch (action.type) {
		case 'LOADING':
			return {
				loading: action.payload
			};
		default: {
			return { ...state };
		}
	}
}
