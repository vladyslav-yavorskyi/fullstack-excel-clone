
export interface ICell {
  id: string | number;
  width: number;
  content: string;
  data_col: number;
  data_row: number;
  type?: string;
}

export interface IStaticCell {
  type: string;
  width: number;
  height: number;
  content: string;
  data_col?: number;
  data_row?: number;
}

export interface ISpreadsheet {
  _id?: string;
  __v?: number;
  updatedAt?: string;
  createdAt?: string;

  title: string;
  dataState: {
    [key: string]: string;
  };
  stylesState: {
    [key: string]: object;
  };
  currentStyle?: {
    [key: string]: string;
  };
  colState: {
    [key: string]: Number;
  };
  rowState: {
    [key: string]: Number;
  };
  currentText?: string;
  currentCell?: string;
}

