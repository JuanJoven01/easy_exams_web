import PropTypes from 'prop-types';

import CustomButton from "../../../components/buttons"
import CourseCreatorComponent from './creator';
import { useState } from 'react';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";


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
                            <div key={item.id}
                                className='flex justify-between'
                                >
                                <p className="text-center py-2 px-2 text-xl font-thin text-slate-400 font-satoshi-lightitalic">
                                    Name: {item.name}
                                </p>
                                <p className="text-center py-2 px-2 text-xl font-thin text-slate-400 font-satoshi-lightitalic">
                                    Description: {item.description}
                                </p>
                                <p className="text-center py-2 px-2 text-xl font-thin text-slate-400 font-satoshi-lightitalic">
                                    Code: {item.code}
                                </p>
                                <p className="text-center py-2 px-2 text-xl font-thin text-slate-400 font-satoshi-lightitalic">
                                    Access Key: {item.access_key}
                                </p>
                                <FiEdit className="h-6 w-6  text-cyan-400"/>
                                <FiDelete className="h-6 w-6  text-amber-600"/>

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