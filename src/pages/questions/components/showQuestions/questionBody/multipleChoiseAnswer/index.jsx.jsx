import PropTypes from 'prop-types'

import CreateMultipleChoiceAnswer from './createMultipleChoiceAns';
import EditMultipleChoiceAnswer from './editMultipleChoiceAns';

import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";

import { useState } from 'react';

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext';

import { removesOptionAPI } from '../../../../services/options';

const MultipleChoiceAnswer = ({questionData, setQuestionData}) => {

    const [isEditing, setIsEditing] = useState(0)

    const [isCreating, setIsCreating] = useState(false)

    const {setIsLoading, setModal} = useGlobalContext()

    const removesOptionHandler = async (id) => {
        setIsLoading(true)

        const response = await removesOptionAPI(id)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setQuestionData((prevData)=> {
            const newArray = questionData.options.map(((item)=>(item)))
            const index = newArray.findIndex((item) => item.id ==id)
            newArray.splice(index,1)
            return ({
                ...prevData,
                options: newArray
            })
        })
        setIsLoading(false)

    }

    return(

        <div>
            <div className='flex items-center'>
                <div className='mb-2 w-full'>
                    <p className=" py-2 px-5 ">
                        <span className="text-slate-300 font-bold">Options:  </span> 
                    </p>
                    <div className='flex items-center w-full justify-between'>
                        <div className='flex-col w-full'>
                            {
                                questionData.options.length == 0 && 
                                <p className=" py-2 px-5 ">
                                    {"The question haven't a options yet."}
                                </p>
                            }

                            {
                                questionData.options.length != 0 && 
                                <ul className="space-y-1 text-gray-500">
                                    {questionData.options.map((option) => (
                                        
                                            isEditing != option.id ?
                                            (<li key={option.id} className='flex items-center pl-10 w-full '>
                                                <div>
                                                    <IoCheckmarkDoneCircleOutline 
                                                    data-tooltip-id="questions" data-tooltip-content={`${option.is_correct ? 'Correct' : 'Incorrect' }` }
                                                    className={` hover:cursor-pointer w-6 h-6 ${option.is_correct ? 'text-green-500' : 'text-red-500' }`} 
                                                    
                                                    />
                                                </div>
                                                
                                                <p className='ml-5 w-full text-slate-400'>
                                                    {option.content}
                                                </p>
                                                <div className='flex items-center'>
                                                    <div>
                                                        <FiEdit className="h-6 w-6 hover:cursor-pointer  text-cyan-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Edit" 
                                                            onClick={(event) => {
                                                                event.stopPropagation()
                                                                setIsEditing(option.id)
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FiDelete className="h-6 w-6 hover:cursor-pointer  text-amber-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Remove"
                                                            onClick={(event) => {
                                                                event.stopPropagation()
                                                                removesOptionHandler(option.id)
                                                                }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                
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
                                    <IoIosAddCircleOutline className=' h-8 w-8 text-green-500 hover:cursor-pointer mx-5' data-tooltip-id="questions" data-tooltip-content="Add an Option"  
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