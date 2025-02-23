import QuestionBody from "./questionBody";

import QuestionHeader from "./questionHeaders";

import { useEffect, useState } from "react";

import PropTypes from 'prop-types'

const ShowQuestions = ({question, openTheModal, openModal, setData}) => {

    const [questionData, setQuestionData] = useState(question)

    useEffect(()=>{
        setQuestionData(question)
    },[question])

    return(
        <div
            className='my-2 font-thin w-full text-xl text-slate-400 font-satoshi-lightitalic place-items-center'
            >
                <div className={`mb-2 w-full  flex justify-between hover:cursor-pointer hover:bg-slate-800 bg-[#001933] ${openModal == questionData.id ? ' rounded-t-xl border-y-2 border-x-2 shadow-[0px_-3px_20px_0px_#2b6cb0]': 'border-2 rounded-xl '}`  }
                    onClick={(event)=>{
                        event.preventDefault()
                        event.stopPropagation()
                        openTheModal(questionData.id)
                    }}
                    >
                    <QuestionHeader
                        questionData={questionData}
                        setQuestionData={setQuestionData}
                        setData={setData}
                    />
                </div>
                {
                    openModal == questionData.id &&
                    <div className='w-[98%] border-x-2 border-b-2 rounded-x-2xl rounded-b-2xl shadow-[0px_5px_20px_0px_#2b6cb0] bg-[#001933]'>
                        <QuestionBody 
                            questionData={questionData}
                            setQuestionData={setQuestionData}
                        /> 
                        
                    </div>
                }
        </div>
    )
}

ShowQuestions.propTypes ={
    question: PropTypes.object.isRequired,
    openTheModal: PropTypes.func.isRequired,
    openModal: PropTypes.any.isRequired,
    setData: PropTypes.func.isRequired
}


export default ShowQuestions