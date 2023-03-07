import { useEffect, useRef, useState, DragEvent, DOMElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ICard } from "../../../../common/interfaces/ICard";
import resizeTextarea from "../../../../common/function/resizeTextarea";
import useOutsideAlerter from "../../../../common/hooks/useOutsideAlerter";
import { nameHandler } from "../../../../common/function/nameHandler";
import checkLengthText from "../../../../common/function/checkLengthText ";
import { AppDispatch, RootState } from "../../../../store/store";
import { editCard, removeCard } from "../../../../store/modules/board/actions";
import "./card.scss";

const Card = ({ title, listId, id, position }: ICard) => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.board);

  const { board_id } = useParams();

  const { ref, isShow, setIsShow } = useOutsideAlerter(false);
  const [textCart, setTextCard] = useState("");
  const [textError, setTextError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    resizeTextarea(textareaRef);
    setTextCard(title);
  }, [isShow, title]);

  const deleteCard = () => {
    setTextCard(title);
    dispatch(removeCard(board_id, id));
    setIsShow(false);
  };

  const editTextCard = () => {
    if (!checkLengthText(textCart, setTextError)) return;
    dispatch(editCard(board_id, listId, id, textCart));
    setTextCard(textCart);
    setIsShow(false);
  };

  const dragStartHandler = (e: any) => {
    dispatch({
      type: "HEIGHT_CARD",
      payload: e.target.scrollHeight,
    });

    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  };

  const dragEnterHandler = (e: any) => {
    const target = e.target;

    if (target.className === "card-content") {
      const cardContainer = target.parentElement;
      const slots = cardContainer.querySelectorAll(".slot");

      if (!slots.length) {
        const slot = document.createElement("div");
        slot.classList.add("slot");
        slot.style.height = state.heightCard + "px";
        target.insertAdjacentElement("afterend", slot);
      }
    }
  };

  const dragOverHandler = (e: any) => {
    const target = e.target;

    if (target.className === "card-content") {
      const coordinate = target.getBoundingClientRect();
      const centerCart = coordinate.top + target.scrollHeight / 2;

      const cardContainer = target.parentElement;
      cardContainer.style.flexDirection =
        e.pageY < centerCart ? "column-reverse" : "column";
    }
  };

  const dragLeaveHandler = (e: any) => {
    const target = e.target;

    // получаем текущий контейнер
    const cardContainer = target.closest(".card_container");

    // получаем координаты текущего контейнера
    const containerCoordinate = cardContainer.getBoundingClientRect();

    // проверяем, что курсор мыши действительно находится за пределами текущего контейнера
    if (
      e.clientX < containerCoordinate.left ||
      e.clientX > containerCoordinate.right ||
      e.clientY < containerCoordinate.top ||
      e.clientY > containerCoordinate.bottom - 5
    ) {
      const slots = cardContainer.querySelectorAll(".slot");
      slots.forEach((slot: any) => slot.remove());
    }
  };

  const dragEndHandler = (e: any) => {};

  return (
    <>
      {isShow ? (
        <div ref={ref}>
          <p className="error-massage-card-edit"> {textError}</p>
          <textarea
            autoFocus
            className="edit-contents-card"
            ref={textareaRef}
            value={textCart}
            onChange={e => nameHandler(e, setTextError, setTextCard)}
          />
          <div className="block-btn-card">
            <MdOutlineDone
              onClick={editTextCard}
              className="btn-save-contents-card"
            />
            <RiDeleteBin2Fill
              onClick={deleteCard}
              className="btn-delete-card"
            />
          </div>
        </div>
      ) : (
        <div
          className="card_container"
          draggable
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
        >
          <div
            className="card-content"
            onDragStart={dragStartHandler}
            draggable
          >
            {textCart}
            <BsPencil
              onClick={() => setIsShow(true)}
              className="rename-card-btn"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
