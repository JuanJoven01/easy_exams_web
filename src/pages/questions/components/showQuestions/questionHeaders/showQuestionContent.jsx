import PropTypes from 'prop-types';
import {  useState } from 'react';
import { FiEdit } from "react-icons/fi";

import { updateQuestionContentAPI } from '../../../services';
import useGlobalContext from '../../../../../context/GlobalContext/useGlobalContext';

const ShowQuestionContent = ({questionData, setQuestionData}) => {
    const {setIsLoading, setModal} = useGlobalContext()


    const [questionContent, setQuestionContent] = useState(questionData.content)

    const handleChange = (event) => {
        setQuestionContent(event.target.value)
    }

    

    const updateQuestionContent = async () => {
        await setIsLoading(true)
        const response = await updateQuestionContentAPI(questionData.id, questionContent)
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
                'content' : response.data.content
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
            <form action={updateQuestionContent} className='flex'>
                <div className='flex py-2 pl-10 w-full '>
                    <label htmlFor="content" className="text-slate-300 font-bold">
                        Question Content:
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        onChange={handleChange}
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
                        value={questionContent}
                    />
                </div>
                <div className='flex items-center'>
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
                </div>
                
            </form>
        </div>
        }
        {
        !isEditing &&
        <div className='flex items-center'>
            <p className=" pl-10 whitespace-pre-line text-slate-300 font-bold ">
                Question Content:
            </p>
            <p className="py-2 pl-10 whitespace-pre-line w-full "
                // onClick={(e)=>{
                //     e.stopPropagation()
                // }}
                >
                {questionData.content}
            </p>
            <div className='flex items-center'>
                <FiEdit className="h-6 w-6  text-cyan-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Change Question Content" 
                onClick={(event) => {
                    event.stopPropagation()
                    setIsEditing(true)
                }}
                />
            </div>
        </div>
        }
        {
            questionData.question_type == 'fill_in_the_blank' &&
            <p className='pl-10 pb-1 underline decoration-dotted dec'>
                Note: For the fill in the blank questions, you should set the blank spaces into brackets. Ex: The capital of Colombia is {"{{Bogota}}"}.
            </p>
        } 
    </div>
        
    )
}

ShowQuestionContent.propTypes ={
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired
}

export default ShowQuestionContent