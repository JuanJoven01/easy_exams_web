
import PropTypes from 'prop-types'

import CustomPNButton from '../../../../components/buttons/customPNButton'

const PrevNextQuestionComponent = ({questionsAData, showedQuestion, setShowedQuestion}) => {


    return (
        <div className='flex justify-end items-center w-full'>
                {
                    showedQuestion != 0 &&
                        <div className=''>
                            <CustomPNButton
                                text={'Preview'}
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
    )
}

PrevNextQuestionComponent.propTypes = {
    questionsAData: PropTypes.array.isRequired,
    setShowedQuestion: PropTypes.func.isRequired,
    showedQuestion: PropTypes.number.isRequired
}

export default PrevNextQuestionComponent