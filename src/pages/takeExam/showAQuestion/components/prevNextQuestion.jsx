
import PropTypes from 'prop-types'

import CustomPNButton from '../../../../components/buttons/customPNButton'
import useAttemptContext from '../../../../context/AttemptContext/useAttemptContext'

const PrevNextQuestionComponent = () => {
    const {showedQuestion, setShowedQuestion, sendAnswer, questionsAData} = useAttemptContext()

    return (
        <div className='flex justify-end items-center w-full'>
                {
                    showedQuestion != 0 &&
                        <div className=''>
                            <CustomPNButton
                                text={'Preview'}
                                action={()=>{
                                    setShowedQuestion((prev)=>prev -1)
                                    sendAnswer()
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
                                sendAnswer()
                            }}
                        />
                    </div>
                }
                    
                </div>
    )
}

PrevNextQuestionComponent.propTypes = {
    questionsAData: PropTypes.array.isRequired,
    setShowedQuestion: PropTypes.func.isRequired,
    showedQuestion: PropTypes.number.isRequired,
    sendAnswer: PropTypes.func.isRequired
}

export default PrevNextQuestionComponent