import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import Header from '../../components/header'
import QuestionsViewer from './components'

import { getQuestionsAPI } from './services'

import useGlobalContext from '../../context/GlobalContext/useGlobalContext'

const QuestionsPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {setIsLoading, setModal} = useGlobalContext()
    const [questions, setQuestion] = useState([]);

    useEffect(()=>{
        const fetchQuestions = async () => {
            setIsLoading(true)
            const localStorageLogin = localStorage.getItem('easyAppsLogin');
            if (localStorageLogin) {
                const questionsData = await  getQuestionsAPI(id);
                if (questionsData.status == 'error'){
                    setModal({
                        'isOpen' : true,
                        'isError' : true,
                        'message' : questionsData.message,
                    })
                    // localStorage.removeItem('easyAppsLogin')
                    navigate('/')
                }
                setQuestion(questionsData.data);
            } else {
                navigate('/')
            }
            setIsLoading(false);
        }

        fetchQuestions()
    },[id, setModal, setIsLoading, navigate])
    

    return (
        <div className=' backdrop-blur-3xl'>
            <Header
                subtitle={`Here you can see and manage your exams that belongs to a course${questions[0] ? ` named ${questions[0].exam_name}.` : '.'  } `}
            />
            <QuestionsViewer
                rawData = {questions}
                examId={id}
            />
        </div>
    )
}

export default QuestionsPage