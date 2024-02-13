import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {ISpreadsheet} from "../../interfaces.ts";

function TablesList() {


  const [spreadsheets, setSpreadsheets] = React.useState<ISpreadsheet[]>([]);

  useEffect(() => {
    const getSpreadsheets = async () => {
      try {
        const { data } = await axios.get('/spreadsheet/');
        console.log(data)
        setSpreadsheets(data);
      } catch (error) {
        console.error('Failed to GET spreadsheets: ', error);
      }
    };

    getSpreadsheets().catch((error) => {
      console.error('An error occurred while getting the spreadsheets:', error);
    });
  }, []);

  if (spreadsheets.length === 0)  return <p>You don't have any spreadsheets...</p>

  return (
    <>
      <div className="flex justify-between text-[16px] font-medium mb-[10px] px-[12px]">
        <span>Name</span>
        <span>Date of open</span>
      </div>
      <ul className="m-0 p-0 list-none">
        {spreadsheets.map((spreadsheet, index) => (
          <Link
            to={`/excel/${spreadsheet._id}`}
            key={index}
          >
            <li
              className="flex rounded-full justify-between items-center p-2 md:p-3 lg:p-4 mb-4 hover:bg-green-200 hover:rounded-full"
              key={index}
            >
              <p className="no-underline hover:underline text-gray-700 text-base md:text-lg lg:text-xl">
                {spreadsheet.title}
              </p>
              <strong>
                {spreadsheet.updatedAt}
              </strong>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default TablesList;
