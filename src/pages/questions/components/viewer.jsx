import PropTypes from 'prop-types';

import CustomButton from "../../../components/buttons"
import QuestionsCreatorComponent from './creator';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { FaRegObjectUngroup } from "react-icons/fa";
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { LuRefreshCw } from "react-icons/lu";

import ShowQuestionType from './questionHeaders/showQuestionType.jsx';

import useGlobalContext from '../../../context/GlobalContext/useGlobalContext';

const QuestionsViewer = ({rawData, examId}) => {

    useEffect(()=> {
        setData(rawData)
    },[rawData])

    const [data, setData] = useState([])

    const navigate = useNavigate()

    const {setIsLoading, setModal} = useGlobalContext()

    const [isQuestionCreator, setIsQuestionCreator] = useState(false)

    // const [isQuestionEditor, setIsQuestionEditor] = useState(false)

    const createQuestionHandler = () => {
        setIsQuestionCreator(true)
    }


    // const [questionToEditData, setQuestionToEditData] = useState({
    //     name : '', 
    //     description: '',
    //     duration : 0,
    //     isActive : false,
    //     id : ''
    // })

    // const editQuestionHandler = (item) => {
    //     setQuestionToEditData({
    //         name : item.name, 
    //         description: item.description, 
    //         duration: item.duration, 
    //         isActive : item.is_active,
    //         id : item.id
    //     })
    //     setIsQuestionEditor(true)
    // }

    const [openModal, setOpenModal] = useState('')

    const openTheModal = (id) => {
        if (openModal == id){
            setOpenModal('')
        } else{
            setOpenModal(id)
        }
    }

    return (
        <section className="text-slate-300 mt-0 flex-col font-satoshi-blackitalic w-full">
            {
                isQuestionCreator &&
                <QuestionsCreatorComponent 
                    setData={setData}
                    setIsQuestionCreator= {setIsQuestionCreator}
                    examId = {examId}
                />
            }

            {/* {
                isExamEditor &&
                <ExamCreatorComponent 
                    type={'editor'}
                    name={examToEditData.name}
                    description={examToEditData.description}
                    duration={examToEditData.duration}
                    isActive={examToEditData.isActive}
                    examId={examToEditData.id}
                    setIsExamCreator= {setIsExamCreator}
                />
            } */}
            <div className="flex justify-center w-full">
                <CustomButton
                    text={'Create A New Question'}
                    action={createQuestionHandler}
                />

            </div>
            <div className="bg-radial-gradient from-gradient_alpha via-gradient_bravo to-transparent to-70% backdrop-blur-sm mt-5">
                <h2 className="text-center p-5 text-4xl text-delta font-semibold bg-gradient-to-r from-blue-500 to-delta bg-clip-text">
                    Your Exam Questions:
                </h2>
                {data.length === 0 ? (
                    <h2 className="text-center py-5 px-10 text-3xl font-thin text-slate-400 font-satoshi-lightitalic">
                        You haven't questions in this exam yet, please create a new exam.
                    </h2>
                ) : (
                    data.map((item) => {
                        return(
                            <div key={item.id}
                                className='my-2 font-thin text-xl text-slate-400 font-satoshi-lightitalic'
                                >
                                    <div className='mb-2 border-2 rounded-md flex justify-between hover:cursor-pointer hover:bg-slate-800' 
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            event.stopPropagation()
                                            openTheModal(item.id)
                                        }}
                                    >
                                        <div className='w-full'>
                                            <ShowQuestionType
                                                rawItem={item}
                                            />
                                            <div>
                                                <p className="py-2 pl-10 ">
                                                    <span className="text-slate-300 font-bold">Question Content: </span> {item.content}
                                                </p>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                        <div className='flex pr-10 items-center'>
                                            
                                            
                                            <FiDelete className="h-6 w-6  text-amber-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Removes Question"
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    // removesExamHandler(item)
                                                    }}
                                            />
                                            <ReactTooltip id='questions' place="top" type="dark" effect="solid" />
                                        </div>
                                    </div>
                                    {
                                        openModal == item.id &&
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
                        
                    })
                    
                )

                
                }
            </div>
        </section>
    )
}

QuestionsViewer.propTypes = {
    rawData: PropTypes.array.isRequired,
    examId : PropTypes.number.isRequired
};

export default QuestionsViewer