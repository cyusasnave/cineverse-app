import React, { useEffect } from "react";
import { ChildrenProps } from "../@types/DynamicTypes";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { accessToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      toast.success("Please login to continue!");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return children;
};

export default ProtectedLayout;
