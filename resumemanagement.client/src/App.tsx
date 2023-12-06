import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./components/context/theme.context";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.component";
import CustomLianerLoader from "./components/CustomLinearLoader/CustomLianerLoader.component";

const Home = lazy(() => import("./pages/home/Home.page"));
const Companies = lazy(() => import("./pages/companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));

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
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
