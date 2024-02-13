import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import icon from '../icons/icon.png';
import { setTitle } from '../store/features/cellSlice';
import { Link, useNavigate} from 'react-router-dom';
import Modal from './Modal';
import axios from "axios";

function Navbar() {
  const dispatch = useAppDispatch();
  const { title } = useAppSelector((state) => state.cellReducer);
  const [modalOpen, setModalOpen] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(event.target.value);
  };

  const changeTitle = async (newTitle: string) => {
    try {
      dispatch(setTitle({ title: newTitle }));
      await axios.put(`/spreadsheet/${window.location.pathname.split('/')[2]}`, {
        title: newTitle
      })
    } catch (error) {
        console.error('Failed to set title: ', error);
    }
  }

  const checkEmptyTitle = async () => {
    if (localTitle === '') {
      setLocalTitle('Untitled');
      await changeTitle('Untitled');
    } else {
      await changeTitle(localTitle)
    }
  };

  const keyHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
      checkEmptyTitle().catch((error) => {
        console.error('An error occurred while setting the title:', error);
      });
    }
  };

  const deleteSpreadSheet = async () => {
    try {
      await axios.delete(`/spreadsheet/${window.location.pathname.split('/')[2]}`);
      navigate('/');
    } catch (error) {
        console.error('Failed to DELETE spreadsheet: ', error);
    }
  };

  return (
    <nav className="flex justify-between">
      <div className="flex items-center">
        <img className="w-[36px] m-2" src={icon} alt="icon" />
        <input
          data-testid="input"
          ref={inputRef}
          className="text-gray-600 text-[20px]"
          value={localTitle}
          onKeyUp={keyHandler}
          onChange={changeHandler}
          onFocus={(event) => event.target.select()}
          onBlur={checkEmptyTitle}
        />
      </div>
      <div>
        <Link to={'/'}>
          <button
            data-testid="exit"
            className="transition ease-in-out font-bold p-2 m-2 border-solid border-2 border-green-600 bg-green-600 rounded-xl text-white hover:bg-white hover:text-green-600"
          >
            Exit
          </button>
        </Link>
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="transition ease-in-out font-bold p-2 m-2 border-solid border-2 border-green-600 bg-white-600 rounded-xl text-green-600 hover:bg-green-600 hover:text-white"
        >
          Delete
        </button>
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(!modalOpen)}>
          <h1 className="font-bold text-center">
            Are you sure you want to delete that spreadsheet?
          </h1>
          <div className="text-center mt-5">
            <button
              onClick={deleteSpreadSheet}
              className="transition ease-in-out font-bold p-2 m-2 border-solid border-2 border-green-600 bg-green-600 rounded-xl text-white hover:bg-white hover:text-green-600"
            >
              Yes
            </button>
            <button
              onClick={() => setModalOpen(!modalOpen)}
              className="transition ease-in-out font-bold p-2 m-2 border-solid border-2 border-red-600 bg-white-600 rounded-xl text-red-600 hover:bg-red-600 hover:text-white"
            >
              No
            </button>
          </div>
        </Modal>
      )}
    </nav>
  );
}

export default Navbar;
