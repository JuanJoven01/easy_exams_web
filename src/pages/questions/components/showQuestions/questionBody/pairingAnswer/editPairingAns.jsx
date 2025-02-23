import PropTypes from 'prop-types'
import { useState } from 'react'

import { updatePairAPI } from '../../../../services/pairs'

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext'

const EditPairingAnswer = ({pair, questionData, setQuestionData, setIsEditing}) => {
    
    const [dataForm, setDataForm] = useState({
        id : pair.id,
        term: pair.term,
        match: pair.match
    })

    const {setModal, setIsLoading} = useGlobalContext()

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setDataForm((prevDataForm) => ({
            ...prevDataForm,
            [name]: value,
        }));
    };


    const updatePair = async () => {
        setIsLoading(true)
        console.log(dataForm.term, dataForm.match, pair.id)
        const response = await updatePairAPI (dataForm.term, dataForm.match, pair.id)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        console.log(dataForm)
        setQuestionData((old)=>{
            const newArray = questionData.pairs.map((item)=>{
                if (item.id == pair.id){
                    return({
                        id: response.data.id,
                        term: response.data.term,
                        match: dataForm.match
                    })
                    
                } else{
                    return item
                }
            })
            return({
                ...old,
                pairs: newArray
            })
        })
        setIsEditing(0)
        setIsLoading(false)
        return
    }


    return( 
        <form action={updatePair} className='flex items-center flex-wrap ml-5'>
            <p className='text-slate-300 font-bold'>Update:</p>
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
    pair: PropTypes.object.isRequired,
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired
}

export default EditPairingAnswer