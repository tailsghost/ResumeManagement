import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./components/context/theme.context";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.component";
import CustomLianerLoader from "./components/CustomLinearLoader/CustomLianerLoader.component";

const Home = lazy(() => import("./pages/home/Home.page"));
const Companies = lazy(() => import("./pages/companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));
const Jobs = lazy(() => import("./pages/jobs/Jobs.page"))
const AddJob = lazy(() => import("./pages/jobs/AddJob.page"))

function App() {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLianerLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany/>}/>
            </Route>
            <Route path="/jobs">
            <Route index element={<Jobs />} />
              <Route path="add" element={<AddJob/>}/>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
