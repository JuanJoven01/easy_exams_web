
import ShowQuestionContent from "./showQuestionContent"
import ShowQuestionType from "./showQuestionType"

import { FiDelete } from "react-icons/fi";
import { Tooltip as ReactTooltip } from 'react-tooltip'

import PropTypes from 'prop-types'



const QuestionHeader = ({questionData, setQuestionData}) => {

    return(
        <div className="flex">
            <div className='w-full'>
                <ShowQuestionType
                    questionData={questionData}
                    setQuestionData={setQuestionData}
                />
                
                <ShowQuestionContent 
                    questionData={questionData}
                    setQuestionData={setQuestionData}
                />
                
            </div>
            
            <div className='flex pr-10 items-center'>
                <FiDelete className="h-6 w-6  text-amber-600 mx-3" data-tooltip-id="questions" data-tooltip-content="Removes Question"
                    onClick={(event) => {
                        event.stopPropagation()
                        // removesExamHandler(item)
                        }}
                />
                <ReactTooltip id='questions' place="top" type="dark" effect="solid" />
            </div>
        </div>
    )
}

QuestionHeader.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired
}



export default QuestionHeader