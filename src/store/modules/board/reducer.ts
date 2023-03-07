const initialState = {};

export default function boardReducer(
  state = initialState,
  { type, payload }: { type: string; payload?: any }
) {
  switch (type) {
    case "GET_BOARD_ID":
      return {
        ...state,
        ...payload,
      };
    case "INITIAL_STATE":
      return initialState;
    case "HEIGHT_CARD":
      return {
        ...state,
        heightCard: payload,
      };
    default:
      return state;
  }
}
