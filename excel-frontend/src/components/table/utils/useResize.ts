import { useState, DragEvent } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { setColState, setRowState } from '../../../store/features/cellSlice';
import axios from "axios";

interface ICell {
  resizable: any;
  data_col?: number;
  data_row?: number;
  type?: string;
}

const useResize = ({ resizable, type, data_col, data_row }: ICell) => {
  const [initialPos, setInitialPos] = useState<number>(-5000);
  const [initialSize, setInitialSize] = useState<number>(-5000);
  const dispatch = useAppDispatch();

  const initial = (e: DragEvent<HTMLDivElement>) => {
    setInitialPos(type === 'col' ? e.clientX : e.clientY);
    setInitialSize(
      type === 'col'
        ? Number(resizable?.offsetWidth)
        : Number(resizable?.offsetHeight)
    );
  };

  const endResize = async (e: DragEvent) => {
    const resizer = document.getElementById(`resizer-${type}`);
    try {
      if (type === 'col') {
        resizable!.style.width = `${
            initialSize + String(e.clientX - Number(initialPos))
        }px`;

        dispatch(
            setColState({
              coords: String(data_col),
              col: initialSize + (e.clientX - initialPos),
            })
        );

        await axios.put(`/spreadsheet/${window.location.pathname.split('/')[2]}/col/${data_col}`, {
          size: initialSize + (e.clientX - initialPos)
        });
      } else {
        resizable!.style.height = `${initialSize + (e.clientY - initialPos)}px`;

        dispatch(
            setRowState({
              coords: String(data_row),
              row: initialSize + (e.clientY - initialPos),
            })
        );
        await axios.put(`/spreadsheet/${window.location.pathname.split('/')[2]}/row/${data_row}`, {
          size: initialSize + (e.clientY - initialPos)
        });
      }

    } catch (error) {
        console.error('An error occurred while resizing:', error);
    }

    resizer!.style[`${type === 'col' ? 'left' : 'top'}`] = `${-5000}px`;
  };

  const resize = (e: DragEvent) => {
    const resizer = document.getElementById(`resizer-${type}`);
    const table = document.querySelector('[data-component="table"]');
    const topTable = table!.getBoundingClientRect().top;

    if (type === 'col') {
      resizer!.style.left = `${e.clientX}px`;
    } else {
      resizer!.style.top = `${e.clientY - topTable}px`;
    }
  };

  return { resize, endResize, initial };
};

export default useResize;
