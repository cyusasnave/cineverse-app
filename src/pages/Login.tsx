// import { useState } from "react";
import RegisterLogin from "../components/RegisterLogin";
import React, { useEffect, useState } from "react";
import openEye from "../assets/open-eye.png";
import closedEye from "../assets/closed-eye.png";
import Button from "../components/Button";
import { API } from "../utils/api";
import useToken from "../hooks/useToken";
import { toast } from "sonner";
import IconLoader from "../components/Icon/IconLoader";

const initialFormData = {
  email: "",
  password: "",
};

const initialState = { isLoading: false, error: null };

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formdata, setFormdata] = useState(initialFormData);
  const [state, setState] = useState(initialState);
  const { saveAccessToken } = useToken();

  useEffect(() => {
    const login = {
      email,
      password,
    };
    setFormdata(login);
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(initialState);

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await API.post("/users/signin", formdata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setFormdata(initialFormData);
      saveAccessToken(res.data?.token);
      toast.success(res.data?.message);
      setTimeout(() => {
        window.location.replace("/");
      }, 300);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error:
          error.response?.data?.message ||
          error.message ||
          "Unknown error occured! Please try again!",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <>
      <RegisterLogin
        text="Don't have an account?"
        buttonText="SIGNUP"
        location="/register"
        formText="Welcome Back!"
      >
        <form action="" className="w-full" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative flex items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-5 top-2 cursor-pointer"
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
              formdata.email === "" ||
              formdata.password === "" ||
              state.isLoading
            }
            text={
              state.isLoading ? (
                <>
                  <IconLoader className="animate-spin mr-1" />{" "}
                  {" Authenticating..."}
                </>
              ) : (
                "SIGNIN"
              )
            }
            width="w-full"
          />
        </form>
      </RegisterLogin>
    </>
  );
};

export default Login;
