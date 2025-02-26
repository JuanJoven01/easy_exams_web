import PropTypes from 'prop-types'

import { useState } from 'react';

import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext';

const MultipleChoice = () => {

    const {setIsLoading, setModal} = useGlobalContext()

    const [checked , setChecked] = useState(0)

    const {questionsAData, showedQuestion } = useAttemptContext()
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
                                                setChecked(option.id)
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
        </div>
    )
}

export default MultipleChoice