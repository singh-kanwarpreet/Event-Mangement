import React, { useState, useEffect, useContext } from 'react';
import { login } from '../../api/auth';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
  const { isLogged, setIsLogged, setRole } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged) {
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/events");
      }
    }
  }, [isLogged]);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(loginDetails);
      setIsLogged(true);
      setLoginDetails({ email: "", password: "" });
      setRole(JSON.parse(localStorage.getItem("authCredentials")).role);
      if (role === "admin") {
        navigate("/");
      } else {
        navigate("/events");
      }
    } catch (err) {
      alert(err.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Login</h1>
        <form className="space-y-5" onSubmit={submit}>
          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={loginDetails.email}
              onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={loginDetails.password}
              onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            disabled={submitting}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
