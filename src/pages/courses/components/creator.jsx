import { useState } from 'react';

import useGlobalContext from '../../../context/GlobalContext/useGlobalContext';

import PropTypes from 'prop-types'

import { createCourseAPI, updateCourseAPI } from '../services/courses';

const CourseCreatorComponent = ({type, name, description, setIsCourseEditor, courseId}) => {

    const authInfo = localStorage.getItem('easyAppsLogin')
    const jsonInfo = JSON.parse(authInfo)
    const token = jsonInfo.token

    // State to manage form data
    const [formData, setFormData] = useState({
        rawType: type,
        type: type == 'creator' ? 'Create Course': 'Edit Course',
        button: type == 'creator' ? 'Create': 'Update',
        name: name,
        description: description,
        courseId : courseId
    });

    const {setModal, setIsLoading } = useGlobalContext()

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const closeModalHandler = () => {
        setIsCourseEditor(false)
    }

    // Validate if passwords match
    const validateData = () => {
        const { name } = formData;
        if (name.length < 4 ) {
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : `The Name Must  Unless 5 Characters`,
            })
            return true
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData()){
            return 
        }
        setIsLoading(true)
        if (formData.rawType == 'creator'){
            // Process form data
            console.log('before call api to create')
            const response   =  await createCourseAPI(
                formData.name,
                formData.description,
                token
            )
            if (response['status'] == 'error') {
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response['message'],
                })
                setIsLoading(false)
                return
            } else {
                setFormData({
                    name: '',
                    description: '',
                })
            }
        } else if (formData.rawType == 'editor'){
            // Process form data
            const response   =  await updateCourseAPI(
                formData.name,
                formData.description,
                formData.courseId,
                token
            )
            console.log(response)
            if (response['status'] == 'error') {
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response['message'],
                })
                setIsLoading(false)
                return
            } else {
                setFormData({
                    name: '',
                    description: '',
                })
            }
        }
        setIsLoading(false)
        setIsCourseEditor(false)
        window.location.reload()
    };

    return (
        <section className="flex justify-center absolute z-50 w-full backdrop-grayscale-100  ">
                <div className="mb-10 mx-5 group relative w-96 overflow-hidden rounded-2xl bg-gray-300 p-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:via-slate-200 hover:to-charlie">
                    <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible " ></div>
                    <div className="relative rounded-xl bg-slate-800 p-6">
                    <h2 className="text-center text-2xl font-bold text-white mb-6">Create Course</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        
                        <button
                        type="submit"
                        className=" hover:cursor-pointer w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                        {formData.button}
                        </button>

                        <button
                        type="cancel"
                        onClick={closeModalHandler}
                        className=" hover:cursor-pointer w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                        Cancel
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};


CourseCreatorComponent.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    setIsCourseEditor : PropTypes.func.isRequired,
    courseId : PropTypes.number
}

export default CourseCreatorComponent;
