import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid/models";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../../types/global.typing";

import './jobs-grid.scss'

const column: GridColDef[] = [
  { field: "id", headerName: "Id", width: 100 },
  { field: "title", headerName: "Название вакансии", width: 500 },
  { field: "level", headerName: "Уровень", width: 150 },
  { field: "companyName", headerName: "Название компании", width: 150 },
  {
    field: "createAt",
    headerName: "Время добавления",
    width: 200,
    renderCell: (params) => moment(params.row.createAt).fromNow(),
  },
];

interface IJobsGridProps {
    data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <Box sx={{width: "100%", height: 450}} className="jobs-grid">
      <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50}/>
    </Box>
  );
};

export default JobsGrid;
