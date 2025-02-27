import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import AttemptImageViewer from '../imageViewer';
import CustomPNButton from '../../../../components/buttons/customPNButton';

import {createSLAnswerAPI, updateSLAnswerAPI} from '../../services/ShortLongAns'

import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext';

const ShortLong = () => {

    const {setShowedQuestion, questionsAData, showedQuestion, setAnswersData, answersData} =  useAttemptContext()

    useEffect(()=>{
        
        if (answersData.length !=0){
            const index = answersData.findIndex((item)=> (item.question_id == questionsAData[showedQuestion].id))
            if (index != -1){
                setUserAns(answersData[index].answer_text)
                setAnswerId(answersData[index].id)
                return
            }
        }

        
    },[answersData, questionsAData, showedQuestion])
    
    
    const {setIsLoading, setModal} = useGlobalContext()

    const changeHandler = (event)=> {
        event.preventDefault()
        if (!changeWitness){
            setChangeWitness(true)
        }
        setUserAns(event.target.value)

    }
    
    const [userAns , setUserAns] = useState('')
    const [answerId, setAnswerId] = useState(false)
    const [changeWitness, setChangeWitness] = useState(false)

    const createSLAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await createSLAnswerAPI(questionsAData[showedQuestion].id, userAns)
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
            const newData = prev.map((item)=>item)
            newData.push(response.data)
            return(newData)
        })
        setIsLoading(false)
    }

    const updateSLAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await updateSLAnswerAPI(answerId, userAns)
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
                        answer_text: userAns
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
            <form className='flex items-center my-5'>
                <label htmlFor="userAns" className="py-2 px-5 ">
                    Your Answer:
                </label>
                <textarea
                    name="userAns"
                    id="userAns"
                    onChange={(e)=>{changeHandler(e)}}
                    required
                    className="mx-5 rounded-md border-gray-600 bg-gray-700 text-white "
                    style={{
                        'scrollbarColor': 'rgba(0, 255, 234, 0.08) rgba(61, 200, 255, 0.08)',
                        'fieldSizing': 'content',
                        'minWidth' : '20%'
                        }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    value={userAns}
                />
            </form>  

            {questionsAData[showedQuestion].image &&
            <AttemptImageViewer 
                image={questionsAData[showedQuestion].image}
            />}

            <div className='flex justify-end items-center w-full'>
                {
                    showedQuestion != 0 &&
                        <div className=''>
                            <CustomPNButton
                                text={'Previous'}
                                action={()=>{
                                    setShowedQuestion((prev)=>prev -1)
                                    if (answerId){
                                        updateSLAnswer()
                                    } else {
                                        createSLAnswer()
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
                                    updateSLAnswer()
                                } else {
                                    createSLAnswer()
                                }
                            }}
                        />
                    </div>
                }
                    
            </div>
            
    </div>
    )
}


export default ShortLong