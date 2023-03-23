import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editingGroup, getBoardsId } from "../../store/modules/board/actions";
import { AppDispatch, RootState } from "../../store/store";
import IBoard_id from "../../common/interfaces/IBoard_id";
import Loader from "../../common/components/Loader/loader";
import { ICard } from "../../common/interfaces/ICard";
import "./board.scss";
import "./components/Card/card.scss";
import "./components/List/list.scss";
import { IList } from "../../common/interfaces/IList";

const Board = () => {
  const { board_id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const state: IBoard_id = useSelector((state: RootState) => state.board);

  const { loading } = useSelector((state: RootState) => state.loading);

  const [titleBoard, setTitleBoard] = useState(" ");
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    dispatch(getBoardsId(board_id));
  }, [board_id, dispatch]);

  useEffect(() => {
    if (state) {
      setTitleBoard(state.title);
      setLists(state.lists);
    }
  }, [state]);

  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [currentList, setCurrentList] = useState<IList | null>(null);

  const updatePositions = (lists: IList[]) => {
    lists.forEach(
      (list: { cards: ICard[]; position: number }, listIndex: number) => {
        list.cards.forEach((card, cardIndex) => {
          card.position = cardIndex;
        });
        list.position = listIndex;
      }
    );
  };

  function transformList(
    lists: IList[]
  ): { id: number; position: number; list_id: number }[] {
    const transformedList: { id: number; position: number; list_id: number }[] =
      [];

    lists.forEach(list => {
      list.cards.forEach(card => {
        transformedList.push({
          id: card.id,
          position: card.position,
          list_id: list.id,
        });
      });
    });

    return transformedList;
  }

  const dragStartHandler = (list: IList, card: ICard) => {
    setCurrentCard(card);
    setCurrentList(list);
  };

  const dragOverHandler = (
    e: React.DragEvent<HTMLDivElement>,
    list: IList,
    card: ICard
  ) => {
    e.preventDefault();

    if (!currentCard || !currentList) return;
    const target = e.target as HTMLElement;
    const { top } = target.getBoundingClientRect();

    const tempLists = JSON.parse(JSON.stringify(lists));
    const currentCardIndex = currentList.cards.indexOf(currentCard);
    const dropIndex = list.cards.indexOf(card);
    const listDrop = tempLists[list.position].cards;
    const removeCurrentCardFromCurrentList = () => {
      tempLists[currentList.position].cards.splice(currentCardIndex, 1);
    };

    let newIndex =
      e.pageY > top + (e.target as HTMLElement).scrollHeight / 2
        ? dropIndex + 1
        : dropIndex;

    if (!list.cards.includes(currentCard)) {
      listDrop.splice(newIndex, 0, currentCard);
      removeCurrentCardFromCurrentList();
      updatePositions(tempLists);
      setLists(tempLists);
      setCurrentList(tempLists[list.position]);
      setCurrentCard(tempLists[list.position].cards[newIndex]);
    } else if (
      currentCardIndex - newIndex <= -2 ||
      currentCardIndex - newIndex >= 1
    ) {
      if (currentCardIndex - newIndex <= -2) {
        setTimeout(() => {
          removeCurrentCardFromCurrentList();
        }, 0);
      } else {
        removeCurrentCardFromCurrentList();
      }

      listDrop.splice(newIndex, 0, currentCard);
      updatePositions(tempLists);
      setLists(tempLists);
      setCurrentList(tempLists[list.position]);

      if (newIndex >= listDrop.length) {
        newIndex = listDrop.length;
      }
      setCurrentCard(tempLists[list.position].cards[newIndex]);
    }
  };

  const dragEndHandler = () => {
    setCurrentList(null);
    setCurrentCard(null);
    dispatch(editingGroup(board_id, transformList(lists)));
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, list: IList) => {
    e.preventDefault();
    setCurrentCard(null);
    setCurrentList(null);
    dispatch(editingGroup(board_id, transformList(lists)));
  };

  const dragOverList = (e: React.DragEvent<HTMLDivElement>, list: IList) => {
    e.preventDefault();
    if (!currentCard || !currentList || list.cards.length) return;

    const tempLists = JSON.parse(JSON.stringify(lists));

    tempLists[list.position].cards.push(currentCard);
    tempLists[currentList.position].cards.splice(currentCard.position, 1);

    setLists(tempLists);
    setCurrentList(tempLists[list.position]);
    setCurrentCard(tempLists[list.position].cards[0]);
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
        <h2 className="title-board">{titleBoard}</h2>
      </div>

      <div className="board-content">
        {lists &&
          lists.map(list => (
            <div
              onDragOver={e => dragOverList(e, list)}
              onDragEnd={() => dragEndHandler()}
              onDrop={e => dropHandler(e, list)}
              className="board-list"
            >
              <h2 className="list-title">{list.title}</h2>
              {list.cards
                .sort((a, b) => a.position - b.position)
                .map(card => (
                  <div
                    draggable
                    onDragStart={() => dragStartHandler(list, card)}
                    onDragOver={e => dragOverHandler(e, list, card)}
                    onDragEnd={() => dragEndHandler()}
                    onDrop={e => dropHandler(e, list)}
                    className={`card-content ${
                      card.id === currentCard?.id && "placeholder"
                    }`}
                  >
                    {card.title}
                  </div>
                ))}
            </div>
          ))}
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Board;
