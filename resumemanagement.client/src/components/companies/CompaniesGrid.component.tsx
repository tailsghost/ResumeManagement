import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/context/theme.context";

 import httpModule from "../../helpers/http.module";

import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid/models";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { ICompany } from "../../types/global.typing";

 import EditIcon from '@mui/icons-material/Edit';

import './companies-grid.scss'

interface ICompaniesGridProps {
    data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  const { idString, setIdString } = useContext(ThemeContext);

  const redirect = useNavigate();

  const column: GridColDef[] = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Имя", width: 200 },
    { field: "size", headerName: "Размер", width: 150 },
    {
      field: "CreateAt",
      headerName: "Дата добавления",
      width: 200,
      renderCell: (params) => moment(params.row.CreateAt).format("YYYY-MM-DD"),
    },
    {
      field: "update",
      headerName: "Редактирование",
      headerAlign: "right",
      width:150, 
      renderCell: () => renderDetailsButtom(),
      align: "center"
    }
  ];

  const renderDetailsButtom = () => {
    return (
      <EditIcon/>
    )
  }

  const EditCompany = (props: any) => {   
    httpModule
      .get<ICompany>(`Company/Get/${props.id}`)
      .then((responce) => {
        setIdString(responce.data.id);
        redirect(`/companies/Get/${idString}`)
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }

  return (
    <Box sx={{width: "100%", height: 450}} className="companies-grid">
      <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} onCellClick={(prop) => EditCompany(prop)}/>
    </Box>
  );
};

export default CompaniesGrid;
