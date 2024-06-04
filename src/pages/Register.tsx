// import { useState } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import closedEye from "../assets/closed-eye.png";
import openEye from "../assets/open-eye.png";
import Button from "../components/Button";
import IconLoader from "../components/Icon/IconLoader";
import RegisterLogin from "../components/RegisterLogin";
import useToken from "../hooks/useToken";
import UnprotectedLayout from "../layouts/UnprotectedLayout";
import { API } from "../utils/api";
import { toast } from "sonner";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialState = { isLoading: false, error: null };

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formdata, setFormdata] = useState(initialFormData);
  const [state, setState] = useState(initialState);
  const { saveAccessToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const register = {
      name,
      email,
      password,
      confirmPassword,
    };
    setFormdata(register);
  }, [confirmPassword, email, name, password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(initialState);
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await API.post("/users/signup", formdata, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      setFormdata(initialFormData);
      saveAccessToken(res.data?.token);
      navigate("/");
      toast.success(res.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error:
          error.response?.data.message ||
          error.message ||
          "Unknown erroe occured! Please try again!",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <UnprotectedLayout>
      <RegisterLogin
        text="Have an account?"
        buttonText="SIGNIN"
        location="/login"
        formText="Create an account and watch Endless movies"
      >
        <form action="" className="w-full" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              className="form-input"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              className="form-input"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative flex items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-input"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-5 top-2"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? (
                <img src={openEye} className="w-6" />
              ) : (
                <img src={closedEye} className="w-6" />
              )}
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-input"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute right-5 top-2"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? (
                <img src={openEye} className="w-6" />
              ) : (
                <img src={closedEye} className="w-6" />
              )}
            </div>
          </div>
          {state.error && (
            <div className="w-full h-max text-red-600 text-xs py-2 mb-5 text-center">
              {state.error}
            </div>
          )}
          <Button
            type="submit"
            disabled={
              formdata.name === "" ||
              formdata.email === "" ||
              formdata.password === "" ||
              formdata.confirmPassword === "" ||
              state.isLoading
            }
            text={
              state.isLoading ? (
                <>
                  <IconLoader className="animate-spin mr-1" />{" "}
                  {" Authenticating..."}
                </>
              ) : (
                "SIGNUP"
              )
            }
            width="w-full"
          />
        </form>
      </RegisterLogin>
    </UnprotectedLayout>
  );
};

export default Register;
