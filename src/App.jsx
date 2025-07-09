import { BrowserRouter, Routes, Route } from 'react-router';
import Home from   "./Pages/home";
import SignUp from './Pages/SignUp';
import Page404 from './Pages/Page404';



function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
             <Route path="*" element={<Page404/>} />

            {/* <Route path="*" element={<Nomatchcomponent/>} /> */}

          </Routes>
      </BrowserRouter>
  )
}

export default App