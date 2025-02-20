import PropTypes from 'prop-types';

import CustomButton from "../../../components/buttons"
import ExamCreatorComponent from './creator';
// import ExamEliminatorComponent from './eliminator';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { FaRegObjectUngroup } from "react-icons/fa";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ExamsViewer = ({data, courseId}) => {

    const navigate = useNavigate()

    const [isExamCreator, setIsExamCreator] = useState(false)

    const createExamHandler = () => {
        setIsExamCreator(true)
    }


    const [examToEditData, setExamToEditData] = useState({
        name : '', 
        description: '',
        duration : 0,
        isActive : false,
        id : ''
    })

    const editExamHandler = (item) => {
        setExamToEditData({
            name : item.name, 
            description: item.description, 
            duration: item.duration, 
            isActive : item.is_active,
            id : item.id
        })
        setIsExamCreator(true)
    }

    const [isExamEliminator, setIsExamEliminator] = useState(false)

    const [examToRemovesData, setExamToRemovesData] = useState({
        name : '',
        id : ''
    })

    const removesExamHandler = (item) => {
        setExamToRemovesData({
            name : item.name,
            id : item.id
        })
        setIsExamEliminator(true)
    }

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
                isExamCreator &&
                <ExamCreatorComponent 
                    type={'creator'}
                    name={''}
                    description={''}
                    duration={0}
                    isActive={false}
                    setIsExamCreator= {setIsExamCreator}
                    courseId = {courseId}
                />
            }

            {
                isExamCreator &&
                <ExamCreatorComponent 
                    type={'editor'}
                    name={examToEditData.name}
                    description={examToEditData.description}
                    duration={examToEditData.duration}
                    isActive={examToEditData.isActive}
                    examId={examToEditData.id}
                    setIsExamCreator= {setIsExamCreator}
                />
            }

            {/* {
                isExamEliminator &&
                <ExamEliminatorComponent 
                    name={examToRemovesData.name}
                    courseId= {examToRemovesData.id}
                    setIsCourseEliminator={setIsExamEliminator}
                />
            } */}
            <div className="flex justify-center w-full">
                <CustomButton
                    text={'Create A New Exam'}
                    action={createExamHandler}
                />

            </div>
            <div className="bg-radial-gradient from-gradient_alpha via-gradient_bravo to-transparent to-70% backdrop-blur-sm mt-5">
                <h2 className="text-center p-5 text-4xl text-delta font-semibold bg-gradient-to-r from-blue-500 to-delta bg-clip-text">
                    Your Exams:
                </h2>
                {data.length === 0 ? (
                    <h2 className="text-center py-5 px-10 text-3xl font-thin text-slate-400 font-satoshi-lightitalic">
                        You haven't exams in this course yet, please create a new exam.
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
                                        }}>
                                        <p className="py-2 pl-10 ">
                                            <span className="text-slate-300 font-bold">Name: </span> {item.name}
                                        </p>
                                        
                                        <div className='flex pr-10 items-center'>
                                            <FaRegObjectUngroup className="h-6 w-6 text-cyan-400 mx-3 cursor-pointer" data-tooltip-id="exams" data-tooltip-content="Go To Exam Questions" 
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                navigate(`exams/${item.id}`)
                                                }}/>
                                                
                                            <FiEdit className="h-6 w-6  text-cyan-400 mx-3" data-tooltip-id="exams" data-tooltip-content="Edit Exam" 
                                                onClick={(event) => {
                                                event.stopPropagation()
                                                editExamHandler(item)
                                                console.log(item, 'item')
                                                }}
                                            />
                                            <FiDelete className="h-6 w-6  text-amber-600 mx-3" data-tooltip-id="exams" data-tooltip-content="Removes Exam"
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    removesExamHandler(item)
                                                    }}
                                            />
                                            <ReactTooltip id='exams' place="top" type="dark" effect="solid" />
                                        </div>
                                    </div>
                                    {
                                        openModal == item.id &&
                                        <div className=' border-x-2 border-b-2 rounded-md'>
                                            <div className='  '>
                                                <div className=' mb-2 flex justify-around'>
                                                    <p className="py-2">
                                                    <span className="text-slate-300 font-bold">Access Code: </span> {item.access_code}
                                                    </p>
                                                    <p className="py-2">
                                                        <span className="text-slate-300 font-bold">Duration:  </span> {item.duration} minutes
                                                    </p>
                                                    <p className={`py-2 ${item.is_active ? 'text-blue-400' : 'text-red-300'}  `} >
                                                        <span className="text-slate-300 font-bold">Is Active:  </span> {item.is_active ? 'Yes' : 'No'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='mb-2'>
                                                <p className=" py-2 px-5 ">
                                                    <span className="text-slate-300 font-bold">Description:  </span> {item.description == '' ? "The course haven't a description yet." : item.description}
                                                </p>
                                            </div>
                                            
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

ExamsViewer.propTypes = {
    data: PropTypes.array.isRequired,
    courseId : PropTypes.number.isRequired
};

export default ExamsViewer