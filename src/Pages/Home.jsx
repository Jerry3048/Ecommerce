import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Sections from "../components/Sections";
import Hometop from "../components/Hometop";




function Home() {
  return (
    <div>
      <Nav />
      <Hometop/>
     <Sections />
      <Footer />
    </div>
  );
}

export default Home;