import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./board.scss";
import { BsPlusSquareDotted } from "react-icons/bs";
import List from "./components/List/List";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsId } from "../../store/modules/board/actions";
import { AppDispatch, RootState } from "../../store/store";
import IBoard_id from "../../common/interfaces/IBoard_id";
import { changeBoardName } from "../../store/modules/board/actions";
import Modal from "../../common/components/Modal/Modal";
import ModalCreateList from "./components/Modal/CreateList/ModalCreateList";
import useOutsideAlerter from "../../common/hooks/useOutsideAlerter";
import { nameHandler } from "../../common/function/nameHandler";
import checkLengthText from "../../common/function/checkLengthText ";
import Loader from "../../common/components/Loader/loader";

export default function Board() {
  const { board_id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const state: IBoard_id = useSelector((state: RootState) => state.board);
  const [nameError, setNameError] = useState("");

  const [editTitle, setEditTitle] = useState(false);

  const { ref, isShow, setIsShow } = useOutsideAlerter(false);

  const [titleBoard, setTitleBoard] = useState(" ");

  let loadingState = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(getBoardsId(board_id));
    setTitleBoard(state.title);
  }, [board_id, dispatch, state.title]);

  const renameBoardTitle = () => {
    if (!checkLengthText || nameError) return;
    dispatch(changeBoardName(board_id, titleBoard));
    setEditTitle(false);
  };

  return (
    <div className="board-container">
      <Link
        onClick={() => dispatch({ type: "INITIAL_STATE" })}
        to="/"
        className="button-home"
      >
        Home
      </Link>
      <div className="heading-block">
        {editTitle ? (
          <>
            <p className="error-message-edit-title">{nameError}</p>
            <input
              type="text"
              onChange={e => nameHandler(e, setNameError, setTitleBoard)}
              autoFocus
              onBlur={() => renameBoardTitle()}
              className="edit-name-board"
              value={titleBoard}
            />
          </>
        ) : (
          <h2 onClick={() => setEditTitle(true)} className="title-board">
            {titleBoard}
          </h2>
        )}
      </div>

      <div className="board-content">
        {state.lists &&
          state.lists.map((el, index) => (
            <List
              id={el.id}
              title={el.title}
              cards={el.cards}
              position={index}
              key={el.id}
            />
          ))}
        {isShow ? (
          <div ref={ref}>
            <Modal
              backDrop={false}
              setActive={setIsShow}
              width={"277px"}
              height={"85px"}
            >
              <ModalCreateList
                onClose={() => setIsShow(false)}
                board_id={board_id}
              />
            </Modal>
          </div>
        ) : (
          <button onClick={() => setIsShow(true)}>
            <BsPlusSquareDotted size="30px" />
            Добавить колонку
          </button>
        )}
      </div>
      {loadingState.loading && <Loader />}
    </div>
  );
}
