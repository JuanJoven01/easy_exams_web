
import axios from "axios"
import {_getToken} from './index.'

const createSLAnswerAPI = async  (QuestionId, AnswerText) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'post',
            url: '/api/exams/answers/create',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
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

const updateSLAnswerAPI = async  (answerId, answerText) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'put',
            url: '/api/exams/answers/update',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    answer_id: answerId,
                    answer_text: answerText,
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

export {createSLAnswerAPI, updateSLAnswerAPI}