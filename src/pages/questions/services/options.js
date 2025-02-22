import axios from "axios"

import { _getToken } from "."

const createOptionAPI = async  (content, isCorrect, questionId) => { 

    try {      
        const token = _getToken()
        const response = await axios({
            method: 'post',
            url: '/api/exams/questions/options/create',
            data: {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    content: content,
                    is_correct: isCorrect,
                    question_id: questionId,
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

export {createOptionAPI}