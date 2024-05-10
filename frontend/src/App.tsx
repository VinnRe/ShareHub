// import { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Moderate from "./pages/Modereate";
import AccountSettings from "./pages/AccountSettings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route
            path="/share"
            element={
              <>
                <NavBar />
                <Share />
              </>
            }
          />
          <Route
            path="/moderate"
            element={
              <>
                <NavBar />
                <Moderate />
              </>
            }
          />
          <Route
            path="/account-settings"
            element={
              <>
                <NavBar />
                <AccountSettings />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;