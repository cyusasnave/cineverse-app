import React from "react";
import { ChildrenProps } from "../@types/DynamicTypes";
import useToken from "../hooks/useToken";
import { toast } from "sonner";

const ProtectedLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { accessToken } = useToken();

  if (!accessToken) {
    toast.success("Please login to continue!");
    window.location.replace("/login");
    return;
  }

  return children;
};

export default ProtectedLayout;
