import { useState } from 'react';

import useGlobalContext from '../../../context/GlobalContext/useGlobalContext';

import PropTypes from 'prop-types'

import { createQuestionAPI } from '../services';

const QuestionsCreatorComponent = ({ examId, setData}) => {
    
    // State to manage form data
    const [formData, setFormData] = useState({
        content: '',
        type: 'multiple_choice',
        examId: examId,
    });

    const {setModal, setIsLoading, setIsZViewer } = useGlobalContext()

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // Validate if passwords match
    const validateData = () => {
        const { content } = formData;
        if (content == '' ) {
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : `Question Content Is Required`,
            })
            setIsZViewer({
                isActive: false,
                children: null
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
        const response   =  await createQuestionAPI(
            formData.content,
            formData.type,
            formData.examId,
        )
        if (response['status'] == 'error') {
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response['message'],
            })
            setIsLoading(false)
            setIsZViewer({
                isActive: false,
                children: null
            })
            return
        } else {
            setFormData({
                content: '',
                type: '',
                examId: 0,
            })
        }
        const data = response.data
        setData((prevData) => [...prevData, data])
        setIsLoading(false)
        setIsZViewer({
            isActive: false,
            children: null
        })
    };

    return (
        <div className="mb-10 mx-5 group relative w-96 overflow-hidden rounded-2xl bg-gray-300 p-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:via-slate-200 hover:to-charlie">
            <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible " ></div>
            <div className="relative rounded-xl bg-slate-800 p-6">
            <h2 className="text-center text-2xl font-bold text-white mb-6">Create a Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                        Question Type
                    </label>
                    <select 
                        name="type" 
                        id="type"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2"
                    >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="fill_in_the_blank">Fill In The Blank</option>
                        <option value="short_answer">Short Answer</option>
                        <option value="long_answer">Long Answer</option>
                        <option value="matching">Matching</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                        Content
                    </label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2"
                    />
                </div>
                <button
                type="submit"
                className=" hover:cursor-pointer w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                Create Question
                </button>

                <button
                type="button"
                onClick={()=>{
                    setIsZViewer({
                        isActive: false,
                        children: null
                    })
                }}
                className=" hover:cursor-pointer w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                Cancel
                </button>
            </form>
        </div>
    </div>
    );
};


QuestionsCreatorComponent.propTypes = {
    examId : PropTypes.number.isRequired,
    setData : PropTypes.func.isRequired
}

export default QuestionsCreatorComponent;
