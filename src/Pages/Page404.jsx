import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function Page404() {
    const navigate = useNavigate();
  return (
    <div className="">
      <Nav/>
       <div className="text-7xl grid justify-center items-center h-[500px] mx-auto">
           PAGE NOT FOUND
        <button onClick={() => navigate("/")}className="bg-red-600 p-4 text-sm w-[30%] mx-auto rounded-full">return to home page</button>   
       </div>
      <Footer/> 
    </div>
  )
}

export default Page404