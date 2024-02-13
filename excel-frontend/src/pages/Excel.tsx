import { useLocation } from 'react-router-dom';
import Formula from '../components/Formula';
import Navbar from '../components/Navbar';
import Toolbar from '../components/Toolbar';
import Table from '../components/table/Table';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setState } from '../store/features/cellSlice';
import axios from "axios";


function Excel() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const setStateLocalStorage = async () => {
      try {
        const {data} = await axios.get(`/spreadsheet/${location.pathname.split('/')[2]}`);
        console.log(data)
        dispatch(setState({state: data[0]}));
        setIsFetched(true);
      } catch (error) {
        console.error('Failed to GET spreadsheet: ' ,error);
      }
    };

    setStateLocalStorage().catch(error => {
      console.error('An error occurred while setting the local storage state:', error);
    });
  }, [dispatch, location.pathname]);

  return (
    <>
      {isFetched ? (
        <>
          <Navbar />
          <Toolbar />
          <Formula />
          <Table />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Excel;
