import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./auth";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const validateForm = (email, password, confirmPassword) => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return (
      !newErrors.email && !newErrors.password && !newErrors.confirmPassword
    );
  };

  const registerUser = (email, password, confirmPassword) => {
    if (!validateForm(email, password, confirmPassword)) {
      return;
    }

    createUserWithEmailAndPassword(auth, `${email}`, `${password}`)
      .then((userCredentials) => {
        let user = userCredentials.user;

        sendEmailVerification(user)
          .then(() => {
            alert("Email verification sent");
            setTimeout(() => {
              navigate("/verify");
            }, 2000)
          })
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrors({ ...errors, email: "Email already in use" });
        } else if (err.message === "Firebase: Error (auth/invalid-email).") {
          setErrors({ ...errors, email: "Invalid email" });
        } else {
          setErrors({ ...errors, general: err.message });
        }
      });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email: </label>
          <input
            className="border"
            id="email"
            ref={emailRef}
            type="email"
            placeholder="Email"
          />
          {errors.email && <span className='text-red-500'>{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password: </label>
          <input
            className="border"
            ref={passwordRef}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && <span className='text-red-500'>{errors.password}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            className="border"
            ref={confirmPasswordRef}
            id="confirmPassword"
            type="password"
            placeholder="Password"
          />
          {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword}</span>}
        </div>

        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            registerUser(
              emailRef.current.value,
              passwordRef.current.value,
              confirmPasswordRef.current.value
            );
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
