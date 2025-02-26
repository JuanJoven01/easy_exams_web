import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

import useGlobalContext from "../../context/GlobalContext/useGlobalContext"

import Header from "../../components/header"
import ShowAQuestion from "./showAQuestion"

import { getRawQuestionsAPI, getRawAnswersAPI } from "./services/index."

const TakeExamPage = () => {

    const navigate = useNavigate()

    const {setIsLoading, setModal} = useGlobalContext()

    const [attemptData, setAttemptData] = useState({
        exam_name : '',
        student_name: ''
    })

    const [questionsAData, setQuestionsAData] = useState([])  

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
            setIsLoading(false)
        }
        fetchRawQuestions()
        fetchRawAnswers()
    },[navigate, setModal, setIsLoading])

    return (
        <div>
            <Header 
                title={attemptData.exam_name}
                subtitle={`Welcome ${attemptData.student_name}`}
            />

            {
                questionsAData.length != 0 &&
                <ShowAQuestion 
                    questionsAData= {questionsAData}
                    setQuestionsAData={setQuestionsAData}
                />
            }
        </div>
    )

}

export default TakeExamPage