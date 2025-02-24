import PropTypes from 'prop-types'

import ShortLongAnswer from './shortLongAnswer/index.jsx';
import MultipleChoiceAnswer from './multipleChoiceAnswer/index.jsx.jsx';
import FillInTheBlankAnswer from './fillInTheBlankAnswer/index.jsx';
import PairingAnswer from './pairingAnswer/index.jsx.jsx';
import ImageViewer from './imageViewer/index.jsx';

const QuestionBody = ({questionData, setQuestionData}) => {
    return (

        <div className='flex flex-col '>
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

            {
                questionData.question_type == 'fill_in_the_blank' &&
                <FillInTheBlankAnswer 
                    questionData={questionData}
                    setQuestionData={setQuestionData}
                />
            }
            {
                questionData.question_type == 'matching' &&
                <PairingAnswer 
                    questionData={questionData}
                    setQuestionData={setQuestionData}
                />
            }

            <ImageViewer 
                questionData={questionData}
                setQuestionData={setQuestionData}
            />
            
        </div>
    )
}

QuestionBody.propTypes = {
    questionData: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired

}

export default QuestionBody