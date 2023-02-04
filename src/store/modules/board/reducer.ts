const initialState = {};

export default function boardReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "GET_BOARD_ID":
      return {
        ...state,
        ...action.payload,
      };
    case "INITIAL_STATE":
      return initialState;

    default: {
      return { ...state };
    }
  }
}
