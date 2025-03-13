
import PropTypes from 'prop-types'
import { Tooltip as ReactTooltip } from 'react-tooltip'

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
    return (
        <section className='w-full overflow-x-scroll'>
            <section className={`text-xl text-slate-300 font-satoshi-lightitalic text-center`}
                style={{
                    display: 'grid',
                    gridTemplateRows: `repeat(${attempts.length+1}, 1fr)`,
                    gridTemplateColumns: `repeat(4, 1fr) repeat(${questions.length}, 40px)`
                }}
            >
                <div className='col-start-1 col-end-2 row-start-1 row-end-2'>
                    Student Name
                </div>
                <div className='col-start-2 col-end-3 row-start-1 row-end-2'>
                    Student ID
                </div>
                <div className='col-start-3 col-end-4 row-start-1 row-end-2'>
                    Score
                </div>
                <div className='col-start-4 col-end-5 row-start-1 row-end-2'>
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
                            <p className={`col-start-1 col-end-2`}> {attempt.student_name}</p>
                            <p className={`col-start-2 col-end-3`}> {attempt.student_id}</p>
                            <p className={`col-start-3 col-end-4`}> {attempt.score}</p>
                            <p className={`col-start-4 col-end-5`}
                                data-tooltip-id="attempts" 
                                data-tooltip-content={`Start: ${attempt.start_time} End: ${attempt.end_time}`} > 
                                {attempt.end_time? getAttemptTime(attempt.end_time, attempt.start_time)  : 'In progress'  }
                            </p>
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