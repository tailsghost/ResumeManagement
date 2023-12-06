 import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";

 import { Button, CircularProgress } from "@mui/material";
 import { Add } from "@mui/icons-material";

 import "./companies.scss";
 import httpModule from "../../helpers/http.module";
 import { ICompany } from "../../types/global.typing";
 import CompaniesGrid from "../../components/companies/CompaniesGrid.component";

 const Companies = () => {
   const [companies, setCompanies] = useState<ICompany[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const redirect = useNavigate();

   useEffect(() => {
     setLoading(true);
     httpModule
       .get<ICompany[]>("/Company/Get")
       .then((responce) => {
         setCompanies(responce.data);
         setLoading(false);
       })
       .catch((error) => {
         alert("Error");
         console.log(error);
         setLoading(false);
       });
   }, []);

  return <div className="content companies">
     <div className="heading">
       <h2>Компании</h2>
       <Button variant="outlined" onClick={() => redirect("/companies/add")}>
         <Add/>
       </Button>
     </div>
     {
       loading ? <CircularProgress size={100}/> : companies.length === 0 ? <h1>Нет компаний</h1> : <CompaniesGrid data={companies}/>
     }
   </div>;
 };

 export default Companies;
