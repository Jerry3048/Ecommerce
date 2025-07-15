import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/Authstore";

function UserAccount() {
  const { user } = useAuthStore(); // Assume your store provides this
  const [info, setInfo] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const saveInfo = () => {
    // Here you'd update the info via API or AuthStore
    console.log("Saved user info:", info);
    setMessage("User info updated successfully!");
  };

  const changePassword = () => {
    const { current, newPass, confirm } = passwords;
    if (!current || !newPass || !confirm) {
      return setMessage("Please fill in all password fields.");
    }
    if (newPass !== confirm) {
      return setMessage("New passwords do not match.");
    }
    // Here you'd send password update request
    console.log("Password changed:", passwords);
    setMessage("Password updated successfully!");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="flex w-[60%] mx-auto p-5 justify-between items-center">
           
        <div className="grid gap-4">
            {/* Order Tracking & Cancellation */}
            <div className="bg-white shadow-md rounded p-6">
              <h3 className="text-xl font-semibold">Orders</h3>
              <p className="text-gray-500">You have no recent orders.</p>
            </div>
    
            {/* Payment Options */}
            <div className="bg-white shadow-md rounded p-6">
              <h3 className="text-xl font-semibold">Payment Methods</h3>
              <p className="text-gray-500">No saved payment method.</p>
            </div>
    
            {message && (
              <div className="text-center text-green-600 font-medium">{message}</div>
            )}
        </div>


        <div className="mt-5 grid gap-10">
          <h2 className="text-2xl font-semibold text-red-600">Edit Your Profile</h2>
  
          {/* User Info */}
          <div className=" rounded space-y-4">
            <h3 className="text-xl font-semibold">User Information</h3>
  
            <div className=" space-y-7">
             <div className="flex items-center gap-7 ">
                <div>
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstname"
                    value={info.firstname}
                    onChange={handleInfoChange}
                    placeholder="First Name"
                    className="bg-gray-200 px-4 py-2 rounded"
                  />
                </div>
  
  
                <div>
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lastname"
                    value={info.lastname}
                    onChange={handleInfoChange}
                    placeholder="Last Name"
                    className="bg-gray-200 px-4 py-2 rounded"
                  />
                </div>
             </div>
  
            <div className="flex items-center gap-7" >
    
                <div>
                  <p>Email</p>
                    <input
                      type="email"
                      name="email"
                      value={info.email}
                      onChange={handleInfoChange}
                      placeholder="Email Address"
                      className="bg-gray-200 px-4 py-2 rounded col-span-2"
                    />
                </div>
                <div>
                  <p>Email</p>
                    <input
                      type="text"
                      name="adress"
                      value={info.address}
                      onChange={handleInfoChange}
                      placeholder="Adress"
                      className="bg-gray-200 px-4 py-2 rounded col-span-2"
                    />
                </div>
            </div>
            </div>
            <button
              onClick={saveInfo}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>
  
          {/* Password Change */}
          <div className=" rounded space-y-4">
            <h3 className="text-xl font-semibold">Change Password</h3>
            <div className="grid gap-4">
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className="bg-gray-200 px-4 py-2 rounded"
              />
              <input
                type="password"
                name="newPass"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="bg-gray-200 px-4 py-2 rounded"
              />
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm New Password"
                className="bg-gray-200 px-4 py-2 rounded"
              />
            </div>
            <button
              onClick={changePassword}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Update Password
            </button>
          </div>
      </div>

  
      </div>
      <Footer />
    </div>
  );
}

export default UserAccount;