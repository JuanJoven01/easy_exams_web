import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;
const _getToken = () => {
    const localStorageLogin = localStorage.getItem('easyAppsLogin');
    if (localStorageLogin) {
        const jsonLogin = JSON.parse(localStorageLogin);
        const token = jsonLogin.token;
        return token
    }
}
const getQuestionsAPI = async (id) => {
    const token = _getToken()
    try {      
        const response = await axios({
            url: `${apiUrl}/exams/questions/${id}`,
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

const createQuestionAPI = async  (content, type, examId) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/exams/questions/create`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    content: content,
                    question_type: type,
                    exam_id: examId,
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

const updateQuestionTypeAPI = async  (questionId, question_type) => { 
    try {      
        const token = await _getToken()
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/questions/update`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    question_type: question_type, 
                    question_id : questionId,
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

const updateQuestionContentAPI = async  (questionId, content) => { 
    try {      
        const token = await _getToken()
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/questions/update`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    content: content, 
                    question_id : questionId,
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

const updateQuestionCorrectAnswerAPI = async  (questionId, correctAnswer) => { 
    try {      
        const token = await _getToken()
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/questions/update`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    correct_answer: correctAnswer, 
                    question_id : questionId,
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

const updateQuestionImageAPI = async  (questionId, image) => { 
    try {      
        const token = await _getToken()
        const response = await axios({
            method: 'put',
            url: `${apiUrl}/exams/questions/update`,
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    image: image, 
                    question_id : questionId,
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

const removesQuestionAPI = async  (id) => { 
    try {      
        const token = _getToken()
        const response = await axios({
            method: 'delete',
            url: `${apiUrl}/exams/questions/delete/${id}`,
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


export {getQuestionsAPI, createQuestionAPI,updateQuestionTypeAPI, updateQuestionContentAPI, updateQuestionCorrectAnswerAPI, _getToken, removesQuestionAPI, updateQuestionImageAPI}