import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/navbar'
import Footer from './components/footer'
import Loading from './components/loading'
import Modal from './components/modal';
import ZViewer from './components/ZViewer';

import MainPage from './pages/mainPage'
import LoginPage from './pages/login';
import CoursesPage from './pages/courses';
import ExamsPage from './pages/exams';
import QuestionsPage from './pages/questions';
import TakeExamPage from './pages/takeExam';
import AttemptsPage from './pages/attempts';

import useGlobalContext from "./context/GlobalContext/useGlobalContext";
import AttemptProvider from './context/AttemptContext/provider'


function App() {
  const { modal, isLoading, isZViewer } = useGlobalContext();

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && <Loading />}
      {modal.isOpen && <Modal />}
      {isZViewer.isActive && <ZViewer />}
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow bg-slate-900">
          <div className="w-full max-w-6xl mx-auto">
          <AttemptProvider>          
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/exams/:id" element={<ExamsPage />} />
                <Route path="/courses/exams/attempts/:id" element={<AttemptsPage />} />
                <Route path="/courses/exams/questions/:id" element={<QuestionsPage />} />
                <Route path="/exam" element={<TakeExamPage />} />
                <Route path="/*" element={<MainPage />} />
              </Routes>
              </AttemptProvider>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
