import { useNavigate } from "react-router";
import { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import SideImg from "/assets/arrow/Side Image.png";
import { auth, googleProvider } from "../firebase/Firebase"; // <-- import auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
} from "firebase/auth";

import Googleicon from "/assets/arrow/Icon-Google.png";

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for sign-up
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      // alert("Signed up!");
      // setSignIn(true)
    } catch (err) {
      setError(err.message);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      // setSignIn(true)
      // alert("Logged in!");
    } catch (err) {
      setError(err.message);
    }
    setEmail("");
    setPassword("");
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
      // setSignIn(true)
      // alert("Signed in with Google!");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <Nav />
    <div className="flex flex-col md:flex-row items-center">
  {/* Image Section */}
  <img
    src={SideImg}
    alt="Side"
    className="w-full md:w-[40%] pt-6 pb-6 object-contain"
  />

  {/* Form Section */}
  <div className="w-full md:w-[50%] mx-auto flex justify-center">
    {isSignIn ? (
      <form
        onSubmit={handleSignUp}
        className="space-y-4 w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%]"
      >
        <h2 className="text-2xl font-bold mb-6">Create an account</h2>
        <p>Enter your details below</p>

        {error && (
          <p className="text-white text-sm bg-black flex justify-center items-center rounded-lg h-[40px]">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>

        <button
          type="button"
          className="flex justify-center w-full py-2 rounded border border-gray-400"
          onClick={handleGoogleSignIn}
        >
          <img src={Googleicon} alt="Googleicon" className="h-6 w-6 mr-2" />
          Sign up with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 underline ml-3"
            onClick={() => {
              setIsSignIn(false);
              setError("");
            }}
          >
            Log in
          </button>
        </p>
      </form>
    ) : (
      <form
        onSubmit={handleLogin}
        className="space-y-4 w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%]"
      >
        <h2 className="text-2xl font-bold mb-6">Log into Exclusive</h2>
        <p>Enter your details below</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-[40%] bg-red-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
          <a href="#" className="text-red-500 underline text-sm">
            Forgot password?
          </a>
        </div>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 underline ml-3"
            onClick={() => {
              setIsSignIn(true);
              setError("");
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    )}
  </div>
</div>
      <Footer />
    </div>
  );
}

export default Auth;
