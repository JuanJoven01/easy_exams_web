import PropTypes from 'prop-types'
import { finishAttemptAPI } from '../../pages/takeExam/services/index.'
import useGlobalContext from '../../context/GlobalContext/useGlobalContext'
import { useNavigate } from 'react-router'
const CustomFinishButton = ({action}) => {
    const navigate = useNavigate()
    const {setIsLoading, setModal} = useGlobalContext()
    const finishExam = async () => {
        action()
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

    return (
        <div    className=" hover:cursor-pointer group relative overflow-hidden rounded-[10px] bg-gray-300 p-[2px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-amber-400 hover:via-slate-200 hover:to-red-500 "
                onClick={finishExam}>
            <div className=" group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
            <div className="relative rounded-[10px] bg-slate-800 px-2 w-25">
                <button className="w-full hover:cursor-pointer  text-center font-satoshi-bolditalic bg-gradient-to-r from-amber-400 to-red-500 text-transparent bg-clip-text">Finish</button> 
            </div>
        </div>
    )
}

CustomFinishButton.propTypes = {
    action : PropTypes.func.isRequired
}

export default CustomFinishButton