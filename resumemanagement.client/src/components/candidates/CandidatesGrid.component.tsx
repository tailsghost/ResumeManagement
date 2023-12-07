import "./candidates-grid.scss"

import { Box } from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";

import { GridColDef } from "@mui/x-data-grid/models";
import { DataGrid } from "@mui/x-data-grid";
import { ICandidate } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constants";

const column: GridColDef[] = [
  { field: "id", headerName: "Id", width: 100 },
  { field: "firstName", headerName: "Имя", width: 120 },
  { field: "lastName", headerName: "Фамилия", width: 120 },
  { field: "email", headerName: "Почта", width: 150 },
  { field: "phone", headerName: "Телефон", width: 150 },
  { field: "coverLetter", headerName: "C V", width: 400 },
  {
    field: "resumeUrl",
    headerName: "Скачать",
    width: 150,
    renderCell: (params) => (
      <a href={`${baseUrl}/Candidate/dowload/${params.row.resumeUrl}`} download>
        <PictureAsPdf/>
      </a>
    ),
  }
];

interface ICandidatesGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidatesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="candidates-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
