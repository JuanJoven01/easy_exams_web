import axios from "axios"
import { TfiControlShuffle } from "react-icons/tfi";


const _getToken = () => {
    const localStorageAttempt = localStorage.getItem('easyExamsAttempt');
    if (localStorageAttempt) {
        const jsonAttempt = JSON.parse(localStorageAttempt);
        const token = jsonAttempt.token;
        return token
    }
}

const getRawQuestionsAPI = async () => {
    const token = _getToken()
    try {      
        const response = await axios({
            url: '/api/exams/raw_questions',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data){
            return response.data
        }else {
            return {
                'status': 'error',
                'message' : 'Error on the server response'
            }
        }
        
    } catch (e) {
        return {
            'status': 'error',
            'message' : e.message
        }
    }
}

const getRawAnswersAPI = async () => {
    const token = _getToken()
    try {      
        const response = await axios({
            url: '/api/exams/raw_answers',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data){
            return response.data
        }else {
            return {
                'status': 'error',
                'message' : 'Error on the server response'
            }
        }
        
    } catch (e) {
        return {
            'status': 'error',
            'message' : e.message
        }
    }
}

export {getRawQuestionsAPI, getRawAnswersAPI}