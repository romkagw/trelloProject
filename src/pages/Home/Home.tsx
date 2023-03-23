import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiPlusSm } from "react-icons/hi";

import "./home.scss";
import { AppDispatch, RootState } from "../../store/store";
import { getBoards } from "../../store/modules/boards/actions";
import { CreateBoardForm } from "./components/CreateBoardForm/CreateBoardForm";
import BoardHome from "./components/BoardHome/BoardHome";
import IBoard from "../../common/interfaces/IBoard";
import Modal from "../../common/components/Modal/Modal";
import Loader from "../../common/components/Loader/loader";
import Button from "../../common/components/Button/Button";

function Home(): JSX.Element {
  const boards: IBoard[] = useSelector(
    (state: RootState) => state.boards.boards
  );
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.loading);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <h2 className="title-home">Мои доски</h2>
        <div className="block-board">
          {boards.map(({ title, id }) => (
            <BoardHome id={id} title={title} key={id} />
          ))}
          <Button
            onClick={() => setModal(true)}
            className="add-new-board"
            icon={<HiPlusSm size="30px" />}
          >
            Добавить новую доску
          </Button>
        </div>
      </div>

      {modal && (
        <Modal backDrop width="245px" height="180px" setActive={setModal}>
          <CreateBoardForm onClose={() => setModal(false)} />
        </Modal>
      )}
      {loading && <Loader />}
    </>
  );
}

export default Home;
