import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";

import "./jobs.scss";
import httpModule from "../../helpers/http.module";
import { IJob } from "../../types/global.typing";
import JobsGrid from "../../components/jobs/JobsGrid.component";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((responce) => {
        setJobs(responce.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return <div className="content jobs">
    <div className="heading">
      <h2>Вакансии</h2>
      <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
        <Add/>
      </Button>
    </div>
    {
      loading ? <CircularProgress size={100}/> : jobs.length === 0 ? <h1>Нет вакансий у компаний</h1> : <JobsGrid data={jobs}/>
    }
  </div>;
};

export default Jobs;
