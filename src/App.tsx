import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const routes = () => {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };
  return <BrowserRouter>{routes()}</BrowserRouter>;
}

export default App;
