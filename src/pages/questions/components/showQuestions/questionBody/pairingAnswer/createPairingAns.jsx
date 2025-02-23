import PropTypes from 'prop-types'
import { useState } from 'react'

import { createPairAPI } from '../../../../services/pairs'

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

const CreatePairingAnswer = ({questionData, setQuestionData, setIsCreating}) => {
    
    const [dataForm, setDataForm] = useState({
        questionID : questionData.id,
        term: '',
        match: '',
    })

    const {setModal, setIsLoading} = useGlobalContext()

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setDataForm((prevDataForm) => ({
            ...prevDataForm,
            [name]: value,
        }));
    };

    const createPair = async () => {
        setIsLoading(true)
        const response = await createPairAPI (dataForm.term, dataForm.match, questionData.id)
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
                term: response.data.term,
                match: dataForm.match
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
        <form action={createPair} className='flex items-center flex-wrap ml-5'>
            <p className='text-slate-300 font-bold'>New Pair:</p>
            <div className='flex py-2 pl-10 flex-wrap'>
                <div className='flex items-center py-2 flex-wrap'>
                    <label htmlFor="term">
                        Term:
                    </label>
                    <input
                        name="term"
                        id="term"
                        onChange={(e)=>{changeHandler(e)}}
                        required
                        className="  mx-5 rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2 hover:cursor-pointer hover:border-blue-500 hover:ring hover:ring-blue-500 hover:ring-opacity-50"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                        value={dataForm.term}
                    />
                </div>
                
                <div className='flex items-center py-2 flex-wrap'>
                    <label htmlFor="match">
                        Match:
                    </label>
                    <input
                        name="match"
                        id="match"
                        onChange={(e)=>{changeHandler(e)}}
                        required
                        className="  mx-5 rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-2 hover:cursor-pointer hover:border-blue-500 hover:ring hover:ring-blue-500 hover:ring-opacity-50"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                        value={dataForm.match}
                    />
                </div>
                        
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

CreatePairingAnswer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    setIsCreating: PropTypes.func.isRequired

}

export default CreatePairingAnswer