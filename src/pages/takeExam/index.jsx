import { useEffect } from "react"
import { useNavigate } from "react-router"

import useGlobalContext from "../../context/GlobalContext/useGlobalContext"

import Header from "../../components/header"
import ShowAQuestion from "./showAQuestion"

import { getRawQuestionsAPI, getRawAnswersAPI } from "./services/index."
import useAttemptContext from '../../context/AttemptContext/useAttemptContext'

const TakeExamPage = () => {

    const navigate = useNavigate()

    const {setIsLoading, setModal} = useGlobalContext()

    const {setAttemptData, setQuestionsAData, questionsAData, attemptData, setAnswersData } = useAttemptContext()

    useEffect(()=>{
        const localStorageAttempt = localStorage.getItem('easyExamsAttempt');
            if (!localStorageAttempt) {
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : 'You haven exams in progress',
                })
                navigate('/')
                return
            }
        setAttemptData(JSON.parse(localStorageAttempt))
        const fetchRawQuestions = async () => {
            setIsLoading(true)
            const response = await  getRawQuestionsAPI();
            if (response.status == 'error'){
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response.message,
                })
                localStorage.removeItem('easyExamsAttempt')
                setIsLoading(false)
                navigate('/')
                return
            }
            console.log(response)
            setQuestionsAData(response.data)
            setIsLoading(false)
        }
        const fetchRawAnswers = async () => {
            setIsLoading(true)
            const response = await  getRawAnswersAPI();
            if (response.status == 'error'){
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response.message,
                })
                localStorage.removeItem('easyExamsAttempt')
                setIsLoading(false)
                navigate('/')
                return
            }
            console.log(response)
            setAnswersData(response.data)
            setIsLoading(false)
        }
        fetchRawQuestions()
        fetchRawAnswers()
    },[navigate, setModal, setIsLoading, setAttemptData, setQuestionsAData, setAnswersData])

    return (
        <div>
            <Header 
                title={attemptData.exam_name}
                subtitle={`Welcome ${attemptData.student_name}`}
            />
            
            {
                questionsAData.length != 0 &&
                <ShowAQuestion 
                />
            }
        </div>
    )

}

export default TakeExamPage