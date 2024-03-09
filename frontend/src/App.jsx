import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
// import "./pages/login/Login"
// import Login from "./pages/login/Login";
// import SignUp from "./pages/signup/SignUp"

function App() {
  const {authUser} = useAuthContext();
  return <>
    <div className="WallPaper p-4 h-screen flex items-center justify-center main">
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
        <Route path="/login" element={authUser ? <Navigate to="/"/> :  <Login/>}/>
        <Route path="/signup" element={authUser ?<Navigate to = "/"/> : <SignUp/>}/>
      </Routes>
      <Toaster/>
    </div>
  </>;
}

export default App;
