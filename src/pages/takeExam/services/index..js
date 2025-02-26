import axios from "axios"

const _getToken = () => {
    const localStorageAttempt = localStorage.getItem('easyExamsAttempt');
    if (localStorageAttempt) {
        const jsonAttempt = JSON.parse(localStorageAttempt);
        const token = jsonAttempt.token;
        return token
    }
}

const _getAttemptId = () => {
    const localStorageAttempt = localStorage.getItem('easyExamsAttempt');
    if (localStorageAttempt) {
        const jsonAttempt = JSON.parse(localStorageAttempt);
        const attempt_id = jsonAttempt.attempt_id;
        return attempt_id
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

const createSLAnswerAPI = async  (QuestionId, AnswerText) => { 

    try {      
        const token = _getToken()
        const attempt_id = _getAttemptId()
        const response = await axios({
            method: 'post',
            url: '/api/exams/answers/create',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    attempt_id: attempt_id,
                    question_id: QuestionId,
                    answer_text: AnswerText,
                    },
                id: new Date().getTime(), // unique id for the request
                },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.result){
            return response.data.result
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

export {getRawQuestionsAPI, getRawAnswersAPI, createSLAnswerAPI}