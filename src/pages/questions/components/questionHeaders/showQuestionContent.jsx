import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";

import { updateQuestionContentAPI } from '../../services';
import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';

const ShowQuestionContent = ({rawItem}) => {
    const {setIsLoading, setModal} = useGlobalContext()
    const [item, setItem] = useState(rawItem)
    useEffect(()=>{
        setItem(rawItem)
    },[rawItem])


    const [questionContent, setQuestionContent] = useState(item.content)

    const handleChange = (event) => {
        setQuestionContent(event.target.value)
    }

    

    const updateQuestionContent = async () => {
        await setIsLoading(true)
        const response = await updateQuestionContentAPI(item.id, questionContent)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
        }
        setItem((oldData) =>(
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
            <p className="py-2 pl-10 whitespace-pre-line text-slate-300 font-bold ">
                Question Content:
            </p>
            <p className="py-2 pl-10 whitespace-pre-line ">
                {item.content}
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
    </div>
        
    )
}

ShowQuestionContent.propTypes ={
    rawItem: PropTypes.array.isRequired,
}

export default ShowQuestionContent