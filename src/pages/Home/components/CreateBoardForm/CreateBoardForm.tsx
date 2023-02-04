import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { ICloseModal } from "../../../../common/interfaces/ICloseModal";
import "./CreateBoardForm.scss";
import { addBoards } from "../../../../store/modules/boards/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { nameHandler } from "../../../../common/function/nameHandler";
import checkLengthText from "../../../../common/function/checkLengthText ";

export function CreateBoardForm({ onClose }: ICloseModal) {
  const [nameBoard, setNameBoard] = useState("");
  const [nameError, setNameError] = useState("");
  const [validForma, setValidForm] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    nameError ? setValidForm(false) : setValidForm(true);
  }, [nameError]);

  const addBoard = () => {
    if (!checkLengthText(nameBoard, setNameError)) return;
    dispatch(addBoards(nameBoard));
    onClose();
  };

  return (
    <>
      <button className="btn-close" onClick={onClose} type="button">
        <GrClose size="15px" />
      </button>
      <div className="name-error">{nameError}</div>
      <input
        onChange={e => nameHandler(e, setNameError, setNameBoard)}
        value={nameBoard}
        autoFocus
        name="nameBoard"
        type="text"
        placeholder="Введите название доски"
        className="modal-input"
      />
      <button
        onClick={addBoard}
        className="btn-create-board"
        type="submit"
        disabled={!validForma}
      >
        Создать доску
      </button>
    </>
  );
}
