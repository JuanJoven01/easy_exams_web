import PropTypes from 'prop-types'
import { useState } from 'react'
import { FiEdit } from "react-icons/fi";

import { updateQuestionCorrectAnswerAPI } from '../../../services';

import useGlobalContext from '../../../../../context/GlobalContext/useGlobalContext';

const ShortLongAnswer = ({questionData, setQuestionData}) => {

    const [isEditing, setIsEditing] = useState(false)

    const [correctAnswer, setCorrectAnswer] = useState(questionData.correct_answer)

    const {setIsLoading, setModal} = useGlobalContext()

    const changeHandler = (event)=> {
        event.preventDefault()
        setCorrectAnswer(event.target.value)

    }

    const updateAnswer = async () => {
        setIsLoading(true)
        const response = await updateQuestionCorrectAnswerAPI(questionData.id,correctAnswer )
        if (response.status =='error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setQuestionData((prevData)=>({
            ...prevData,
            correct_answer: response.data.correct_answer
        }))
        setIsLoading(false)
        setIsEditing(false)
    }

    return(

        <div>
            {
        isEditing &&
            <div className=''>
                <form action={updateAnswer} className='flex'>
                    <div className='flex py-2 pl-10 w-full '>
                        <label htmlFor="correct_answer" className="text-slate-300 font-bold">
                            Correct Answer:
                        </label>
                        <textarea
                            name="correct_answer"
                            id="correct_answer"
                            onChange={(e)=>{changeHandler(e)}}
                            required
                            className="  mx-5 w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2 hover:cursor-pointer hover:border-blue-500 hover:ring hover:ring-blue-500 hover:ring-opacity-50"
                            style={{
                                'scrollbarColor': 'rgba(0, 255, 234, 0.08) rgba(61, 200, 255, 0.08)',
                                'fieldSizing': 'content'
                                }}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                            value={correctAnswer}
                        />
                    </div>
                    <div className='flex items-center'>
                        <button
                            type="submit"
                            className=" m-2 px-3 hover:cursor-pointer  bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md "
                            onClick={(event)=>{
                                event.stopPropagation()
                            }}
                            >
                                Update
                        </button>

                        <button
                            type="button"
                            onClick={(event)=>{
                                event.stopPropagation()
                                setIsEditing(false)
                            }}
                            className="  m-2 px-3 hover:cursor-pointer  bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md "
                            >
                                Cancel
                        </button>
                    </div>
                    
                </form>
            </div>
        }
        {
            !isEditing &&
            <div className='flex items-center'>
                <div className='mb-2'>
                <p className=" py-2 px-5 ">
                    <span className="text-slate-300 font-bold">Correct Answer:  </span> {questionData.correct_answer == '' ? "The question haven't a correct answer yet." : questionData.correct_answer}
                </p>
            </div> 
            <div>
                <FiEdit className="h-6 w-6 hover:cursor-pointer  text-cyan-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Change Question Content" 
                    onClick={(event) => {
                        event.stopPropagation()
                        setIsEditing(true)
                    }}
                    />
            </div>
            
        </div>
            
        }
    </div>
    )
}

ShortLongAnswer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default ShortLongAnswer