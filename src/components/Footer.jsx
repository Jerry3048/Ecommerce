import Entericon from "/assets/arrow/entericon.png"
import QRcode from "/assets/arrow/Qrcode .png"
import Applestore from "/assets/arrow/download-appstore.png"
import Playstore from "/assets/arrow/download-playstore.png"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
<div className="bg-black text-white">
        <div className='w-[90%] mx-auto flex justify-evenly h-[400px] gap-x-8'>
          <div className="space-y-7 mt-20 flex-1">
            <p className="font-bold text-lg">Exclusive</p>
            <p className="">Subscribe</p>
            <p className="">Get 10% off your first order</p>
            <form className="flex items-center bg-black rounded overflow-hidden border-white border-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-1 py-2 text-white outline-none "
              />
              <button
                type="submit"
                className=" px-1 py-1 flex items-center justify-center"
              >
                <img src={Entericon} alt="enter" className="w-4 h-4" />
              </button>
            </form>
          </div>
    
          <div className="space-y-7 mt-20 flex-1">
            <p>Support</p>
            <p className="">111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh. </p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
            <p></p>
          </div>
    
          <div className="space-y-7 mt-20 flex-1">
            <p>Account</p>
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
             <p>Shop</p>
          </div>
    
            <div className="space-y-7 mt-20 flex-1">
                <p>Quick Link</p>
                <p>Privacy Policy</p>
                <p>Terms of Use</p>
                <p>FAQ</p>
                <p>Contact</p>
            </div>
    
            <div className="space-y-3 mt-20 flex-1">
                <p>Download App</p>
                <p>Save $3 with App New User Only</p>
                <div className="flex space-x-2 items-center">
                    <img src={QRcode} alt="App Store" className="h-22" />
                        <div className=" space-y-2">
                            <img src={Applestore} alt="App Store" className="w-32 h-10" />
                            <img src={Playstore} alt="Play Store" className="w-32 h-10" />
                        </div> 
                </div>   
                <div className="flex space-x-4 mt-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="text-white hover:text-blue-500" size={20} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-white hover:text-blue-400" size={20} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-white hover:text-pink-500" size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="text-white hover:text-blue-700" size={20} />
                    </a>
               </div>
          </div>
        </div>
</div>
  )
}

export default Footer