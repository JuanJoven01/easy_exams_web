import PropTypes from 'prop-types';
import {  useState } from 'react';
import { FiEdit } from "react-icons/fi";

import { updateQuestionTypeAPI } from '../../../services';
import useGlobalContext from '../../../../../context/GlobalContext/useGlobalContext';

const ShowQuestionType = ({questionData, setQuestionData}) => {
    const {setIsLoading, setModal} = useGlobalContext()

    const dictToTypes = {
        "multiple_choice": 'Multiple Choice',
        "fill_in_the_blank": 'Fill In The Blank',
        "short_answer": 'Short Answer',
        "long_answer": 'Long Answer',
        "matching":'Matching',
    }

    const [questionType, setQuestionType] = useState(questionData.question_type)

    const handleChange = (event) => {
        setQuestionType(event.target.value)
    }

    

    const updateQuestionType = async () => {
        setIsLoading(true)
        const response = await updateQuestionTypeAPI(questionData.id, questionType)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setQuestionData((oldData) =>(
            {
                ...oldData,
                'question_type' : response.data.question_type,
                'correct_answer': response.data.correct_answer
            }
        ))
        setIsLoading(false)
        setIsEditing(false)
    }

    const [isEditing, setIsEditing] = useState(false)
    return(
    <div >
        {
        isEditing &&
        <div className=''>
            <form action={updateQuestionType} className='flex'>
                <div className='flex py-2 pl-10 '>
                    <label htmlFor="type" className="text-slate-300 font-bold">
                        Question Type:
                    </label>
                    <select 
                        defaultValue={questionType}
                        name="type" 
                        id="type"
                        onChange={handleChange}
                        required
                        className=" mx-5 rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2 hover:cursor-pointer hover:border-blue-500 hover:ring hover:ring-blue-500 hover:ring-opacity-50"
                        onClick={(event)=>{
                            event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="fill_in_the_blank">Fill In The Blank</option>
                        <option value="short_answer">Short Answer</option>
                        <option value="long_answer">Long Answer</option>
                        <option value="matching">Matching</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className=" m-2 px-3 hover:cursor-pointer  bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md "
                    onClick={(event)=>{
                        event.stopPropagation()
                        setModal('')
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
            </form>
        </div>
        }
        {
        !isEditing &&
        <div className='flex items-center'>
            <p className="py-2 pl-10 ">
                <span className="text-slate-300 font-bold">Question Type: </span> {dictToTypes[questionData.question_type]}
            </p>
            <FiEdit className="h-6 w-6  text-cyan-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Change Question Type" 
            onClick={(event) => {
                event.stopPropagation()
                setIsEditing(true)
            }}
        />
        </div>
        }
    </div>
        
    )
}

ShowQuestionType.propTypes ={
    questionData: PropTypes.array.isRequired,
    setQuestionData: PropTypes.func.isRequired
}

export default ShowQuestionType