import { useNavigate } from "react-router-dom";
import { ChildrenProps } from "../@types/DynamicTypes";
import useToken from "../hooks/useToken";
import { useEffect } from "react";

const UnprotectedLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { accessToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
      return;
    }
  }, [accessToken, navigate]);

  return children;
};

export default UnprotectedLayout;
