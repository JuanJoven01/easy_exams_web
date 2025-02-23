import PropTypes from 'prop-types'
import { useState } from 'react'

import ToggleComponent from '../../../../../../components/toggle'
import { updateOptionAPI } from '../../../../services/options'

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

const EditPairingAnswer = ({option, questionData, setQuestionData, setIsEditing}) => {
    
    const [dataForm, setDataForm] = useState({
        questionID : option.id,
        content: option.content,
        isCorrect: option.is_correct
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
        const response = await updateOptionAPI (dataForm.content, dataForm.isCorrect, option.id)
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
            const newArray = questionData.options.map((item)=>{
                if (item.id == option.id){
                    return({
                        id: response.data.id,
                        content: response.data.content,
                        is_correct: dataForm.isCorrect
                    })
                    
                } else{
                    return item
                }
            })
            return({
                ...old,
                options: newArray
            })
        })
        setIsEditing(0)
        setIsLoading(false)
        return
    }


    return( 
        <form action={createOption} className='flex'>
            <div className='flex py-2 pl-10 '>
                <label htmlFor="content" className="text-slate-300 font-bold">
                    Content:
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
            <div className='flex items-center'>
                <button
                    type="submit"
                    className=" m-2 px-3 hover:cursor-pointer  bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md "
                    onClick={(event)=>{
                        event.stopPropagation()
                    }}
                    >
                        Update
                </button>

                <button
                    type="button"
                    onClick={(event)=>{
                        event.stopPropagation()
                        setIsEditing(false)
                    }}
                    className="  m-2 px-3 hover:cursor-pointer  bg-red-500 hover:bg-red-700 text-white rounded-md shadow-md "
                    >
                        Cancel
                </button>
            </div>
            
        </form>
    )
}

EditPairingAnswer.propTypes = {
    option: PropTypes.object.isRequired,
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired
}

export default EditPairingAnswer