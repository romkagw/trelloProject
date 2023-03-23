import instance from "../../../api/request";
import { api } from "../../../common/constants";
import { AppDispatch } from "../../store";
import { getBoards } from "../boards/actions";

export const getBoardsId =
  (boards_id: string | undefined) => async (dispatch: AppDispatch) => {
    try {
      const response = await instance.get(api.baseURL + "/board/" + boards_id);

      dispatch({ type: "GET_BOARD_ID", payload: response });
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const changeBoardName =
  (boards_id: string | undefined, title: string) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.put(api.baseURL + "/board/" + boards_id, { title: title });
      dispatch(getBoardsId(boards_id));
      dispatch(getBoards());
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const addList =
  (boards_id: string | undefined, title: string, position: number) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.post(api.baseURL + "/board/" + boards_id + "/list", {
        title: title,
        position: position,
      });
      dispatch(getBoardsId(boards_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const changeListName =
  (
    boards_id: string | undefined,
    newListName: string,
    list_id: number,
    position: number
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.put(
        api.baseURL + "/board/" + boards_id + "/list/" + list_id,
        {
          title: newListName,
        }
      );
      dispatch(getBoardsId(boards_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const removeList =
  (boards_id: string | undefined, list_id: number) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.delete(
        api.baseURL + "/board/" + boards_id + "/list/" + list_id
      );
      dispatch(getBoardsId(boards_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const editingGroup =
  (
    boards_id: string | undefined,
    arr: { id: number; position: number; list_id: number }[]
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.put(api.baseURL + "/board/" + boards_id + "/card", arr);

      dispatch(getBoardsId(boards_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const createCard =
  (
    board_id: string | undefined,
    list_id: number,
    title_card: string,
    position: number
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.post(api.baseURL + `/board/${board_id}/card`, {
        title: title_card,
        list_id: list_id,
        position: position,
      });
      dispatch(getBoardsId(board_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const editCard =
  (
    board_id: string | undefined,
    listID: number,
    cardID: number,
    cardText: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.put(
        api.baseURL + "/board/" + board_id + "/card/" + cardID,
        {
          title: cardText,
          list_id: listID,
        }
      );
      dispatch(getBoardsId(board_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };

export const removeCard =
  (board_id: string | undefined, cardID: number) =>
  async (dispatch: AppDispatch) => {
    try {
      await instance.delete(
        api.baseURL + "/board/" + board_id + "/card/" + cardID
      );
      dispatch(getBoardsId(board_id));
    } catch (e) {
      dispatch({ type: "ERROR_ACTION_TYPE" });
    }
  };
