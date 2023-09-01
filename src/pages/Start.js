import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Start() {
    
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if(email !== ""){
      localStorage.setItem("email", email);
      navigate("/questions");
    }else{
      setMessage('Please Enter Email Address');
      setTimeout(()=>{
        setMessage('');
      },3000)
      
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 h-screen flex justify-center items-center">
      <div className="max-w-xl lg:max-w-lg">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start the Quiz
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-300">
          Email address
        </p>
        <div className="mt-4 flex max-w-md gap-x-4 flex-col">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <div className="text-red-500 mt-1">{message}</div>
          <div className="mt-4 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-center rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
