import PropTypes from 'prop-types'

import { useEffect, useState } from 'react';

import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext';
import CustomPNButton from '../../../../components/buttons/customPNButton';

import { createMCAnswerAPI,updateMCAnswerAPI } from '../../services/multipleChoice';

const MultipleChoice = () => {

    const {setIsLoading, setModal} = useGlobalContext()

    const [checked , setChecked] = useState()
    
    const [changeWitness, setChangeWitness] = useState(false)

    const [answerId, setAnswerId] = useState(false)

    const {questionsAData, showedQuestion, setShowedQuestion, setAnswersData, answersData } = useAttemptContext()

    const handleChecked = (id) => {
        if(!changeWitness){
            setChangeWitness(true)}
        setChecked(id)
    }

    useEffect(()=>{
        
        if (answersData.length !=0){
            const index = answersData.findIndex((item)=> (item.question_id == questionsAData[showedQuestion].id))
            if (index != -1){
                setChecked(answersData[index].selected_options[0].question_option_id)
                setAnswerId(answersData[index].id)
                return
            }
        }

        
    },[answersData, questionsAData, showedQuestion])

    const createMCAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await createMCAnswerAPI(questionsAData[showedQuestion].id, checked)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        console.log('response')
        console.log(response)
        setAnswersData((prev)=>{
            const newData = prev.map((item)=>item)
            newData.push({
                ...response.data,
                selected_options: [{
                    question_option_id : response.data.selected_option_id
                }]
            })
            return(newData)
        })
        setIsLoading(false)
    }

    const updateMCAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await updateMCAnswerAPI(answerId, checked)
        if (response.status == 'error'){
            setModal({
                'isOpen' : true,
                'isError' : true,
                'message' : response.message,
            })
            setIsLoading(false)
            return
        }
        setAnswersData((prev)=>{
            const newData = prev.map((item)=>{
                if (item.id == answerId){
                    return ({
                        ...item,
                        selected_options: [{
                            id: response.data.selected_option_id,
                            question_option_id: checked
                        }]
                    })
                }
                return item
            })
            // newData.push(response.data)
            return(newData)
        })
        setIsLoading(false)
    }


    return(

        <div className='w-full'>
            <p className='text-slate-300 font-bold'>{questionsAData[showedQuestion].content}</p>
            <div className='flex items-center'>
                <div className='mb-2 w-full'>
                    <p className=" py-2 px-5 ">
                        <span className="">Options:  </span> 
                    </p>
                    <div className='flex items-center w-full justify-between'>
                        <div className='flex-col w-full'>
                                <form className="space-y-1 text-gray-500">
                                    {questionsAData[showedQuestion].options.map((option) => (
                                        <div key={option.id} className=' flex items-center'
                                            onClick={()=>{
                                                handleChecked(option.id)
                                            }}
                                        >
                                            <input  type="checkbox" className={`w-5 cursor-pointer h-5 appearance-none border-2 border-gray-300  rounded-md mr-2 ${checked == option.id && 'bg-cyan-500'} `} />
                                            <label className="cursor-pointer"> {option.content} </label>
                                        </div>
                                    ))}
                                </form>
                        </div>

                    </div>
                </div> 
            </div>
            <div className='flex justify-end items-center w-full'>
            {
                showedQuestion != 0 &&
                    <div className=''>
                        <CustomPNButton
                            text={'Previous'}
                            action={()=>{
                                setShowedQuestion((prev)=>prev -1)
                                if (answerId){
                                    updateMCAnswer()
                                } else {
                                    createMCAnswer()
                                }
                            }}
                        />
                    </div>
            }
            {
                showedQuestion < (questionsAData.length -1) &&
                <div className='ml-2'>
                    <CustomPNButton
                        text={'Next'}
                        action={()=>{
                            setShowedQuestion((prev)=>prev + 1)
                            if (answerId){
                                updateMCAnswer()
                            } else {
                                createMCAnswer()
                            }
                        }}
                    />
                </div>
            }
                
        </div>
        </div>
    )
}

export default MultipleChoice