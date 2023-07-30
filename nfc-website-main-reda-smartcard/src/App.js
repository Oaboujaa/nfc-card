import Main from "./components/Main";
import AuthenticationPage from "./Auth/AuthenticationPage";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/auth" element={<AuthenticationPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
  );
}

export default App;
