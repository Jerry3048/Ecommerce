import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from   './Pages/Home';
import SignUp from './Pages/SignUp';
import Page404 from './Pages/Page404';
import CartPage from './Pages/CartPage';
import Wishlist from './Pages/Wishlist';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // your firebase config
import { useAuthStore } from './store/Authstore';

function App() {
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user); // store user in Zustand
  });
  return () => unsubscribe();
}, []);

  return ( 
    <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/CartPage" element={<CartPage />} />
             <Route path="/Wishlist" element={<Wishlist/>} />
             <Route path="*" element={<Page404/>} />


          </Routes>
      </BrowserRouter>
  )
}

export default App