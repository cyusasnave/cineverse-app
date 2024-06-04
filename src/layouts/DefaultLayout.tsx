import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedLayout from "./ProtectedLayout";

const DefaultLayout = () => {
  return (
    <ProtectedLayout>
      <Navbar />
      <Outlet />
      <Footer />
    </ProtectedLayout>
  );
};

export default DefaultLayout;
