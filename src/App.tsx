import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import { CountriesProvider } from "./data/CountriesProvider";

function App() {
  return (
    <div className="App">
      <CountriesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Login />} />
          </Routes>
        </Router>
      </CountriesProvider>
    </div>
  );
}

export default App;
