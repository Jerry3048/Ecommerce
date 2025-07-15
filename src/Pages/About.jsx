import Nav from "../components/Nav";
import { NavLink } from "react-router";
import SideImg from "/assets/arrow/Side Image (1).png";
import { FaHome, FaDollarSign, FaShoppingBag,FaCoins } from "react-icons/fa";

export default function About() {
  return (
    <div className="space-y-7">
        <Nav/>
        <div className="flex w-[80%] mx-auto">
            <NavLink to="/">Home</NavLink> /{" "}
            <NavLink to="/About" className="font-semibold">
            About
            </NavLink>
        </div>
        <div className="flex items-center justify-between">
           <div className="p-10 pl-40 max-w-[50%] grid justify-center items-center space-y-7">
                <p className="text-3xl font-bold">Our Story</p>
                <p>Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
           </div>
           <img src={SideImg} alt="Side" className="w-[40%]" />
        </div>
        <div>
        <div className="flex justify-between items-center mb-50 mt-20 w-[70%] mx-auto">
              <div className="flex flex-col items-center border border-gray-400 p-2">
                <div className="bg-gray-400 w-17 h-17 rounded-full flex justify-center items-center">
                    <FaHome size={30} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold text-center">10.5k</p>
                <p className="text-sm">Sallers active our site</p>
              </div>

              <div className="flex flex-col items-center border border-gray-400 p-2">
                <div className="bg-gray-400 w-17 h-17 rounded-full flex justify-center items-center">
                    <FaDollarSign size={30} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold text-center">33k</p>
                <p className="text-sm">Monthly Product Sale</p>
              </div>

              <div className="flex flex-col items-center border border-gray-400 p-2">
                <div className="bg-gray-400 w-17 h-17 rounded-full flex justify-center items-center">
                    <FaShoppingBag size={30} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold text-center">45.5k</p>
                <p className="text-sm">Customer active in our site</p>
              </div> 

              <div className="flex flex-col items-center border border-gray-400 p-2">
                <div className="bg-gray-400 w-17 h-17 rounded-full flex justify-center items-center">
                    <FaCoins size={30} className="text-white bg bg-black rounded-full w-13 h-13 flex justify-center items-cente p-3"/>  
                </div>
                <p className="text-2xl font-semibold text-center">25k</p>
                <p className="text-sm">Anual grass sale in our site</p>
              </div> 
        </div>
        </div>
    </div>   
  )
}
