import { BrowserRouter, Routes, Route } from 'react-router';
import Home from   "./Pages/home";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            {/* <Route path="/:id" element={<Detail />} />
            <Route path="*" element={<Nomatchcomponent/>} /> */}

          </Routes>
      </BrowserRouter>
  )
}

export default App