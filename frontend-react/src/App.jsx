import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import "./styles/app.css";

function AppRoutes() {
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            onSuccess={(data) => {
              setReceipt(data);
              navigate("/success");
            }}
          />
        }
      />
      <Route path="/success" element={<Success receipt={receipt} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
