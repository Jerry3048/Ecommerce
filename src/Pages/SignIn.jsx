import Nav from "../components/Nav";
// import AuthLayout from "../components/AuthLayout";

const SignIn = () => {
  return (
    <div>
        <Nav />
        <div>
             <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
          <form className="space-y-4">
            <input
              type="email/number"
              placeholder="Email or Phone Number"
              className="w-full p-3 border-b rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border-b rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
    </div>
    
  );
};

export default SignIn;