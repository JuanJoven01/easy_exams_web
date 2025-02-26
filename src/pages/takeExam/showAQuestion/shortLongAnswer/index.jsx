import PropTypes from 'prop-types'
import { useState } from 'react'

import useGlobalContext from '../../../../context/GlobalContext/useGlobalContext';
import AttemptImageViewer from '../imageViewer';

const ShortLong = ({questionsAData, setQuestionsAData, showedQuestion, setShowedQuestion}) => {

    // const [correctAnswer, setCorrectAnswer] = useState(questionData.correct_answer)

    const {setIsLoading, setModal} = useGlobalContext()

    const changeHandler = (event)=> {
        event.preventDefault()
        setUserAns(event.target.value)

    }

    const [userAns , setUserAns] = useState('')
    
    return(

        <div className='w-full'>
            <p className='text-slate-300 font-bold'>{questionsAData[showedQuestion].content}</p>
            <form className='flex items-center my-5'>
                <label htmlFor="userAns" className="py-2 px-5 ">
                    Your Answer:
                </label>
                <textarea
                    name="userAns"
                    id="userAns"
                    onChange={(e)=>{changeHandler(e)}}
                    required
                    className="mx-5 rounded-md border-gray-600 bg-gray-700 text-white "
                    style={{
                        'scrollbarColor': 'rgba(0, 255, 234, 0.08) rgba(61, 200, 255, 0.08)',
                        'fieldSizing': 'content',
                        'minWidth' : '20%'
                        }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    value={userAns}
                />
            </form>  

            {questionsAData[showedQuestion].image &&
            <AttemptImageViewer 
                image={questionsAData[showedQuestion].image}
            />}
    </div>
    )
}

ShortLong.propTypes = {
    questionsAData: PropTypes.array.isRequired,
    setQuestionsAData: PropTypes.func.isRequired,
    showedQuestion: PropTypes.number.isRequired,
    setShowedQuestion: PropTypes.func.isRequired

}

export default ShortLong