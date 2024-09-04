import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Admin from "./Screens/Admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
