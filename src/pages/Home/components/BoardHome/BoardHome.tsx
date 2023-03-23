import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../../common/components/Button/Button";
import { deleteBoard } from "../../../../store/modules/boards/actions";
import { AppDispatch } from "../../../../store/store";
import "./boardHome.scss";

type Props = {
  id: number;
  title: string;
};

const BoardHome = ({ id, title }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const redirect = () => {
    ref.current?.classList.toggle("board-animation");
    setTimeout(() => {
      navigate(`/board/${id}`);
    }, 700);
  };

  const removeBoard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteBoard(id));
  };

  return (
    <div onClick={redirect} className="board-cart" ref={ref}>
      <h2 className="board_title">{title}</h2>
      <Button onClick={e => removeBoard(e)}>Удалить</Button>
    </div>
  );
};

export default BoardHome;
