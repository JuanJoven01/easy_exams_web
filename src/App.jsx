import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/navbar'
import Footer from './components/footer'
import Loading from './components/loading'
import Modal from './components/modal';

import MainPage from './pages/mainPage'
import LoginPage from './pages/Login';

import useGlobalContext from "./context/GlobalContext/useGlobalContext";



function App() {
  const { modal, isLoading } = useGlobalContext();

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && <Loading />}
      {modal.isOpen && <Modal />}
      <Navbar />
      <div className="flex-grow bg-slate-900">
        <div className="w-full max-w-6xl mx-auto">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App
