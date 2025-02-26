
import { useState } from "react"
import PropTypes from 'prop-types'

import ShortLong from "./shortLongAnswer"
import MultipleChoice from "./multipleChoiceAnswer/index.jsx"
import FillInTheBlank from "./fillInTheBlankAnswer"
import Pairing from "./pairingAnswer/index.jsx.jsx"

import PrevNextQuestionComponent from "./components/prevNextQuestion.jsx"

const ShowAQuestion = ({questionsAData, setQuestionsAData }) => {
    
    const [showedQuestion, setShowedQuestion] = useState(0)

    return (
        <div
            className='my-2 font-thin w-full text-xl text-slate-400 font-satoshi-lightitalic place-items-center'
            >
                <div className='mb-2 w-full  flex flex-col justify-between p-5  hover:bg-slate-800 bg-[#001933]  rounded-xl border-2 shadow-[0px_0px_20px_0px_#2b6cb0] '>
                
                {
                    (questionsAData[showedQuestion].question_type == 'short_answer' || questionsAData[showedQuestion].question_type == 'long_answer') &&
                    <ShortLong 
                        questionsAData={questionsAData}
                        setQuestionsAData={setQuestionsAData}
                        showedQuestion={showedQuestion}
                        setShowedQuestion={setShowedQuestion}
                    />
                }
                {
                    questionsAData[showedQuestion].question_type == 'multiple_choice' &&
                    <MultipleChoice 
                        questionsAData={questionsAData}
                        setQuestionsAData={setQuestionsAData}
                        showedQuestion={showedQuestion}
                        setShowedQuestion={setShowedQuestion}
                    />
                }
    
                {
                    questionsAData[showedQuestion].question_type == 'fill_in_the_blank' &&
                    <FillInTheBlank 
                        questionsAData={questionsAData}
                        setQuestionsAData={setQuestionsAData}
                        showedQuestion={showedQuestion}
                        setShowedQuestion={setShowedQuestion}
                    />
                }
                {
                    questionsAData[showedQuestion].question_type == 'matching' &&
                    <Pairing 
                        questionsAData={questionsAData}
                        setQuestionsAData={setQuestionsAData}
                        showedQuestion={showedQuestion}
                        setShowedQuestion={setShowedQuestion}
                    />
                }
                <div>
                    <PrevNextQuestionComponent 
                        questionsAData={questionsAData}
                        setShowedQuestion={setShowedQuestion}
                        showedQuestion={showedQuestion}
                    />
                </div>
                
                
                </div>
        </div>
    )
}

ShowAQuestion.propTypes = {
    questionsAData : PropTypes.array.isRequired,
    setQuestionsAData: PropTypes.func.isRequired
}

export default ShowAQuestion