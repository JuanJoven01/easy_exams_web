import PropTypes from 'prop-types'

import CreateMultipleChoiceAnswer from './createMultipleChoiceAns';
import EditMultipleChoiceAnswer from './editMultipleChoiceAns';

import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

import { useState } from 'react';

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const MultipleChoiceAnswer = ({questionData, setQuestionData}) => {

    const [isEditing, setIsEditing] = useState(0)

    const [isCreating, setIsCreating] = useState(false)

    return(

        <div>
            <div className='flex items-center'>
                <div className='mb-2'>
                    <p className=" py-2 px-5 ">
                        <span className="text-slate-300 font-bold">Options:  </span> 
                    </p>
                    <div className='flex items-center'>
                        <div className='flex-col'>
                            {
                                questionData.options.length == 0 && 
                                <p className=" py-2 px-5 ">
                                    {"The question haven't a options yet."}
                                </p>
                            }

                            {
                                questionData.options.length != 0 && 
                                <ul className="max-w-md space-y-1 text-gray-500 list-inside ">
                                    {questionData.options.map((option) => (
                                        
                                            isEditing != option.id ?
                                            (<li key={option.id} className='flex items-center pl-10 '>
                            
                                                <IoCheckmarkDoneCircleOutline 
                                                data-tooltip-id="questions" data-tooltip-content={`${option.is_correct ? 'Correct' : 'Incorrect' }` }
                                                className={` hover:cursor-pointer w-6 h-6 ${option.is_correct ? 'text-green-500' : 'text-red-500' }`} 
                                                
                                                />
                                                <p className='ml-5'>
                                                    {option.content}
                                                </p>
                                                <FiEdit className="h-6 w-6 hover:cursor-pointer  text-cyan-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Edit" 
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setIsEditing(option.id)
                                                    }}
                                                />
                                            </li>)
                                            :
                                            (
                                                <EditMultipleChoiceAnswer 
                                                    option={option}
                                                    setQuestionData={setQuestionData}
                                                    questionData={questionData}
                                                    setIsEditing={setIsEditing}
                                                    key={option.id}
                                                />
                                            )
                                        
                                    ))}
                                </ul>
                            }
                            {
                                isCreating && 

                                <CreateMultipleChoiceAnswer 
                                    questionData={questionData}
                                    setQuestionData={setQuestionData}
                                    setIsCreating={setIsCreating}
                                    />
                                    
                            }
                        </div>
                        
                        {
                            (!isCreating && isEditing==0) &&
                                <div className='flex items-center'>
                                    <IoIosAddCircleOutline className=' h-6 w-6 text-green-500 hover:cursor-pointer mx-3' data-tooltip-id="questions" data-tooltip-content="Add an Option"  
                                    onClick={() => {setIsCreating(true)}}/>
                                </div>
                        }

                    </div>
                </div> 
            </div>
        </div>
    )
}

MultipleChoiceAnswer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default MultipleChoiceAnswer