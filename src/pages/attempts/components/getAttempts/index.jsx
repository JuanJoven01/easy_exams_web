

import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import useGlobalContext from "../../../../context/GlobalContext/useGlobalContext";

import { getAttemptsAPI, getQuestionsAPI } from "../../services";

const GetAttemptsComponent = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const {setIsLoading, setModal} = useGlobalContext()

    const [form, setForm] = useState({
        startDate: getCurrentDate(),
        endDate: getCurrentDate()
    })

    const [attempts, setAttempts ] = useState(null)
    const [questions, setQuestions] = useState(null)

    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setForm((prevData)=>({
            ...prevData,
            [name]: value
        }
        ))
    }

    const getAttempts = async () =>{
        console.log(form)
        setIsLoading(true)
        const localStorageLogin = localStorage.getItem('easyAppsLogin');
        if (localStorageLogin) {
            const response = await  getAttemptsAPI(id, form.startDate, form.endDate);
            if (response.status == 'error'){
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response.message,
                })
                // localStorage.removeItem('easyAppsLogin')
                // navigate('/')
            }
            console.log("Attempts")
            console.log(response)
            setAttempts(response.data)

        } else {
            navigate('/')
        }
        setIsLoading(false);
        getQuestions()
    }

    const getQuestions = async () =>{
        console.log(form)
        setIsLoading(true)
        const localStorageLogin = localStorage.getItem('easyAppsLogin');
        if (localStorageLogin) {
            const response = await  getQuestionsAPI(id);
            if (response.status == 'error'){
                setModal({
                    'isOpen' : true,
                    'isError' : true,
                    'message' : response.message,
                })
                // localStorage.removeItem('easyAppsLogin')
                // navigate('/')
            }
            console.log('Questions')
            console.log(response)
            setQuestions(response.data)

        } else {
            navigate('/')
        }
        setIsLoading(false);

    }

    
    return (
        <div>
            <form action={getAttempts} className="my-2 text-xl text-slate-300 font-satoshi-lightitalic flex justify-center items-center flex-wrap">
            <div className="pb-2">
                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    defaultValue={form.startDate}
                    onChange={(e)=>changeHandler(e)}
                    className="border-2 rounded-xl mx-2 hover:cursor-pointer px-1"
                />
            </div>
            <div className="py-2">
                <label htmlFor="endDate" className="font-bold">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    defaultValue={form.endDate}
                    onChange={(e)=>changeHandler(e)}
                    className="border-2 rounded-xl mx-2 hover:cursor-pointer px-1"
                />
            </div>
            <div className="" >
                <button
                    type="submit"
                    className=" hover:cursor-pointer py-1 px-2 bg-blue-500 hover:bg-blue-700 text-slate-200 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Get Attempts
                </button>
            </div>
        </form>
        {
            ( attempts && attempts.length != 0 && questions && questions.length != 0) &&
            (
                <section className="text-xl text-slate-300 font-satoshi-lightitalic text-center">
                    Hay
                </section>
            )
        }
        {
            ( attempts && attempts.length == 0) && (
                <p className="text-xl text-slate-300 font-satoshi-lightitalic text-center mt-10">
                    Has not exist attempts for this exam in the selected range, try again with other range.
                </p>
            )
        }
        {
            ( !attempts ) && (
                <p className="text-xl text-slate-300 font-satoshi-lightitalic text-center mt-10">
                    Select a date range and get to show attempts data.
                </p>
            )
        }
        </div>
    );
};

export default GetAttemptsComponent;
