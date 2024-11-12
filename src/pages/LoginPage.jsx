import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/micro-components/InputField";
import { useDispatch } from "react-redux";
import { loggedUser } from "../redux/slice/usersSlice";

const LoginPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsersData(data);
  };

  const generateToken = () => {
    return Math.random().toString(8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userIsValid = true;
    const newErrors = {};

    Object.keys(input).forEach((key) => {
      if (!input[key].trim()) {
        newErrors[key] = "This field is required";
        userIsValid = false;
      }
    });

    if (!userIsValid) {
      setErrors(newErrors);
      return;
    }

    const foundUser = usersData.find(
      (user) => user.email === input.email && user.password === input.password
    );

    if (foundUser) {
      dispatch(loggedUser(foundUser));
      const token = generateToken();
      localStorage.setItem("token", token);
      localStorage.setItem("usersData", JSON.stringify(foundUser));
      navigate("/");
    } else {
      setErrors({ invalidCred: "Invalid email or password" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    if (value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <div className="form-container">
      <h3>Login form</h3>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email"
          name="email"
          value={input.email}
          onChange={handleChange}
          error={errors.email}
          ref={emailRef}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          value={input.password}
          onChange={handleChange}
          error={errors.password}
          ref={passwordRef}
        />
        <button type="submit" className="submit-button">
          Login
        </button>
        {errors.invalidCred && <p className="error">{errors.invalidCred}</p>}
        <p>
          Don't have an account?{" "}
          <span>
            <Link to="/signupPage">Signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
