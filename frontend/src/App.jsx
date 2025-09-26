import { Navigate, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import "./App.css";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={authUser ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={authUser ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/signup'
          element={authUser ? <Navigate to='/' /> : <SignUp />}
        />
      </Routes>
    </>
  );
}

export default App;
