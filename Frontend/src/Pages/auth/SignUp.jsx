import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    urn: "",
    class: "",
    section: "",
    crn: ""
  });
  const { role } = useContext(AuthContext);
    
  const { isLogged, setIsLogged } = useContext(AuthContext);
  useEffect(() => {
      if (isLogged) {
          if( role === "admin") {
            navigate("/");
          } else {
            navigate("/events");
          }
      }
    }, [isLogged]);

  const [submitting, setSubmitting] = useState(false);
  const { signup, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      return alert("Passwords do not match");
    }

    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = userDetails;
      await signup(payload);
      setUserDetails({
        name: "", email: "", password: "", confirmPassword: "",
        urn: "", class: "", section: "", crn: ""
      });
      setRole(JSON.parse(localStorage.getItem("authCredentials")).role);
      alert("Login successful");
      setIsLogged(true);
      if( role === "admin") {
            navigate("/");
          } else {
            navigate("/events");
     }
    } catch (err) {
      alert(err.message);
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-[100%] flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white mt-5 mb-5 p-8 rounded-2xl shadow-2xl w-full max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">Create Your Account</h1>
        <form className="space-y-4" onSubmit={submit}>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userDetails.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="e.g. varun@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="urn">URN</label>
            <input
              type="number"
              name="urn"
              id="urn"
              value={userDetails.urn}
              onChange={handleChange}
              placeholder="University Roll Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="class">Class</label>
            <input
              type="text"
              name="class"
              id="class"
              value={userDetails.class}
              onChange={handleChange}
              placeholder="e.g. 10A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="section">Section</label>
            <input
              type="text"
              name="section"
              id="section"
              value={userDetails.section}
              onChange={handleChange}
              placeholder="e.g. A1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="crn">CRN</label>
            <input
              type="number"
              name="crn"
              id="crn"
              value={userDetails.crn}
              onChange={handleChange}
              placeholder="College Roll Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            disabled={submitting}
            className="w-full bg-purple-700 text-white font-semibold py-2 rounded-lg hover:bg-purple-800 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
