import { useState } from 'react';
import AttemptContext from './context';


export const AttemptProvider = ({ children }) => {
    const [attemptData, setAttemptData] = useState({
            exam_name : '',
            student_name: ''
        })
    
    const [questionsAData, setQuestionsAData] = useState([]) 

    const [answersData, setAnswersData] = useState([]) 

    const [showedQuestion, setShowedQuestion] = useState(0)

    const [sendAnswer , setSendAnswer] = useState(()=> {return})

    return (
        <AttemptContext.Provider value={{ 
                attemptData,
                setAttemptData,
                questionsAData,
                setQuestionsAData,
                showedQuestion,
                setShowedQuestion,
                sendAnswer,
                setSendAnswer,
                answersData,
                setAnswersData
                }}>
            {children}
        </AttemptContext.Provider>
    );
    };


export default AttemptProvider