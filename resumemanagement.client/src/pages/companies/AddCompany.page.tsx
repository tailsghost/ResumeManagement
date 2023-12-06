import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";

import { ICreateCompanyDto } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";

import "./companies.scss"

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompanyDto>({
    name: "",
    size: "",
  });

  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Заполните все поля");
      return;
    }

    httpModule
      .post("/Company/Create", company)
      .then((responst) => redirect("/companies"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Добавить новую компанию</h2>
        <TextField
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Размер компании</InputLabel>
          <Select
            value={company.size}
            label="Размер компании"
            onChange={(e) => setCompany({ ...company, size: e.target.value })}
          >
            <MenuItem value="Small">Маленькая</MenuItem>
            <MenuItem value="Medium">Средняя</MenuItem>
            <MenuItem value="Large">Крупная</MenuItem>
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Сохранить
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
