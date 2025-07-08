import { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import SideImg from "/assets/arrow/Side Image.png";
import Googleicon from "/assets/arrow/Icon-Google.png"

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      <Nav />
      <div className="flex items-center">
        <img src={SideImg} alt="Side" className="screen w-[805px] pt-10 pb-10" />
        <div className="flex-col justify-center items-center w-[50%] mx-auto">
          {isSignIn ? (
              <form className="space-y-4 w-[50%] mx-auto">
              <h2 className="text-2xl font-bold mb-6">Create an account</h2>
              <p>Enter your details below</p>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
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
                className="w-full py-2 rounded border-1 border-gray-400 flex justify-center items-center"
              >
                <img src={Googleicon} alt="goggleicon" className="w-6 h-6 mr-2" />
                Sign up with Google
              </button>
              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 underline ml-3"
                  onClick={() => setIsSignIn(false)}
                >
                  Log in
                </button>
              </p>
            </form>
          ) : (
             <form className="space-y-4 w-[50%] mx-auto">
              <h2 className="text-2xl font-bold mb-6">Log into Exclusive</h2>
              <p>Enter your details below</p>
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border-b focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="w-[30%] bg-red-500 text-white py-2 rounded hover:bg-blue-700"
                >
                  Log In
                </button>
                <p className="text-sm text-center">
                  <a href="#" className="text-red-500 underline ml-3">
                    forget password?
                  </a>
                </p>
              </div>
              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 underline ml-3"
                  onClick={() => setIsSignIn(true)}
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