import PropTypes from 'prop-types';

import CustomButton from "../../../components/buttons"
import CourseCreatorComponent from './creator';
import { useState } from 'react';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { FaRegObjectUngroup } from "react-icons/fa";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const CoursesViewer = ({data}) => {

    const [isCourseEditor, setIsCourseEditor] = useState(false)

    const createCourseHandler = () => {
        setIsCourseEditor(true)
    }

    console.log(data)

    return (
        <section className="text-slate-300 mt-0 flex-col font-satoshi-blackitalic w-full">
            {
                isCourseEditor &&
                <CourseCreatorComponent 
                    type={'creator'}
                    name={''}
                    description={''}
                    setIsCourseEditor= {setIsCourseEditor}
                />
            }
            <div className="flex justify-center w-full">
                <CustomButton
                    text={'Add Existent Course'}
                    action={createCourseHandler}
                    
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
                            <details key={item.id}
                                className='my-2 font-thin text-xl text-slate-400 font-satoshi-lightitalic'
                                name='Accordion Group'
                                >
                                    <summary className='mb-2 border-2 rounded-md flex justify-between hover:cursor-pointer hover:bg-slate-800'>
                                        <p className="py-2 pl-10 ">
                                            <span className="text-slate-300 font-bold">Name: </span> {item.name}
                                        </p>
                                        
                                        <div className='flex pr-10 items-center'>
                                            <FaRegObjectUngroup className="h-6 w-6 text-cyan-400 mx-3 cursor-pointer" data-tooltip-id="courses" data-tooltip-content="Go To Course Exams" />
                                            <FiEdit className="h-6 w-6  text-cyan-400 mx-3" data-tooltip-id="courses" data-tooltip-content="Edit Course"/>
                                            <FiDelete className="h-6 w-6  text-amber-600 mx-3" data-tooltip-id="courses" data-tooltip-content="Removes Course"/>
                                            <ReactTooltip id='courses' place="top" type="dark" effect="solid" />
                                        </div>
                                    </summary>
                                    <div className=' border-x-2 border-b-2'>
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
                            </details>
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