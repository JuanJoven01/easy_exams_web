import PropTypes from 'prop-types'

import ShortLongAnswer from './shortLongAnswer';
import MultipleChoiceAnswer from './multipleChoiseAnswer/index.jsx';

const QuestionBody = ({questionData, setQuestionData}) => {
    return (

        <div>
            {
                (questionData.question_type == 'short_answer' || questionData.question_type == 'long_answer') &&
                <ShortLongAnswer 
                    questionData={questionData}
                    setQuestionData={setQuestionData}
                />
            }
            {
                questionData.question_type == 'multiple_choice' &&
                <MultipleChoiceAnswer 
                    questionData={questionData}
                    setQuestionData={setQuestionData}
                />
            }
            <div className='  '>
                Hello World
            </div> 
        </div>
    )
}

QuestionBody.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default QuestionBody