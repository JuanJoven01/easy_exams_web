import PropTypes from 'prop-types'
import {  useEffect, useState } from 'react'

import { updateQuestionCorrectAnswerAPI } from '../../../../services';

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext';

import ToggleComponent from '../../../../../../components/toggle';

const FillInTheBlankAnswer = ({questionData, setQuestionData}) => {

    const [correctAnswer, setCorrectAnswer] = useState(questionData.correct_answer)

    const {setIsLoading, setModal} = useGlobalContext()

    const changeHandler = async (event)=> {
        event.preventDefault()
        setCorrectAnswer((prevCorrectAnswer) => {
            if (prevCorrectAnswer == 'ordered') {
                return 'disordered';
            } else if (prevCorrectAnswer == 'disordered') {
                return 'ordered';
            }
        });
    }
    
    useEffect(()=>{
        const updateCorrectAnswer = async () => {
            setIsLoading(true)
            const response = await updateQuestionCorrectAnswerAPI(questionData.id, correctAnswer )
            if (response.status =='error'){
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response.message,
                })
                setIsLoading(false)
                return
            }
            setCorrectAnswer(response.data.correct_answer)
            setQuestionData((prevData)=>({
                ...prevData,
                correct_answer: response.data.correct_answer
            }))
            setIsLoading(false)
    
        }
        updateCorrectAnswer()
    },[setCorrectAnswer, correctAnswer,setModal,setIsLoading,setQuestionData,questionData.id])
    
    

    return(

        <div className='pt-4'>
            <div className='mb-2 flex items-center justify-center'>
                <p className="text-slate-300 font-bold">The blank spaces should be:  </p> 
                <p className={`ml-2 ${correctAnswer == 'disordered'? ' text-green-600' : ''}`}>Disordered</p>
                <ToggleComponent 
                content= ''
                value= {correctAnswer == 'ordered'}
                handleToggle= {changeHandler}
                />
                <p className={`ml-2 ${correctAnswer == 'ordered'? ' text-green-600' : ''}`}>Ordered</p>
            </div> 
        </div>
    )
}

FillInTheBlankAnswer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default FillInTheBlankAnswer