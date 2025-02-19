import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Header from '../../components/header'
import CoursesViewer from './components/viewer'

import { getCoursesAPI } from './services/courses'

import useGlobalContext from '../../context/GlobalContext/useGlobalContext'

const CoursesPage = () => {

    const navigate = useNavigate()

    const {setIsLoading, setModal} = useGlobalContext()
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async () => {
            setIsLoading(true)
            const localStorageLogin = localStorage.getItem('easyAppsLogin');
            if (localStorageLogin) {
                const jsonLogin = JSON.parse(localStorageLogin);
                const token = jsonLogin.token;
                const coursesData = await getCoursesAPI(token);
                if (coursesData.status == 'error'){
                    setModal({
                        'isOpen' : true,
                        'isError' : true,
                        'message' : coursesData.message,
                    })
                    localStorage.removeItem('easyAppsLogin')
                    navigate('/')
                }
                setCourses(coursesData.data);
            } else {
                navigate('/')
            }
            setIsLoading(false);
        }

        fetchCourses()

    },[setModal, setIsLoading, navigate])


    return (
        <div className=' backdrop-blur-3xl'>
            <Header
                subtitle="Here you can see and manage your courses."
            />
            <CoursesViewer
                data = {courses}
            />
        </div>
    )
}

export default CoursesPage