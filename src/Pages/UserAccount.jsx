import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/Authstore";
import { NavLink } from "react-router";

function UserAccount() {
  // Get user info from global store
  const { user } = useAuthStore();

  // State to hold editable user info
  const [info, setInfo] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  // State for password change form
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  // Feedback messages and options
  const [message, setMessage] = useState("");
  const [saveForCheckout, setSaveForCheckout] = useState(false);

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------
  // Save user profile changes
  // -----------------------------
  const saveInfo = () => {
    // Replace this with API/store update
    console.log("Saved user info:", info);
    setMessage("User info updated successfully!");
    setTimeout(() => setMessage(""), 5000);
  };

  // -----------------------------
  // Handle password update
  // -----------------------------
  const changePassword = () => {
    const { current, newPass, confirm } = passwords;

    if (!current || !newPass || !confirm) {
      return setMessage("Please fill in all password fields.");
    }

    if (newPass !== confirm) {
      return setMessage("New passwords do not match.");
    }

    // Replace with password update API
    console.log("Password changed:", passwords);
    setMessage("Password updated successfully!");
    setTimeout(() => setMessage(""), 5000);
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 space-y-10">
      <Nav />

      {/* Breadcrumbs and welcome */}
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div>
          <NavLink to="/">Home</NavLink> /{" "}
          <NavLink to="/CartPage" className="font-semibold">
            Account
          </NavLink>
        </div>
        <p>Welcome {info.firstname}</p>
      </div>

      {/* Main Content: Info + Actions */}
      <div className="flex w-[60%] mx-auto p-5 justify-between items-start">

        {/* LEFT PANEL: Orders + Payment */}
        <div className="grid gap-4">
          {/* Orders Section */}
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-semibold">Orders</h3>
            <p className="text-gray-500">You have no recent orders.</p>
          </div>

          {/* Payment Section */}
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-semibold">Payment Methods</h3>
            <p className="text-gray-500">No saved payment method.</p>
          </div>

          {/* Success/Info Message */}
          {message && (
            <div className="text-center text-green-600 font-medium">
              {message}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: User Info + Password */}
        <div className="mt-5 grid gap-10">

          {/* User Info Form */}
          <div className="rounded space-y-4">
            <h2 className="text-2xl font-semibold text-red-600">
              Edit Your Profile
            </h2>

            <h3 className="text-xl font-semibold">User Information</h3>

            {/* Name Fields */}
            <div className="space-y-7">
              <div className="flex items-center gap-7">
                <div>
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstname"
                    value={info.firstname}
                    onChange={handleInfoChange}
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
                    className="bg-gray-200 px-4 py-2 rounded"
                  />
                </div>
              </div>

              {/* Email & Address Fields */}
              <div className="flex items-center gap-7">
                <div>
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    value={info.email}
                    onChange={handleInfoChange}
                    className="bg-gray-200 px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <p>Address</p>
                  <input
                    type="text"
                    name="address"
                    value={info.address}
                    onChange={handleInfoChange}
                    className="bg-gray-200 px-4 py-2 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Save for future */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="saveForCheckout"
                checked={saveForCheckout}
                onChange={() => setSaveForCheckout((prev) => !prev)}
                className="h-4 w-4"
              />
              <label htmlFor="saveForCheckout" className="text-sm">
                Save this information for faster checkout next time
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={saveInfo}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>

          {/* Password Change Form */}
          <div className="rounded space-y-4">
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

            {/* Update Password Button */}
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