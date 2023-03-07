import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import "./modalCreateList.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import IBoard_id from "../../../../../common/interfaces/IBoard_id";
import { addList } from "../../../../../store/modules/board/actions";
import { nameHandler } from "../../../../../common/function/nameHandler";
import checkLengthText from "../../../../../common/function/checkLengthText ";
interface ICreateList {
  onClose: () => void;
  board_id?: string;
}

const ModalCreateList = ({ onClose, board_id }: ICreateList) => {
  const dispatch: AppDispatch = useDispatch();
  const state: IBoard_id = useSelector((state: RootState) => state.board);
  const [nameList, setNameList] = useState("");
  const [nameError, setNameError] = useState("");
  const [validForma, setValidForm] = useState(false);

  const maxLengthName = 20;

  useEffect(() => {
    if (nameList.length > maxLengthName)
      setNameError("слишком длинное название");

    nameError ? setValidForm(false) : setValidForm(true);
  }, [nameError, nameList]);

  const addNewList = () => {
    if (!checkLengthText(nameList, setNameError)) return;
    dispatch(addList(board_id, nameList, state.lists.length));
    setNameList("");
  };

  return (
    <>
      <button onClick={onClose} type="button" className="close_list_form">
        <GrClose size="14px" />
      </button>
      <div className="error_massage_modal_list">{nameError}</div>
      <input
        onChange={e => nameHandler(e, setNameError, setNameList)}
        autoFocus
        value={nameList}
        name="nameBoard"
        type="text"
        placeholder="Введите заголовок списка"
        className="modal-input-list"
      />
      <p className="counter-liters">
        {nameList.length}/{maxLengthName}
      </p>
      <button
        className="add_list_btn_modal"
        onClick={addNewList}
        type="submit"
        disabled={!validForma}
      >
        Добавить список
      </button>
    </>
  );
};

export default ModalCreateList;
