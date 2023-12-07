import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid/models";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { ICompany } from "../../types/global.typing";

import './companies-grid.scss'

const column: GridColDef[] = [
  { field: "id", headerName: "Id", width: 100 },
  { field: "name", headerName: "Имя", width: 200 },
  { field: "size", headerName: "Размер", width: 150 },
  {
    field: "CreateAt",
    headerName: "Дата добавления",
    width: 200,
    renderCell: (params) => moment(params.row.CreateAt).format("YYYY-MM-DD"),
  }
];

interface ICompaniesGridProps {
    data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  return (
    <Box sx={{width: "100%", height: 450}} className="companies-grid">
      <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50}/>
    </Box>
  );
};

export default CompaniesGrid;
