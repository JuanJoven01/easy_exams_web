import PropTypes from 'prop-types';

import CustomButton from "../../../components/buttons"
import CourseCreatorComponent from './creator';
import CourseEliminatorComponent from './eliminator';
import AddUserToCourseComponent from './addUsers';
import { useState } from 'react';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { FaRegObjectUngroup } from "react-icons/fa";
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { useNavigate } from 'react-router';

const CoursesViewer = ({data}) => {

    const navigate = useNavigate()

    const [isCourseCreator, setIsCourseCreator] = useState(false)

    const createCourseHandler = () => {
        setIsCourseCreator(true)
    }

    const [isCourseEditor, setIsCourseEditor] = useState(false)

    const [courseToEditData, setCourseToEditData] = useState({
        name : '', 
        description: '', 
        id : ''
    })

    const editCourseHandler = (item) => {
        setCourseToEditData({
            name : item.name, 
            description: item.description, 
            id : item.id
        })
        setIsCourseEditor(true)
    }

    const [isCourseEliminator, setIsCourseEliminator] = useState(false)

    const [courseToRemovesData, setCourseToRemovesData] = useState({
        name : '',
        id : ''
    })

    const removesCourseHandler = (item) => {
        setCourseToRemovesData({
            name : item.name,
            id : item.id
        })
        setIsCourseEliminator(true)
    }

    const [isAddUserModal, setAddUserModal] = useState(false)

    const addUserToCourseHandler = () => {
        setAddUserModal(true)
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
                isCourseCreator &&
                <CourseCreatorComponent 
                    type={'creator'}
                    name={''}
                    description={''}
                    setIsCourseEditor= {setIsCourseCreator}
                />
            }

            {
                isCourseEditor &&
                <CourseCreatorComponent 
                    type={'editor'}
                    name={courseToEditData.name}
                    description={courseToEditData.description}
                    courseId={courseToEditData.id}
                    setIsCourseEditor= {setIsCourseEditor}
                />
            }

            {
                isCourseEliminator &&
                <CourseEliminatorComponent 
                    name={courseToRemovesData.name}
                    courseId= {courseToRemovesData.id}
                    setIsCourseEliminator={setIsCourseEliminator}
                />
            }
            {
                isAddUserModal &&
                <AddUserToCourseComponent 
                    setAddUserModal={setAddUserModal}
                />
            }
            <div className="flex justify-center w-full">
                <CustomButton
                    text={'Add Existent Course'}
                    action={addUserToCourseHandler}
                    
                />
                <CustomButton
                    text={'Create A New Course'}
                    action={createCourseHandler}
                />

            </div>
            <div className="bg-radial-gradient from-gradient_alpha via-gradient_bravo to-transparent to-70% backdrop-blur-sm mt-5">
                <h2 className="text-center p-5 text-4xl text-delta font-semibold bg-gradient-to-r from-blue-500 to-delta text-transparent bg-clip-text">
                    Your Courses:
                </h2>
                {data.length === 0 ? (
                    <h2 className="text-center py-5 px-10 text-3xl font-thin text-slate-400 font-satoshi-lightitalic">
                        You haven't courses yet, please create a new course or add one with code and key.
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
                                            <FaRegObjectUngroup className="h-6 w-6 text-cyan-400 mx-3 cursor-pointer" data-tooltip-id="courses" data-tooltip-content="Go To Course Exams" 
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                navigate(`exams/${item.id}`)
                                                }}/>
                                            <FiEdit className="h-6 w-6  text-cyan-400 mx-3" data-tooltip-id="courses" data-tooltip-content="Edit Course" 
                                                onClick={(event) => {
                                                event.stopPropagation()
                                                editCourseHandler(item)
                                                }}
                                            />
                                            <FiDelete className="h-6 w-6  text-amber-600 mx-3" data-tooltip-id="courses" data-tooltip-content="Removes Course"
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    removesCourseHandler(item)
                                                    }}
                                            />
                                            <ReactTooltip id='courses' place="top" type="dark" effect="solid" />
                                        </div>
                                    </div>
                                    {
                                        openModal == item.id &&
                                        <div className=' border-x-2 border-b-2 rounded-md'>
                                            <div className='  '>
                                                <div className=' mb-2 flex justify-around'>
                                                    <p className="py-2">
                                                    <span className="text-slate-300 font-bold">Code: </span> {item.code}
                                                    </p>
                                                    <p className="py-2">
                                                        <span className="text-slate-300 font-bold">Access Key:  </span> {item.access_key}
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

CoursesViewer.propTypes = {
    data: PropTypes.array
};

export default CoursesViewer