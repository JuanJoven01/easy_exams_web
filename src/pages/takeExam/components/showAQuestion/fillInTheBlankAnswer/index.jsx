import { useEffect, useState } from 'react'

import useGlobalContext from '../../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../../context/AttemptContext/useAttemptContext';
import CustomPNButton from '../../../../../components/buttons/customPNButton';
import CustomFinishButton from '../../../../../components/buttons/customFinishButton'
import AttemptImageViewer from '../../imageViewer';

import { createSLAnswerAPI, updateSLAnswerAPI } from '../../../services/ShortLongAns';


const FillInTheBlank = () => {

    const {setIsLoading, setModal} = useGlobalContext()

    const [content, setContent] = useState('')

    const [options, setOption] = useState([])

    const [answerId, setAnswerId] = useState(false)

    const [changeWitness, setChangeWitness] = useState(false)

    const {questionsAData, showedQuestion, setShowedQuestion, setAnswersData, answersData} = useAttemptContext()

    const changeHandler = async (event, index)=> {
        event.preventDefault()
        if (!changeWitness){
            setChangeWitness(true)
        }
        setOption((prev) =>
            prev.map((opt) =>
                opt.id === index ? { ...opt, value: event.target.value } : opt
            )
        );
    }

    useEffect(() => {
        if (!questionsAData[showedQuestion]?.content) return;
        const regex = /\{\{(.*?)\}\}/g;
        let _counter = 1;
        const cleanedContent = questionsAData[showedQuestion].content.replace(
            regex,
            () => `<span class="text-echo">____${_counter++}____</span>`
        );
        if (options.length === 0) {
            const newOptions = Array.from({ length: _counter - 1 }, (_, i) => ({
                id: i + 1,
                value: ''
            }));
            setOption(newOptions);
        }
        setContent(`${showedQuestion +1}) ${cleanedContent}`);

        if (answersData.length !=0){
            const index = answersData.findIndex((item)=> (item.question_id == questionsAData[showedQuestion].id))
            if (index != -1){
                setOption(JSON.parse(answersData[index].answer_text))
                setAnswerId(answersData[index].id)
                return
            }
        }
        
    }, [questionsAData, showedQuestion, options.length, answersData]);

    const createFTBAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await createSLAnswerAPI(questionsAData[showedQuestion].id, JSON.stringify(options))
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

    const updateFTBAnswer =async ()=>{
        if(!changeWitness){return}
        setIsLoading(true)
        const response = await updateSLAnswerAPI(answerId, JSON.stringify(options))
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
                        answer_text: JSON.stringify(options)
                    })
                }
                return item
            })
            newData.push(response.data)
            return(newData)
        })
        setIsLoading(false)
    }
    
    return(

        <div className='w-full'>
            <p className='text-slate-300 font-bold' dangerouslySetInnerHTML={{ __html: content }} />
            <form className='pt-5'>
                <p className='py-2 px-5 '>This is a fill in the blank question, set your response for any blank space:</p>
                {
                    options.map((option, index) => {
                        return(
                            <div key={index} className='flex items-center pb-3'>
                                <label>{`${option.id}: `}</label>
                                <input type="text" 
                                    value={option.value} 
                                    onChange={(e)=>changeHandler(e,index + 1)} 
                                    className=' border-2 rounded-md ml-4 px-2'
                                    />
                            </div>
                        )
                    })
                }

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
                                    updateFTBAnswer()
                                } else {
                                    createFTBAnswer()
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
                                updateFTBAnswer()
                            } else {
                                createFTBAnswer()
                            }
                        }}
                    />
                </div>
            }
            {
                (showedQuestion == (questionsAData.length -1)) &&
                <div className='ml-2'>
                    <CustomFinishButton
                        action={()=>{
                            if (answerId){
                                updateFTBAnswer()
                            } else {
                                createFTBAnswer()
                            }
                            setShowedQuestion(0)
                            setAnswersData([])
                        }}
                    />
                </div>
            }
            </div>
        </div>
        
    )
}

export default FillInTheBlank