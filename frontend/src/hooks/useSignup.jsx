import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(UserContext);

  const signup = async (user) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    } else {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);

      navigate("/appointment");
    }
  };

  return { signup, isLoading, error };
};
