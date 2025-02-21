
import ShowQuestionType from "./questionHeaders/showQuestionType"
import ShowQuestionContent from "./questionHeaders/showQuestionContent"

import { FiEdit } from "react-icons/fi";

import { FaRegObjectUngroup } from "react-icons/fa";

import { LuRefreshCw } from "react-icons/lu";

import useGlobalContext from "../../../../context/GlobalContext/useGlobalContext";

import QuestionHeader from "./questionHeaders";

import { useEffect, useState } from "react";

import PropTypes from 'prop-types'

const ShowQuestions = ({question}) => {

    const [questionData, setQuestionData] = useState(question)

    useEffect(()=>{
        setQuestionData(question)
    },[question])
    const [openModal, setOpenModal] = useState('')

    const openTheModal = (id) => {
        if (openModal == id){
            setOpenModal('')
        } else{
            setOpenModal(id)
        }
    }


    return(
        <div
            className='my-2 font-thin text-xl text-slate-400 font-satoshi-lightitalic'
            >
                <div className='mb-2 border-2 rounded-md flex justify-between hover:cursor-pointer hover:bg-slate-800' 
                    onClick={(event)=>{
                        event.preventDefault()
                        event.stopPropagation()
                        openTheModal(questionData.id)
                    }}
                    >
                    <QuestionHeader
                        questionData={questionData}
                        setQuestionData={setQuestionData}
                    />
                </div>
                {
                    openModal == questionData.id &&
                    <div className=' border-x-2 border-b-2 rounded-md'>
                        {/* <div className='  '>
                            <div className=' mb-2 flex justify-around'>
                                <div className='flex items-center'>
                                    <p className="py-2">
                                        <span className="text-slate-300 font-bold">Access Code: </span> {item.access_code}
                                    </p>
                                    <LuRefreshCw  className='h-6 w-6 text-green-600 mx-3 cursor-pointer' data-tooltip-id="exams" data-tooltip-content="Refresh code" 
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        updateCodeHandler(item.id)
                                        }}
                                    />
                                </div>
                                
                                <p className="py-2">
                                    <span className="text-slate-300 font-bold">Duration:  </span> {item.duration} minutes
                                </p>
                                <div className='flex items-center'>
                                    <p className={`py-2 ${item.is_active ? 'text-blue-400' : 'text-red-300'}  `} >
                                        <span className="text-slate-300 font-bold">Is Active:  </span> {item.is_active ? 'Yes' : 'No'}
                                    </p>
                                    <LuRefreshCw  className='h-6 w-6 text-green-600 mx-3 cursor-pointer' data-tooltip-id="exams" data-tooltip-content={`${item.is_active ? 'Deactivate': 'Activate'}`} 
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            updateStatusHandler(item.id)
                                            }}
                                        />
                                </div>
                                
                            </div>
                        </div>
                        <div className='mb-2'>
                            <p className=" py-2 px-5 ">
                                <span className="text-slate-300 font-bold">Description:  </span> {item.description == '' ? "The course haven't a description yet." : item.description}
                            </p>
                        </div> */}
                        
                    </div>
                }
        </div>
    )
}

ShowQuestions.propTypes ={
    question: PropTypes.object.isRequired
}


export default ShowQuestions