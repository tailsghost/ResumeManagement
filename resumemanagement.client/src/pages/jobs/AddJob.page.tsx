import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";

import { ICompany, ICreateJobDto } from "../../types/global.typing";
import httpModule from "../../helpers/http.module";

import "./jobs.scss";

const levelArray: string[] = [
  "Intern",
  "Junior",
  "Middle",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState<ICompany[]>([]);

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((responce) => {
        setCompanies(responce.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Заполните все поля");
      return;
    }

    httpModule
      .post("/Job/Create", job)
      .then(() => redirect("/jobs"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Добавить нового сотрудника</h2>
        <TextField
          autoComplete="off"
          label="Job Name"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Уровень работника</InputLabel>
          <Select
            value={job.level}
            label="Уровень работника"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Компания</InputLabel>
          <Select
            value={job.companyId}
            label="Компания"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
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

export default AddJob;
