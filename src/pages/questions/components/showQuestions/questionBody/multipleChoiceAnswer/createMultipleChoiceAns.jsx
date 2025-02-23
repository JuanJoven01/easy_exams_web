import PropTypes from 'prop-types'
import { useState } from 'react'

import ToggleComponent from '../../../../../../components/toggle'
import { createOptionAPI } from '../../../../services/options'

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

const CreateMultipleChoiceAnswer = ({questionData, setQuestionData, setIsCreating}) => {
    
    const [dataForm, setDataForm] = useState({
        questionID : questionData.id,
        content: '',
        isCorrect: false
    })

    const {setModal, setIsLoading} = useGlobalContext()

    const changeHandler = (e) => {
        e.preventDefault()
        setDataForm((old)=>({
            ...old,
            content: e.target.value
        }))
    }

    

    const handleToggle = () => {
        setDataForm((prevDataForm) => ({
            ...prevDataForm,
            isCorrect: !prevDataForm.isCorrect,
        }));
    };

    const createOption = async () => {
        setIsLoading(true)
        const response = await createOptionAPI (dataForm.content, dataForm.isCorrect, questionData.id)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
            
        }

        setQuestionData((old)=>{
            const newArray = questionData.options.map((item)=>(item))
            newArray.push({
                id: response.data.id,
                content: response.data.content,
                is_correct: dataForm.isCorrect
            })
            return({
                ...old,
                options: newArray
            })
        })
        setIsCreating(false)
        setIsLoading(false)
        return
    }


    return( 
        <form action={createOption} className='flex'>
            <div className='flex py-2 pl-10 '>
                <label htmlFor="content" className="text-slate-300 font-bold">
                    New Option:
                </label>
                <input
                    name="content"
                    id="content"
                    onChange={(e)=>{changeHandler(e)}}
                    required
                    className="  mx-5 rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2 hover:cursor-pointer hover:border-blue-500 hover:ring hover:ring-blue-500 hover:ring-opacity-50"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    value={dataForm.content}
                />
            </div>
            <div className='flex items-center'>
                <ToggleComponent 
                    content = 'is correct?'
                    value = {dataForm.isCorrect}
                    handleToggle = {handleToggle}
                />
            </div>
            <div className='flex-col items-center'>
                <button
                    type="submit"
                    className=" m-2 px-3 hover:cursor-pointer  bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md "
                    onClick={(event)=>{
                        event.stopPropagation()
                    }}
                    >
                        Create
                </button>

                <button
                    type="button"
                    onClick={(event)=>{
                        event.stopPropagation()
                        setIsCreating(false)
                    }}
                    className="  m-2 px-3 hover:cursor-pointer  bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md "
                    >
                        Cancel
                </button>
            </div>
            
        </form>
    )
}

CreateMultipleChoiceAnswer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    setIsCreating: PropTypes.func.isRequired

}

export default CreateMultipleChoiceAnswer