import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAttemptContext from "../../../../context/AttemptContext/useAttemptContext";
import useGlobalContext from "../../../../context/GlobalContext/useGlobalContext";

import { finishAttemptAPI } from "../../services/index.";

const TimerComponent = () => {
    const {setModal, setIsLoading} = useGlobalContext()
    const { attemptData } = useAttemptContext();

    const navigate = useNavigate()

    const unixStartTime = Math.floor(
        new Date(attemptData.start_time + "Z").getTime() / 1000
    );
    const unixEndTime = unixStartTime + (attemptData.exam_time * 60) + 30;

    const totalTime = unixEndTime - unixStartTime

    const caution = totalTime /2

    const warning = totalTime /5 

    const colorDetector = () => {
        if (remainingTime <= warning){
            return 'text-red-500'
        } else if (remainingTime <= caution){
            return 'text-amber-500'
        }else{
            return 'text-green-500'
        }
    }

    const [remainingTime, setRemainingTime] = useState(
        unixEndTime - Math.floor(Date.now() / 1000)
    );

    useEffect(() => {
        const updateRemainingTime = async () => {
            const now = Math.floor(Date.now() / 1000);
            const timeLeft = unixEndTime - now;
            setRemainingTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                setIsLoading(true)
                const response = await finishAttemptAPI()
                if (response.status == 'error'){
                    setModal({
                        'isOpen' : true,
                        'isError' : true,
                        'message' : response.message,
                    })
                    localStorage.removeItem('easyExamsAttempt')
                    setIsLoading(false)
                    navigate('/')
                    return
                }
                setModal({
                    'isOpen' : true,
                    'isError' : false,
                    'message' : `${response.data.student_name}, Your exam was finished!`,
                })
                localStorage.removeItem('easyExamsAttempt')
                setIsLoading(false)
                navigate('/')
                return
            }
        };

        updateRemainingTime();

        const intervalId = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(intervalId);
    }, [unixEndTime, navigate, setIsLoading, setModal]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""
            }${secs}`;
    };

    return (
        <div className="text-slate-300 font-bold font-satoshi-lightitalic items-center w-full px-10">
            <div className="text-center">
                <p>Time Remaining:</p>
                <p className={`font-ds-digi text-4xl text ${colorDetector()}`}>
                    {formatTime(Math.max(0, remainingTime))}
                </p>
            </div>
        </div>
    );
};

export default TimerComponent;

