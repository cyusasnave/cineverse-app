import React, { useEffect } from "react";
import { ChildrenProps } from "../@types/DynamicTypes";
import { useFetcher } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { isError } = useFetcher("/users/loggedInUser");
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      if (isError.status === "UNAUTHORIZED") {
        toast.error("Please login to continue!")
        navigate("/")
      }
      return;
    }
  }, [isError, navigate]);

  return children;
};

export default ProtectedLayout;
