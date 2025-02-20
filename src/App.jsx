import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/navbar'
import Footer from './components/footer'
import Loading from './components/loading'
import Modal from './components/modal';

import MainPage from './pages/mainPage'
import LoginPage from './pages/login';
import CoursesPage from './pages/courses';
import ExamsPage from './pages/exams';

import useGlobalContext from "./context/GlobalContext/useGlobalContext";



function App() {
  const { modal, isLoading } = useGlobalContext();

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && <Loading />}
      {modal.isOpen && <Modal />}
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow bg-slate-900">
          <div className="w-full max-w-6xl mx-auto">
            
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/exams/:id" element={<ExamsPage />} />
                <Route path="/*" element={<MainPage />} />
              </Routes>
            
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
