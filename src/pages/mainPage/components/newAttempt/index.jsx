import { useEffect, useState } from 'react';
import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import { useNavigate } from 'react-router';

import newAttemptAPI from '../../services';

const NewAttemptComponent = () => {

    const navigate = useNavigate()
  // State to manage form data
    const [formData, setFormData] = useState({
        access_code: '',
        name: '',
        id: '',
    });

    const {setModal, setIsLoading, setIsLogged } = useGlobalContext()

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: (([name] == 'access_code') ? value.toUpperCase() : value),
        }));
    };
    // handle login in local storage

    // Handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true)
        
        // Process form data
        const response   =  await newAttemptAPI(
            formData.access_code,
            formData.name,
            formData.id
        )
        
        if (response['status'] == 'error') {
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response['message'],
            })
            setIsLoading(false)
            return
        }

        setFormData({
            access_code: '',
            name: '',
            id: '',
        })
        localStorage.setItem('easyExamsAttempt', JSON.stringify(response.data))
        navigate("/exam")
        console.log(response)
        setIsLoading(false)
    };

    return (
        <section className="flex justify-center">
        <div className="mb-10 mx-5 group relative w-96 overflow-hidden rounded-2xl bg-gray-300 p-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:via-slate-200 hover:to-charlie">
            <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
            <div className="relative rounded-xl bg-slate-800 p-6">
            <h2 className="text-center text-2xl font-bold text-white mb-6">To Take An Exam Set The From</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="access_code" className="block text-sm font-medium text-gray-300">
                        Access Code:
                    </label>
                    <input
                        type="text"
                        id="access_code"
                        name="access_code"
                        value={formData.access_code}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Student Name:
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Student ID:
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 "
                    />
                </div>
                <button
                type="submit"
                className=" hover:cursor-pointer w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                Start
                </button>
            </form>
            </div>
        </div>
        </section>
    );
};

export default NewAttemptComponent;
