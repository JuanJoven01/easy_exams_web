
import PropTypes from 'prop-types'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { LuBadgeCheck } from "react-icons/lu";
import { LuBadgeX } from "react-icons/lu";
import { LuBadgeMinus } from "react-icons/lu";

const ShowAttemptsComponent = ({questions, attempts}) => {

    console.log('attempts.length')
    console.log(attempts.length)
    console.log('questions.length')
    console.log(questions.length)

    const getAttemptTime = (endTime, startTime) => {
        const date1 = new Date(endTime);
        const date2 = new Date(startTime);
        const differenceInMilliseconds = Math.abs(date2 - date1);

        const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const getAttemptResponse = (response) => {
        if (response.selected_options.length != 0){
            return `${response.selected_options[0].option_content} <br/> Score: ${response.q_score}`
        }
        else if (response.answer_pairs.length != 0){
            const pairsInStringMapJoin = response.answer_pairs
                .map((item) => `Term: ${item.question_pair_term}, Match: ${item.selected_match}`)
                .join('<br />')
            return `${pairsInStringMapJoin} <br/> Score: ${response.q_score}`
        }
        else {
            try {
                const parsedData = JSON.parse(response.answer_text);
                if (Array.isArray(parsedData)) {
                    const returnData = parsedData
                        .map((item) => item.value)
                        .join('<br />')
                    return `${returnData}  <br/> Score: ${response.q_score}`
                } else {
                    return `${response.answer_text.replace('\n', '<br />')}  <br/> Score: ${response.q_score}`
                }
            } catch {
                return `${response.answer_text.replace('\n', '<br />')}  <br/> Score: ${response.q_score}`
            }
        }
    }

    return (
        <section className='w-full overflow-x-scroll'>
            <section className={`text-xl text-slate-300 font-satoshi-lightitalic text-center`}
                style={{
                    display: 'grid',
                    gridTemplateRows: `repeat(${attempts.length+1}, 1fr)`,
                    gridTemplateColumns: `repeat(4, 1fr) repeat(${questions.length}, 40px)`
                }}
            >
                <div className='col-start-1 col-end-2 row-start-1 row-end-2 min-w-fit'>
                    Student Name
                </div>
                <div className='col-start-2 col-end-3 row-start-1 row-end-2 min-w-fit'>
                    Student ID
                </div>
                <div className='col-start-3 col-end-4 row-start-1 row-end-2 min-w-fit'>
                    Score
                </div>
                <div className='col-start-4 col-end-5 row-start-1 row-end-2 min-w-fit'>
                    Duration
                </div>
                {
                    questions.map((question, index)=>(
                        <p key={question.id} className={` row-start-1 row-end-2`} 
                            data-tooltip-id="attempts" 
                            data-tooltip-content={`${question.content}`}
                            style={{
                                gridColumnStart: index+5,
                                gridColumnEnd: index+6
                            }}>
                            {index+1} 
                        </p>
                    ))
                }
                {
                    attempts.map((attempt, index) => (
                        <div key={attempt.id}
                            style={{
                                gridRowStart: index+2,
                                gridRowEnd: index+3,
                                gridColumn: '1/-1',
                                display: 'grid',
                                gridTemplateColumns: 'inherit',
                            }}>
                            <p className={`col-start-1 col-end-2 min-w-fit`}> {attempt.student_name}</p>
                            <p className={`col-start-2 col-end-3 min-w-fit`}> {attempt.student_id}</p>
                            <p className={`col-start-3 col-end-4 min-w-fit`}> {attempt.score}</p>
                            <p className={`col-start-4 col-end-5 min-w-fit`}
                                data-tooltip-id="attempts" 
                                data-tooltip-content={`Start: ${attempt.start_time} End: ${attempt.end_time}`} > 
                                {attempt.end_time? getAttemptTime(attempt.end_time, attempt.start_time)  : 'In progress'  }
                            </p>
                            {
                                attempt.answer_ids.map((answer, index)=> (
                                    <div key={index}
                                        style={{
                                            gridColumnStart: index+5,
                                            gridColumnEnd: index+6
                                        }}>
                                            {
                                                answer.score == 2 &&
                                                <LuBadgeMinus 
                                                data-tooltip-id="attempts" 
                                                data-tooltip-html={getAttemptResponse(answer)} />
                                            }
                                            {
                                                (answer.score != 2 && answer.is_correct == true )&&
                                                <LuBadgeCheck 
                                                data-tooltip-id="attempts" 
                                                data-tooltip-html={getAttemptResponse(answer)} />
                                            }
                                            {
                                                (answer.score != 2 && answer.is_correct == false )&&
                                                <LuBadgeX 
                                                data-tooltip-id="attempts" 
                                                data-tooltip-html={getAttemptResponse(answer)} />
                                            }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                
                <ReactTooltip id='attempts' place="top" type="dark" effect="solid" />
            </section>
        </section>
    )
}

ShowAttemptsComponent.propTypes = {
    questions : PropTypes.array.isRequired,
    attempts : PropTypes.array.isRequired
}

export default ShowAttemptsComponent