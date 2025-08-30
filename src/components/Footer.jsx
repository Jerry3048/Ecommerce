import Entericon from "/assets/arrow/entericon.png"
import QRcode from "/assets/arrow/Qrcode .png"
import Applestore from "/assets/arrow/download-appstore.png"
import Playstore from "/assets/arrow/download-playstore.png"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

function Footer() {
  return (
    <div className="bg-black text-white py-10">
      <div className="w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Subscribe Section */}
        <div className="space-y-7">
          <p className="font-bold text-lg">Exclusive</p>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <form className="flex items-center p-2 bg-black rounded overflow-hidden border border-white">
            <input
              type="email"
              placeholder="Enter your email"
              className="text-white outline-none w-full bg-black"
            />
            <button type="submit" className="flex items-center justify-center">
              <img src={Entericon} alt="enter" className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Support Section */}
        <div className="space-y-5">
          <p className="font-bold text-lg">Support</p>
          <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="space-y-5 grid ">
          <p className="font-bold text-lg">Account</p>
          <Link to="/UserAccount">My Account</Link>
          <Link to="/signup">Login / Register</Link>
          <Link to="/CartPage">Cart</Link>
          <Link to="/Wishlist">Wishlist</Link>
          <Link to="/">Shop</Link>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-5 hidden md:block">
          <p className="font-bold text-lg">Quick Links</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>FAQ</p>
          <Link to="/Contact">Contact</Link>
        </div>

        {/* Download App Section */}
        <div className="space-y-5">
          <p className="font-bold text-lg">Download App</p>
          <p>Save $3 with App New User Only</p>
          <div className="flex space-x-2 items-center">
            <img src={QRcode} alt="QR Code" className="h-20 w-20" />
            <div className="space-y-2">
              <img src={Applestore} alt="App Store" className="w-32 h-10" />
              <img src={Playstore} alt="Play Store" className="w-32 h-10" />
            </div>
          </div>
          {/* Socials */}
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-blue-500" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-blue-400" size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-500" size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="hover:text-blue-700" size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;