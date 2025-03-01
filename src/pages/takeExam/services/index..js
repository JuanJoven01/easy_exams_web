import axios from "axios"

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
const finishAttemptAPI = async  () => { 

    try {
        const token = await _getToken ()     
        const response = await axios({
            method: 'put',
            url: '/api/exams/attempts/update/finished',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                
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



export {getRawQuestionsAPI, getRawAnswersAPI,_getToken,finishAttemptAPI}