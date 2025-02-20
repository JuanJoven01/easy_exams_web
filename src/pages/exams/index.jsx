import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import Header from '../../components/header'
import ExamsViewer from './components/viewer'

import { getExamsAPI } from './services/exams'

import useGlobalContext from '../../context/GlobalContext/useGlobalContext'

const ExamsPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {setIsLoading, setModal} = useGlobalContext()
    const [exams, setExams] = useState([]);

    useEffect(()=>{
        const fetchExams = async () => {
            setIsLoading(true)
            const localStorageLogin = localStorage.getItem('easyAppsLogin');
            if (localStorageLogin) {
                const jsonLogin = JSON.parse(localStorageLogin);
                const token = jsonLogin.token;
                const coursesData = await  getExamsAPI(id, token);
                if (coursesData.status == 'error'){
                    setModal({
                        'isOpen' : true,
                        'isError' : true,
                        'message' : coursesData.message,
                    })
                    // localStorage.removeItem('easyAppsLogin')
                    navigate('/')
                }
                setExams(coursesData.data);
            } else {
                navigate('/')
            }
            setIsLoading(false);
        }

        fetchExams()
    },[id, setModal, setIsLoading, navigate])
    

    return (
        <div className=' backdrop-blur-3xl'>
            <Header
                subtitle={`Here you can see and manage your exams that belongs to a course${exams[0] ? ` named ${exams[0].course_name}.` : '.'  } `}
            />
            <ExamsViewer
                data = {exams}
                courseId={id}
            />
        </div>
    )
}

export default ExamsPage