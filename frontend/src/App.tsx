import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="p-10 min-h-screen transition-colors duration-300">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
