import PropTypes from 'prop-types'

import CreatePairingAnswer from './createPairingAns';
import EditPairingAnswer from './editPairingAns';

import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";

import { useState } from 'react';

import { BiCaretRight } from "react-icons/bi";

import useGlobalContext from '../../../../../../context/GlobalContext/useGlobalContext';

import { removesPairAPI } from '../../../../services/pairs';

const PairingAnswer = ({questionData, setQuestionData}) => {

    const [isEditing, setIsEditing] = useState(0)

    const [isCreating, setIsCreating] = useState(false)

    const {setIsLoading, setModal} = useGlobalContext()

    const removesPairHandler = async (id) => {
        setIsLoading(true)
        const response = await removesPairAPI(id)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setQuestionData((prevData)=> {
            const newArray = questionData.pairs.map(((item)=>(item)))
            const index = newArray.findIndex((item) => item.id ==id)
            newArray.splice(index,1)
            return ({
                ...prevData,
                pairs: newArray
            })
        })
        setIsLoading(false)

    }

    return(

        <div>
            <div className='flex items-center'>
                <div className='mb-2 w-full'>
                    <p className=" py-2 px-5 ">
                        <span className="text-slate-300 font-bold">Options to Pair:  </span> 
                    </p>
                    <div className='flex items-center w-full justify-between'>
                        <div className='flex-col w-full'>
                            {
                                questionData.pairs.length == 0 && 
                                <p className=" py-2 px-5 ">
                                    {"The question haven't a options to pair yet."}
                                </p>
                            }

                            {
                                questionData.pairs.length != 0 && 
                                <ul className="space-y-1 text-gray-500">
                                    {questionData.pairs.map((pair) => (
                                        
                                            isEditing != pair.id ?
                                            (<li key={pair.id} className='flex items-center pl-10 w-full '>
                                                <div>
                                                    <BiCaretRight  
                                                    className='w-6 h-6 text-cyan-600'
                                                    
                                                    />
                                                </div>
                                                <div className='flex w-full items-center border-b-1 border-dotted '>
                                                    <p className='ml-5 w-full text-slate-400'>
                                                        {pair.term} :
                                                    </p>
                                                    <p className='ml-5 w-full text-slate-400'>
                                                        {pair.match}
                                                    </p>
                                                </div>
                                                
                                                <div className='flex items-center'>
                                                    <div>
                                                        <FiEdit className="h-6 w-6 hover:cursor-pointer  text-cyan-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Edit" 
                                                            onClick={(event) => {
                                                                event.stopPropagation()
                                                                setIsEditing(pair.id)
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FiDelete className="h-6 w-6 hover:cursor-pointer  text-amber-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Remove"
                                                            onClick={(event) => {
                                                                event.stopPropagation()
                                                                removesPairHandler(pair.id)
                                                                }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                
                                            </li>)
                                            :
                                            (
                                                <EditPairingAnswer 
                                                    pair={pair}
                                                    setQuestionData={setQuestionData}
                                                    questionData={questionData}
                                                    setIsEditing={setIsEditing}
                                                    key={pair.id}
                                                />
                                            )
                                        
                                    ))}
                                </ul>
                            }
                            {
                                isCreating && 

                                <CreatePairingAnswer 
                                    questionData={questionData}
                                    setQuestionData={setQuestionData}
                                    setIsCreating={setIsCreating}
                                    />
                                    
                            }
                        </div>
                        
                        {
                            (!isCreating && isEditing==0) &&
                                <div className='flex items-center'>
                                    <IoIosAddCircleOutline className=' h-8 w-8 text-green-500 hover:cursor-pointer mx-5' data-tooltip-id="questions" data-tooltip-content="Add an Pair"  
                                    onClick={() => {setIsCreating(true)}}/>
                                </div>
                        }

                    </div>
                </div> 
            </div>
        </div>
    )
}

PairingAnswer.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default PairingAnswer