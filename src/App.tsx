import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const routes = () => {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };
  return <BrowserRouter>{routes()}</BrowserRouter>;
}

export default App;
