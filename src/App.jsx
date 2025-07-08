import { BrowserRouter, Routes, Route } from 'react-router';
import Home from   "./Pages/home";
import SignIn from './Pages/SignIn';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            {/* <Route path="*" element={<Nomatchcomponent/>} /> */}

          </Routes>
      </BrowserRouter>
  )
}

export default App