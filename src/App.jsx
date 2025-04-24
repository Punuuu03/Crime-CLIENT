import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
// import Dashboard from './components/Dashboard'; // You can add more routes later
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Uploadfiles from "./components/Uploadfiles/Uploadfiles";
import Caseshistory from './components/Caseshistory/Caseshistory';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<Sidebar><Dashboard /></Sidebar>} />
        <Route path="/uploadfiles" element={<Sidebar><Uploadfiles /></Sidebar>} />
        <Route path="/caseshistory" element={<Sidebar><Caseshistory /></Sidebar>} />
        {/* <Route path="/case-analysis" element={<Sidebar><CaseAnalysis /></Sidebar>} /> */}
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
