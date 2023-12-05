import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";

function App() {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return <div className={appStyles}>
    <Navbar/>
    <div className="wrapper">Навигация</div>
  </div>;
}

export default App;
