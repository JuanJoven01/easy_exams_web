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

    return (
        <AttemptContext.Provider value={{ 
                attemptData,
                setAttemptData,
                questionsAData,
                setQuestionsAData,
                showedQuestion,
                setShowedQuestion,
                answersData,
                setAnswersData
                }}>
            {children}
        </AttemptContext.Provider>
    );
    };


export default AttemptProvider