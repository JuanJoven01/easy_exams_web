import PropTypes from 'prop-types'
import {  useContext, useEffect, useState } from 'react'

import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext';
import CustomPNButton from '../../../../components/buttons/customPNButton';
const FillInTheBlank = () => {

    const {setIsLoading, setModal} = useGlobalContext()

    const [content, setContent] = useState('')

    const [options, setOption] = useState([])

    const {questionsAData, showedQuestion, setShowedQuestion} = useAttemptContext()

    const changeHandler = async (event, index)=> {
        event.preventDefault()
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
        setContent(cleanedContent);
        
    }, [questionsAData, showedQuestion, options.length]);
    
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

            <div className='flex justify-end items-center w-full'>
            {
                showedQuestion != 0 &&
                    <div className=''>
                        <CustomPNButton
                            text={'Previous'}
                            action={()=>{
                                setShowedQuestion((prev)=>prev -1)
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
                        }}
                    />
                </div>
            }
            </div>
        </div>
        
    )
}

export default FillInTheBlank