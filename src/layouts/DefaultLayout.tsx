import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProtectedLayout from "./ProtectedLayout";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ProtectedLayout>
      <Navbar />
      <Outlet />
      <Footer />
    </ProtectedLayout>
  );
};

export default DefaultLayout;
