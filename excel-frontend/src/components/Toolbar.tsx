import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCurrentStyle, setStyle } from '../store/features/cellSlice';
import axios from "axios";

function Toolbar() {
  const { currentCell, currentStyle } = useAppSelector((state) => state.cellReducer);
  const { group } = useAppSelector((state) => state.groupSelectReducer);
  const dispatch = useAppDispatch();

  const [styles] = useState({
    fontWeight: false,
    fontStyle: false,
    textDecoration: false,
  });

  const updateStyle = async (style: any, value: any, cells: string[]) => {
    const updatedStyle = { ...currentStyle, [style]: value };
    dispatch(setCurrentStyle({ style: updatedStyle }));
    await axios.put(`/spreadsheet/${window.location.pathname.split('/')[2]}/styles`, {
      styles: updatedStyle,
      cells
    });
    const targetCell = group.length ? group : [currentCell];
    targetCell.forEach((cell) => {
      dispatch(setStyle({ styleObj: { cell: cell as string, style, value } }));
    });
  };

  const clickHandler = (style: string, value: string) => {
    return async () => {
      const targetCells = (group.length ? group : [currentCell]).filter(Boolean) as string[];
      try {
        if (currentStyle?.[style as keyof typeof styles]) {
          await updateStyle(style, '', targetCells);
        } else {
          await updateStyle(style, value, targetCells);
        }
      } catch (error) {
        console.error('Failed to update style: ', error);
      }
    };
  };

  return (
    <div className="[&>*]:ml-3 [&>*]:p-1 [&>*]:cursor-pointer [&>*]:rounded hover:[&>*]:bg-slate-200">
      <FontAwesomeIcon
        data-testid="bold"
        style={currentStyle?.fontWeight ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('fontWeight', 'bold')}
        icon={faBold}
      />
      <FontAwesomeIcon
        data-testid="italic"
        style={currentStyle?.fontStyle ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('fontStyle', 'italic')}
        icon={faItalic}
      />
      <FontAwesomeIcon
        data-testid="underline"
        style={currentStyle?.textDecoration ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('textDecoration', 'underline')}
        icon={faUnderline}
      />
    </div>
  );
}

export default Toolbar;
